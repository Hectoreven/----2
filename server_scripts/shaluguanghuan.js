EntityEvents.afterHurt(event => {
    const { entity, source, level } = event;

    // 1. 基础条件过滤
    if (level.isClientSide()) return;
    // 确保伤害来源是玩家
    if (!source.actual || !source.actual.isPlayer()) return;
    
    const player = source.actual;

    // 2. 检查玩家手中持有的武器 ID
    if (player.mainHandItem.id !== 'kubejs:dead_circle') return;

    // 3. 确保目标是活着的生物
    if (!entity.isLiving() || !entity.isAlive()) return;

    // --- 连击计时逻辑 ---
    
    // 获取当前世界的总运行时间 (单位：Tick, 1秒=20Ticks)
    let currentTime = level.time;
    // 获取该目标上一次被砍的时间，如果没有记录则默认为 0
    let lastHitTime = entity.persistentData.getLong('last_hit_time') || 0;
    // 获取当前层数
    let currentStacks = entity.persistentData.getInt('cibei_stacks') || 0;

    // 4. 判定连击是否中断 (间隔超过 20 Tick = 1秒)
    // 注意：如果是第一次攻击 (lastHitTime为0)，不触发清零
    if (lastHitTime !== 0 && (currentTime - lastHitTime) > 20) {
        currentStacks = 1; // 超过1秒没打，层数重置为本次的1层
        player.setStatusMessage(Text.gray("连击中断：层数已重置"));
    } else {
        currentStacks++; // 1秒内连击，层数递增
    }

    // 更新本次攻击的时间戳
    entity.persistentData.putLong('last_hit_time', currentTime);

    // 5. 触发效果判定
    if (currentStacks >= 10) {
        // ==========================================
        // 达到 10 层：处决逻辑
        // ==========================================
        
        // 立即清零数据
        entity.persistentData.putInt('cibei_stacks', 0);
        entity.persistentData.putLong('last_hit_time', 0);

        // 计算伤害 (90% 最大生命值)
        let maxHealth = entity.getMaxHealth();
        let executionDamage = maxHealth * 0.9;

        // 施加伤害
        entity.attack(level.damageSources().magic(), executionDamage);

        // 特效与声音
        level.spawnParticles('minecraft:sonic_boom', true, entity.x, entity.y + 1, entity.z, 0, 0, 0, 1, 0);
        level.playSound(null, entity.blockPosition(), 'minecraft:entity.warden.sonic_boom', 'players', 1.0, 0.8);
        
        player.setStatusMessage(Text.red("十阶已满：慈悲终结！"));

    } else {
        // ==========================================
        // 未满 10 层：保存进度
        // ==========================================
        
        entity.persistentData.putInt('cibei_stacks', currentStacks);

        // 显示反馈,让粒子在一个更大的范围内呈现，增加视觉冲击力
        level.spawnParticles('minecraft:enchant', true, entity.x, entity.y + 1, entity.z, 0.5, 0.9, 0.6, 160, 0.1);
        
        // 动作栏提示：增加时间进度感（可选）
        player.setStatusMessage(Text.lightPurple(`连击中! 层数: ${currentStacks} / 10`));
    }
});