StartupEvents.registry("item", event => {
    event.create("chanshizhe", "sword")
    //显示名称：阐释者
    .displayName("阐释者")
    .attackDamageBaseline(0)
    .attackDamageBonus(11.5)
    //速度+11%movement speed
    //tooltip(Component.ofString("闪避率40%，移动速度11%").blue())
    .tooltip(Component.ofString("攻击进行一次小幅度、两次中幅度的攻击循环").blue())


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:chanshizhe") {
        //闪避率40%
        event.addModifier("apothic_attributes:dodge_chance", new $AttributeModifier("kubejs:chanshizhe", 0.40, "add_value"), "hand")
        //movementspeed 11%
         event.addModifier("generic.movement_speed", new $AttributeModifier("kubejs:wind_hunter_glaive", 0.016, "add_value"), "hand")
    }
})
})
