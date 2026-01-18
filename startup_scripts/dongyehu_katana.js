StartupEvents.registry("item", event => {
    event.create("dongyehu_katana", "sword")
    .attackDamageBaseline(0)
    .attackDamageBonus(16)


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:dongyehu_katana") {
        event.addModifier("generic.max_health", new $AttributeModifier("kubejs:dongyehu_katana", -0.1, "add_multiplied_total"), "hand")
    }
})
})