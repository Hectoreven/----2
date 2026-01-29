StartupEvents.registry("item", event => {
    event.create("bomb_hammer", "axe")
        .attackDamageBaseline(10)

        NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:bomb_hammer") {
        event.addModifier("minecraft:generic.attack_speed", new $AttributeModifier("kubejs:bomb_hammer", -0.9, "add_multiplied_total"), "hand")
    }
})
})