/** @type {typeof import("net.neoforged.neoforge.event.ItemAttributeModifierEvent").$ItemAttributeModifierEvent } */
let $ItemAttributeModifierEvent = Java.loadClass("net.neoforged.neoforge.event.ItemAttributeModifierEvent")
/** @type {typeof import("net.minecraft.world.entity.ai.attributes.AttributeModifier").$AttributeModifier } */
let $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier")
/** @type {typeof import("net.minecraft.world.item.component.ItemAttributeModifiers$Entry").$ItemAttributeModifiers$Entry } */
let $ItemAttributeModifiers$Entry = Java.loadClass("net.minecraft.world.item.component.ItemAttributeModifiers$Entry")



StartupEvents.registry("item", event => {
    event.create("dark_source_coral_blade", "sword")
        .attackDamageBaseline(8)

    event.create("example_sword", "sword")
        .attackDamageBaseline(0)
        .speedBaseline(0)
        .attackDamageBonus(9)
        .speed(1.6)


})


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:example_sword") {
        event.addModifier("generic.max_health", new $AttributeModifier("kubejs:example", -0.1, "add_multiplied_total"), "hand")
    }
})