/** @type {typeof import("net.neoforged.neoforge.event.ItemAttributeModifierEvent").$ItemAttributeModifierEvent } */
let $ItemAttributeModifierEvent = Java.loadClass("net.neoforged.neoforge.event.ItemAttributeModifierEvent")
/** @type {typeof import("net.minecraft.world.entity.ai.attributes.AttributeModifier").$AttributeModifier } */
let $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier")
/** @type {typeof import("net.minecraft.world.item.component.ItemAttributeModifiers$Entry").$ItemAttributeModifiers$Entry } */
let $ItemAttributeModifiers$Entry = Java.loadClass("net.minecraft.world.item.component.ItemAttributeModifiers$Entry")

StartupEvents.registry("item", event => {
    event.create("ansha_blade", "sword")
        .attackDamageBaseline(1)
})


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:ansha_blade") {
        event.addModifier("generic.max_health", new $AttributeModifier("kubejs:ansha_blade", -0.9, "add_multiplied_total"), "hand")
    }
})