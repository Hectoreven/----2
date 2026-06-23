// server_scripts/hui_blade_logic.js
ServerEvents.tick(event => {
    // 为了保障服务器性能，不需要每 1 tick 都刷新。每 10 tick (0.5秒) 同步一次即可。
    if (event.server.tickCount % 10 !== 0) return;

    event.server.players.forEach(player => {
        let weapon = player.mainHandItem;
        
        // 1.21.1 的修饰符 ID 格式
        let modifierId = 'kubejs:hui_blade_damage_boost';
        let attributeId = 'minecraft:generic.attack_damage';

        // 检查主手是否持有 hui_blade
        if (weapon.id === 'kubejs:hui_blade') {
            // .damageValue 直接返回的就是已损失的耐久度
            let lostDurability = weapon.damageValue; 

            if (lostDurability > 0) {
                // 每损失 1 点耐久，提升 1% (即 0.01)
                let boostAmount = lostDurability * 0.01; 

                // 动态更新攻击力面板
                // 使用 'add_multiplied_base' 让提升的数值以百分比形式作用于基础攻击力
                player.modifyAttribute(attributeId, modifierId, boostAmount, 'add_multiplied_base');
            } else {
                // 满耐久时（没有损失），确保身上没有残留的加成
                player.removeAttribute(attributeId, modifierId);
            }
        } else {
            // 当玩家切走武器，或者主手不再是 hui_blade 时，立刻移除增益
            player.removeAttribute(attributeId, modifierId);
        }
    });
});