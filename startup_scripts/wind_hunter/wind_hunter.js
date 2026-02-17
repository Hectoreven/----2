StartupEvents.registry("item", event => {
    event.create("wind_hunter_glaive", "sword")
    .displayName("风骑士长枪")
    .tooltip(Component.ofString("造成三循环的中幅度的伤害").blue())
    .attackDamageBaseline(0)
    .attackDamageBonus(8)


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:wind_hunter_glaive") {
        event.addModifier("generic.movement_efficiency", new $AttributeModifier("kubejs:wind_hunter_glaive", 0.08, "add_value"), "hand")
        //移动速度+16
        event.addModifier("generic.movement_speed", new $AttributeModifier("kubejs:wind_hunter_glaive", 0.016, "add_value"), "hand")
    }
})
})