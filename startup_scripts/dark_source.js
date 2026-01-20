/** @type {typeof import("net.neoforged.neoforge.event.ItemAttributeModifierEvent").$ItemAttributeModifierEvent } */
let $ItemAttributeModifierEvent = Java.loadClass("net.neoforged.neoforge.event.ItemAttributeModifierEvent")
/** @type {typeof import("net.minecraft.world.entity.ai.attributes.AttributeModifier").$AttributeModifier } */
let $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier")
/** @type {typeof import("net.minecraft.world.item.component.ItemAttributeModifiers$Entry").$ItemAttributeModifiers$Entry } */
let $ItemAttributeModifiers$Entry = Java.loadClass("net.minecraft.world.item.component.ItemAttributeModifiers$Entry")



StartupEvents.registry("item", event => {
    event.create("dark_source", "sword")
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


StartupEvents.registry('item', event => {
    event.create('test')
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .curioTick((slotContext, stack) => { })
                .onEquip((slotContext, oldStack, newStack) => { })
                .onUnequip((slotContext, oldStack, newStack) => { })
                .canEquip((slotContext, stack) => true)
                .canUnequip((slotContext, stack) => true)
                .modifySlotsTooltip((tooltips, stack) => tooltips)
                //(属性，修改器id，数值，修改方式)
                .addAttribute(
                    "minecraft:generic.max_health",
                    "kubejs:example_id",
                    20,
                    "add_value"
                )
                .canDrop((slotContext, source, lootingLevel, recentlyHit, stack) => true)
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .modifyFortuneLevel((slotContext, lootContext, stack) => 0)
                .modifyLootingLevel((slotContext, source, target, baseLooting, stack) => 0)
                .makesPiglinsNeutral((slotContext, stack) => false)
                .canWalkOnPowderedSnow((slotContext, stack) => false)
                .isEnderMask((slotContext, enderMan, stack) => false)
        )
        .maxStackSize(1)
        .tag("curios:ring")
})