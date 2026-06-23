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