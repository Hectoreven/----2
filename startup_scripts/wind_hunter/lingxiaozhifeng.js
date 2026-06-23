StartupEvents.registry("item", event => {
    event.create("lingxiaozhifeng", "sword")
    .displayName("凌霄之锋")
    .tooltip(Component.ofString("在指定地点召唤一个法阵，造成基于移动速度的真实伤害").blue())
    .attackDamageBaseline(0)
    .attackDamageBonus(8)


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:lingxiaozhifeng") {
        event.addModifier("generic.movement_efficiency", new $AttributeModifier("kubejs:lingxiaozhifeng", 0.08, "add_value"), "hand")
        //移动速度+16
        event.addModifier("generic.movement_speed", new $AttributeModifier("kubejs:lingxiaozhifeng", 0.016, "add_value"), "hand")
        //交互距离：+2
        event.addModifier("player.block_interaction_range", new $AttributeModifier("kubejs:lingxiaozhifeng", 2, "add_value"), "hand")
    }
})
})