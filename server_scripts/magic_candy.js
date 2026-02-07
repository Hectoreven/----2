// 饼干 
// 注释可以帮助你
  
// 监听实体生成事件
EntityEvents.spawned(event => {
    const entity = event.entity;
  
    // 检查是否是特定的女仆实体
    if (entity.type === 'touhou_little_maid:maid') {
        // 检查女仆是否穿着辐射防护服
        checkAndApplyAbsorption(entity);
    }
});
  
// 监听玩家装备事件
PlayerEvents.inventoryChanged(event => {
    const entity = event.entity;
  
    // 检查是否是特定的女仆实体
    if (entity.id === 'touhou_little_maid:maid') {
        // 检查女仆是否穿着辐射防护服
        checkAndApplyAbsorption(entity);
    }
});
  
// 检查女仆是否穿着辐射防护服并应用辐射保护效果
function checkAndApplyAbsorption(entity) {
    const armorItems = [
        entity.getEquippedItem('head')
    ];
  
    const hasHazmatSuit = armorItems.every(item => item && item.id === 'minecraft:leather_helmet');
  
    if (hasHazmatSuit) {
        //fashu
        entity.addEffect('minecraft:absorption', 1, 200, false)
        //irons_spellbooks:ascension -20
        entity.addEffect('minecraft:regeneration', 1, 200, false)
    }
}