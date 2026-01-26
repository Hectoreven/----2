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
        .tag("curios:ring"),
        //恶宴之杯
        event.create('cup_of_demonic_feast')
            .displayName("恶宴之杯")
            .tooltip(Component.ofString("杀死一个目标后，随机获得1-5点HP").darkRed())
            //HP增加3点
            //护甲减少2点
            .attachCuriosCapability(
                CuriosJSCapabilityBuilder.create()
                    .modifyAttributesTooltip((tooltips, stack) => tooltips)
                    .addAttribute(
                        "minecraft:generic.max_health",
                        "kubejs:cup_of_demonic_feast_health",
                        3,
                        "add_value"
                    )
                    .addAttribute(
                        "minecraft:generic.armor",
                        "kubejs:cup_of_demonic_feast_armor",
                        -5,
                        "add_value"
                    )
            )
            .maxStackSize(1)
            .tag("curios:ring")
    //鬼魂头饰，移动速度+8%
    event.create('ghostly_headdress')
        .displayName("鬼魂头饰")
        .tooltip(Component.ofString("佩戴时，移动速度提升8%").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.movement_speed",
                    "kubejs:ghostly_headdress_movement_speed",
                    0.08,
                    "add_multiplied_total"
                )
        )
        .maxStackSize(1)
        .tag("curios:head")
    //鬼魂项链，攻击力+5%，irons_spellbookscooldoun_reduetion+5%
    event.create('ghostly_necklace')
        .displayName("鬼魂项链")
        .tooltip(Component.ofString("佩戴时，攻击力提升5%和冷却缩减提升5%").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.attack_damage",
                    "kubejs:ghostly_necklace_attack_damage",
                    0.05,
                    "add_multiplied_total"
                )
                //irons_spellbooks.cooldown_reduction+5%
                .addAttribute(
                    "irons_spellbooks:cooldown_reduction",
                    "kubejs:ghostly_necklace_cooldown_reduction",
                    0.05,
                    "add_multiplied_total"
                )
        )
        .maxStackSize(1)
        .tag("curios:necklace")
    //鬼魂耳环，攻击力+8%，闪避率apothic_attributes:dodge_chance+8%
    event.create('ghostly_earrings')
        .displayName("鬼魂耳环")
        .tooltip(Component.ofString("佩戴时，攻击力提升8%和闪避率提升8%").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.attack_damage",
                    "kubejs:ghostly_earrings_attack_damage",
                    0.08,
                    "add_multiplied_total"
                )
                //apothic_attributes:dodge_chance+8%
                .addAttribute(
                    "apothic_attributes:dodge_chance",
                    "kubejs:ghostly_earrings_dodge_chance",
                    0.08,
                    "add_multiplied_total"
                )
        )
        .maxStackSize(1)
        .tag("curios:ring")
    //鬼魂腰带，攻击速度+10%，你的冷却缩减为你提供攻击力提升，每1%冷却缩减提供1点
    event.create('ghostly_belt')
        .displayName("鬼魂腰带")
        .tooltip(Component.ofString("佩戴时，攻击速度提升10%和每1%冷却缩减提供1点攻击力提升").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.attack_speed",
                    "kubejs:ghostly_belt_attack_speed",
                    0.1,
                    "add_multiplied_total"
                )
                .onUnequip(context => {
                    context.entity().getAttribute("minecraft:generic.attack_damage").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:ghostly_belt", 0, "add_multiplied_base"))
                })
        )
        .maxStackSize(1)
        .tag("curios:belt")
    //灵木的灯笼，攻击速度+10%，移动速度+10%
    event.create('spirit_wood_lantern')
        .displayName("灵木的灯笼")
        .tooltip(Component.ofString("佩戴时，攻击速度提升10%和移动速度提升10%").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.attack_speed",
                    "kubejs:spirit_wood_lantern_attack_speed",
                    0.1,
                    "add_multiplied_total"
                )
                .addAttribute(
                    "minecraft:generic.movement_speed",
                    "kubejs:spirit_wood_lantern_movement_speed",
                    0.1,
                    "add_multiplied_total"
                )
        )
        .maxStackSize(1)
        .tag("curios:hands")
})