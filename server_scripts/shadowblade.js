// 1. 右键施加印记 + 赋予玩家急速
ItemEvents.entityInteracted('kubejs:chanshizhe', event => {
    const { target, player, hand } = event;
    if (hand != 'main_hand') return;

    // --- 新增：赋予玩家急迫 255 效果 ---
    // 3.5 秒 = 70 ticks (3.5 * 20)
    // 等效等级 255 的 amplifier 应填入 254
    player.potionEffects.add('minecraft:haste', 70, 254, false, false);

    // 设置印记数据
    target.persistentData.putInt('chanshizhe_timer', 100);
    target.persistentData.putInt('chanshizhe_stacks', 0);

    // 反馈
    player.tell('§b能量爆发！§f急速状态开启，尽快通过攻击累积印记（至多100)！');
    
    // 华丽一点的施法粒子
    event.level.spawnParticles('minecraft:electric_spark', true, player.x, player.y + 1, player.z, 0.5, 0.5, 0.5, 15, 0.2);
    event.level.spawnParticles('minecraft:soul', true, target.x, target.y + 1, target.z, 0.2, 0.2, 0.2, 10, 0.1);
    //设置冷却：30秒
    player.getCooldowns().add('kubejs:chanshizhe', 600);
});

// 2. 监测受击次数 (增加上限逻辑)
EntityEvents.afterHurt(event => {
    const { entity } = event;
    
    if (entity.persistentData.contains('chanshizhe_timer')) {
        let currentStacks = entity.persistentData.getInt('chanshizhe_stacks');
        
        // 只有在未满100层时才增加
        if (currentStacks < 100) {
            entity.persistentData.putInt('chanshizhe_stacks', currentStacks + 1);
            entity.level.spawnParticles('minecraft:crit', true, entity.x, entity.y + 1, entity.z, 0.1, 0.1, 0.1, 3, 0.1);
        }
    }
});
//检测玩家的装备，如果在玩家拥有急迫255效果的状态下切换了主手物品，则移除此效果
PlayerEvents.inventoryChanged(event => {
    const { player, inventory } = event;
    // 检查玩家是否装备了特定物品
    let hasHaste = player.potionEffects.has('minecraft:haste');
    let mainHandItem = player.mainHandItem;
    if (hasHaste && mainHandItem.id !== 'kubejs:chanshizhe') {
        player.potionEffects.add('minecraft:haste', 70, 1, false, false);
        player.tell('§c你切换了主手物品，急速效果已移除！§f请重新使用§b能量爆发§f来获得急速状态。');
    }
});


// 3. 处理倒计时与终结爆发 (修复无限循环)
LevelEvents.tick(event => {
    event.level.getEntities().forEach(entity => {
        // 如果实体没有印记，直接跳过，节省性能
        if (!entity.persistentData.contains('chanshizhe_timer')) return;

        let timer = entity.persistentData.getInt('chanshizhe_timer');

        if (timer > 0) {
            // 倒计时中的粒子
            if (timer % 5 == 0) {
                event.level.spawnParticles('minecraft:reverse_portal', true, entity.x, entity.y + entity.bbHeight/2, entity.z, 0.2, 0.4, 0.2, 3, 0.05);
            }
            entity.persistentData.putInt('chanshizhe_timer', timer - 1);
        } else {
            // --- 爆发阶段 ---
            // 先取出层数，然后【立即删除】数据，防止 attack 再次触发 afterHurt 导致死循环
            let finalDamage = entity.persistentData.getInt('chanshizhe_stacks');
            
            // 彻底移除数据，断开逻辑链
            entity.persistentData.remove('chanshizhe_timer');
            entity.persistentData.remove('chanshizhe_stacks');

            if (finalDamage > 0) {
                // 确保伤害生效
                entity.invulnerableTime = 0;
                
                // 执行伤害：此处 finalDamage 对应你叠的层数 (1层=1点伤害，至多100)，
                entity.attack(finalDamage);

                // 爆发反馈
                event.level.playSound(null, entity.block, 'minecraft:entity.zombie_villager.converted', 'hostile', 1.5, 0.8);
                event.level.spawnParticles('minecraft:sonic_boom', true, entity.x, entity.y + 1, entity.z, 0, 0, 0, 1, 0);
                event.level.spawnParticles('minecraft:large_smoke', true, entity.x, entity.y + 1, entity.z, 0.5, 0.5, 0.5, 20, 0.05);
            }
        }
    });
});