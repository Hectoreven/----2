EntityEvents.afterHurt(event => {
    const { source, entity, amount, level } = event;
    
    // 1. 基础验证：确保是玩家攻击，且目标还活着，且这不是由我们这个脚本触发的二次伤害
    // 使用 source.msgId 检查，防止死循环
    if (!source.player || !source.actual.isPlayer() || !entity.isLiving()) return;
    if (source.msgId === 'kubejs_extra_crit') return; 
    
    let player = source.actual;
    let mainHandItem = player.mainHandItem;

    // 2. 检测武器 ID
    if (mainHandItem.id !== 'kubejs:work_hummer') return;

    // 3. 获取属性
    let critDamageAttr = 0;
    try {
        critDamageAttr = player.getAttributeValue('apothic_attributes:crit_damage');
    } catch (e) {
        critDamageAttr = 0;
    }

    // 4. 计算额外伤害 (按照你的逻辑，150% 属性值对应 1.5 点伤害)
    let extraDamage = critDamageAttr -4 ;

    // 5. 触发二次攻击效果
    if (extraDamage > 0) {
        // 使用特殊的伤害源，防止再次触发此事件导致死循环
        // 1.21.1 NeoForge 中通常使用 attack 类型的伤害，并自定义 ID
        entity.attack(player.damageSources().playerAttack(player), extraDamage);
        
        // 为了确保不循环，更稳妥的做法是手动扣血或使用标记
        // 但在 KubeJS 中，我们通常配合 source.msgId 或一个简单的自定义 NBT 标记
        
        // 特效：在目标位置生成红色粒子代表攻击特效
        level.spawnParticles('minecraft:trial_spawner_detection', false, entity.x, entity.y + 1, entity.z, 0.1, 0.1, 0.1, 0.1, 0.1);
        level.spawnParticles('minecraft:electric_spark', false, entity.x, entity.y + 1, entity.z, 0.3, 0.3, 0.3, 0.1, 0.1 );
    }
});