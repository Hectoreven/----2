StartupEvents.registry("item", event => {
    event.create("daleiban", "sword")
        .attackDamageBaseline(0)
        .displayName("大雷斑")
        .tooltip(Component.ofString("攻击特效：攻击释放一道雷电，为目标回复15点HP").yellow())

        NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:daleiban") {
        event.addModifier("minecraft:generic.attack_speed", new $AttributeModifier("kubejs:daleiban", -0.5, "add_multiplied_total"), "hand")
        //HP+15%
        event.addModifier("minecraft:generic.max_health", new $AttributeModifier("kubejs:daleiban", 0.15, "add_multiplied_total"), "hand")
    }
})
})