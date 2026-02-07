StartupEvents.registry("item", event => {
        event.create('rude_mark')
        .displayName("残忍勋章")
        .tooltip(Component.ofString("暴击伤害+10，攻击力+1").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "apothic_attributes:crit_damage",
                    "kubejs:rude_mark_crit_damage",
                    0.1,
                    "add_value"
                )
                .addAttribute(
                    "generic.attack_damage",
                    "kubejs:rude_mark_attack_damage",
                    1,
                    "add_value"
                )

            )
        .maxStackSize(1)
        .tag("curios:head")
        //无情勋章，暴击伤害+10，攻击力+1，栏位：戒指
    event.create('ruthless_mark')
        .displayName("无情勋章")
        .tooltip(Component.ofString("暴击伤害+10，攻击力+1").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "apothic_attributes:crit_damage",
                    "kubejs:ruthless_mark_crit_damage",
                    0.1,
                    "add_value"
                )
                .addAttribute(
                    "generic.attack_damage",
                    "kubejs:ruthless_mark_attack_damage",
                    1,
                    "add_value"
                )
            )
        .maxStackSize(1)
        .tag("curios:ring")
        //愤怒勋章，暴击伤害+10，攻击力+1，栏位：项链
    event.create('anger_mark')
        .displayName("愤怒勋章")
        .tooltip(Component.ofString("暴击伤害+10，攻击力+1").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "apothic_attributes:crit_damage",
                    "kubejs:anger_mark_crit_damage",
                    0.1,
                    "add_value"
                )
                .addAttribute(
                    "generic.attack_damage",
                    "kubejs:anger_mark_attack_damage",
                    1,
                    "add_value"
                )
            )
        .maxStackSize(1)
        .tag("curios:necklace")
        //毁灭勋章，暴击伤害+10，攻击力+1，栏位：腰带
    event.create('destruction_mark')
        .displayName("毁灭勋章")
        .tooltip(Component.ofString("暴击伤害+10，攻击力+1").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "apothic_attributes:crit_damage",
                    "kubejs:destruction_mark_crit_damage",
                    0.1,
                    "add_value"
                )
                .addAttribute(
                    "generic.attack_damage",
                    "kubejs:destruction_mark_attack_damage",
                    1,
                    "add_value"
                )
            )
        .maxStackSize(1)
        .tag("curios:belt")
        //猛击勋章，暴击伤害+10，攻击力+1，栏位：脚镯
    event.create('bludgeon_mark')
        .displayName("猛击勋章")
        .tooltip(Component.ofString("暴击伤害+10，攻击力+1").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "apothic_attributes:crit_damage",
                    "kubejs:bludgeon_mark_crit_damage",
                    0.1,
                    "add_value" 
                )
                .addAttribute(
                    "generic.attack_damage",
                    "kubejs:bludgeon_mark_attack_damage",
                    1,
                    "add_value"
                )
            )
        .maxStackSize(1)
        .tag("curios:feet")
        //狂热勋章，暴击伤害+10，攻击力+1，栏位：hands
    event.create('frenzy_mark')
        .displayName("狂热勋章")
        .tooltip(Component.ofString("暴击伤害+10，攻击力+1").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "apothic_attributes:crit_damage",
                    "kubejs:frenzy_mark_crit_damage",
                    0.1,
                    "add_value"
                )
                .addAttribute(
                    "generic.attack_damage",
                    "kubejs:frenzy_mark_attack_damage",
                    1,
                    "add_value"
                )
            )
        .maxStackSize(1)
        .tag("curios:hands")
        //愤怒勋章，暴击伤害+10，攻击力+1，栏位：back
    event.create('wrath_mark')
        .displayName("愤怒勋章")
        .tooltip(Component.ofString("暴击伤害+10，攻击力+1").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "apothic_attributes:crit_damage",
                    "kubejs:wrath_mark_crit_damage",
                    0.1,
                    "add_value"
                )
                .addAttribute(
                    "generic.attack_damage",
                    "kubejs:wrath_mark_attack_damage",
                    1,
                    "add_value"
                )
            )
        .maxStackSize(1)
        .tag("curios:back")
        //行军勋章，暴击伤害+10，攻击力+1，栏位：charm
    event.create('march_mark')
        .displayName("行军勋章")
        .tooltip(Component.ofString("暴击伤害+10，攻击力+1").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "apothic_attributes:crit_damage",
                    "kubejs:march_mark_crit_damage",
                    0.1,
                    "add_value"
                )
                .addAttribute(
                    "generic.attack_damage",
                    "kubejs:march_mark_attack_damage",
                    1,
                    "add_value"
                )
            )
        .maxStackSize(1)
        .tag("curios:charm")








})
