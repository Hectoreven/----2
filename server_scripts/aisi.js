EntityEvents.afterHurt(event => {
    const { source, entity, level, server } = event;

    // 1. 安全检查
    if (!source.actual || !source.actual.isPlayer()) return;
    let player = source.actual;
    if (player.mainHandItem.id != 'kubejs:sakurafall_katana') return;

    // --- 核心修改：支付惨重代价 ---
    // 每次攻击直接扣除当前生命值的 50%
    // 例如：20点血变10点，10点血变5点
    let healthCost = player.health * 0.5;
    player.health -= healthCost;

    // 2. 获取范围内的敌人 (半径 6)
    let extraTargets = level.getEntities().filter(e => 
        e.isLiving() && 
        e.uuid != player.uuid && 
        e.uuid != entity.uuid && 
        e.distanceToEntity(entity) <= 6
    );

    // 计算总命中数
    let totalHits = 1 + extraTargets.length;

    // --- 伤害成长机制 ---
    // 基础 9 点，每多一个目标 +3 伤害
    let scaledDamage = 9 + (extraTargets.length * 3);

    // 3. 对额外目标造成伤害
    extraTargets.forEach(target => {
        target.attack(scaledDamage);
        // 向上喷射的樱花
        server.runCommandSilent(`particle minecraft:cherry_leaves ${target.x} ${target.y} ${target.z} 0.1 0.5 0.1 0.2 10`);
    });

    // --- 生命汲取：每命中一个目标回 1 点 ---
    // 如果你砍中的怪够多（比如超过 10 个），你有机会回满血
    let healAmount = totalHits * 0.5;
    player.health = Math.min(player.maxHealth, player.health + healAmount);

    // 4. 视觉反馈：大规模樱花逆流而上
    // 既然代价这么高，特效也要拉满
    let mainParticleCount = Math.min(600, 75 + (extraTargets.length * 30));
    server.runCommandSilent(`particle minecraft:cherry_leaves ${entity.x} ${entity.y} ${entity.z} 1.2 2.5 1.2 0.2 ${mainParticleCount}`);
    
    // 增加红色灵魂粒子，象征生命力的流失与转换
    server.runCommandSilent(`particle minecraft:damage_indicator ${player.x} ${player.y + 1} ${player.z} 0.5 0.5 0.5 0.1 5`);

    // 5. 音效反馈
    // 增加一个响亮的闪电雷鸣声（低音量），体现这一刀的厚重
    player.playSound('minecraft:entity.lightning_bolt.impact', 0.5, 2.0);
    player.playSound('minecraft:entity.player.attack.sweep', 1.0, 1.5);
    
    // 回血反馈
    if (healAmount > 0) {
        server.runCommandSilent(`particle minecraft:heart ${player.x} ${player.y + 2} ${player.z} 0.3 0.3 0.3 0.1 8`);
    }
});