EntityEvents.afterHurt(event => {
    const { source, entity, level } = event;

    // 1. 基础验证
    if (!source.player || !source.actual.isPlayer() || !entity.isLiving()) return;
    if (source.msgId === 'kubejs_extra_crit') return; 

    let player = source.actual;
    let mainHandItem = player.mainHandItem;

    // 2. 检测武器
    if (mainHandItem.id !== 'kubejs:work_mace') return;

    // 3. 获取暴击伤害属性
    let critDamageAttr = 0;
    try {
        critDamageAttr = player.getAttributeValue('apothic_attributes:crit_damage');
    } catch (e) {
        critDamageAttr = 0;
    }

    if (critDamageAttr <= 1) return;

    // === 新增：计数与逐级衰减 ===
    let hitCount = entity.persistentData.getInt('work_mace_extra_hits') || 0;

    // 最多触发 3 次
    if (hitCount >= 3) {
        entity.persistentData.putInt('work_mace_extra_hits', 0); // 重置，准备下次攻击
        return;
    }

    // 计算本次二次伤害（每次减少50%）
    let damageMultiplier = Math.pow(0.5, hitCount);   // 0次:1.0，1次:0.5，2次:0.25
    let extraDamage = critDamageAttr * damageMultiplier;

    // 增加计数
    entity.persistentData.putInt('work_mace_extra_hits', hitCount + 1);

    // 触发二次伤害
    entity.attack(player.damageSources().playerAttack(player), extraDamage);

    // 特效
    level.spawnParticles('minecraft:trial_spawner_detection', false, entity.x, entity.y + 1, entity.z, 0.1, 0.1, 0.1, 10, 0.005);
    level.spawnParticles('minecraft:electric_spark', false, entity.x, entity.y + 1, entity.z, 0.3, 0.3, 0.3, 0.1, 0.1);
});