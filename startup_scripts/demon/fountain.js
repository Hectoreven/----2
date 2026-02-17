    //源泉恶魔：HP+1，"佩戴者受到15%额外伤害，提高5*【恶魔之力】法力每秒回复0.5*【恶魔之力】法力值"
    
StartupEvents.registry('item', event => {
    event.create('fountain_demon')
        .displayName("源泉恶魔")
        .tooltip(Component.ofString("佩戴时提供1点HP和恶魔之力,戴者受到的治疗效果减少10%,提高5*【恶魔之力】法力每秒回复0.5*【恶魔之力】法力值").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.max_health",
                    "kubejs:fountain_demon_max_health",
                    1,
                    "add_value"
                )
                .addAttribute(
                    "apothic_attributes:healing_received",
                    "kubejs:fountain_demon_healing_received",
                    -0.10,
                    "add_value"
                )
                .onUnequip(context => {
                    context.entity().getAttribute("irons_spellbooks:mana_regen").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:fountain_demon", 0, "add_value"))
                })
            )
        .maxStackSize(1)
        .tag("curios:head"),
    //恶魔契约之戒,神圣法术抗性减少175%
    event.create('demonic_contract_ring')
        .displayName("恶魔契约之戒")
        .tooltip(Component.ofString("佩戴时，治疗效果减少70%，获得7点恶魔之力").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "apothic_attributes:healing_received",
                    "kubejs:demonic_contract_ring_healing_received",
                    -0.70,
                    "add_value"
                )
                //生命值增加7点
                .addAttribute(
                    "minecraft:generic.max_health",
                    "kubejs:demonic_contract_ring_max_health",
                    7,
                    "add_value"
                )
            
        )
        .maxStackSize(1)
        .tag("curios:ring"),
        //毁灭恶魔,背饰，HP+1，治疗效果减少25%，获得1点恶魔之力，每1点恶魔之力提高2攻击力
    event.create('destruction_demon')
        .displayName("毁灭恶魔")
        .tooltip(Component.ofString("佩戴时提供1点HP,治疗效果减少10%，获得1点恶魔之力，每1点恶魔之力提高1攻击力").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.max_health",
                    "kubejs:destruction_demon_max_health",
                    1,
                    "add_value"
                )
                .addAttribute(
                    "apothic_attributes:healing_received",
                    "kubejs:destruction_demon_healing_received",
                    -0.10,
                    "add_value"
                )
                .onUnequip(context => {
                    context.entity().getAttribute("minecraft:generic.attack_damage").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:destruction_demon", 0, "add_value"))
                })
        )
        .maxStackSize(1)
        .tag("curios:back"),
        //血契恶魔，手饰，HP+1，神圣法术抗性减少25%,每25%点
    event.create('blood_pact_demon')
        .displayName("血契恶魔")
        .tooltip(Component.ofString("受到的治疗效果减少10%，获得1点恶魔之力，每1点恶魔之力提高2HP").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "apothic_attributes:healing_received",
                    "kubejs:torrent_demon_healing_received",
                    -0.10,
                    "add_value"
                )
                .onUnequip(context => {
                    context.entity().getAttribute("minecraft:generic.max_health").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:torrent_demon", 0, "add_value"))
                })
        )
            .maxStackSize(1)
            .tag("curios:hands"),
        //洪流恶魔，脚饰，HP+1，治疗效果减少10%，获得1点恶魔之力，每1点恶魔之力提高2点法术强度
    event.create('torrent_demon')
        .displayName("洪流恶魔")
        .tooltip(Component.ofString("佩戴时提供1点HP,受到的治疗效果减少10%，获得1点恶魔之力，每1点恶魔之力提高10%法术强度").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.max_health",
                    "kubejs:torrent_demon_max_health",
                    1,
                    "add_value"
                )
                .addAttribute(
                    "apothic_attributes:healing_received",
                    "kubejs:torrent_demon_healing_received",
                    -0.10,
                    "add_value"
                )
                .onUnequip(context => {
                    context.entity().getAttribute("irons_spellbooks:spell_power").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:torrent_demon", 0, "add_value"))
                })
        )
        .maxStackSize(1)
        .tag("curios:feet"),
        //风灾恶魔，戒指，HP+1，治疗效果减少10%，获得1点恶魔之力，每1点恶魔之力提高2点攻击速度
    event.create('tempest_demon')
        .displayName("风灾恶魔")
        .tooltip(Component.ofString("佩戴时提供1点HP,受到的治疗效果减少10%，获得1点恶魔之力，每1点恶魔之力提高10%攻击速度").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.max_health",
                    "kubejs:tempest_demon_max_health",
                    1,
                    "add_value"
                )
                .addAttribute(
                    "apothic_attributes:healing_received",
                    "kubejs:tempest_demon_healing_received",
                    -0.10,
                    "add_value"
                )
                .onUnequip(context => {
                    context.entity().getAttribute("minecraft:generic.attack_speed").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:tempest_demon", 0, "add_value"))
                })
        )
        .maxStackSize(1)
        .tag("curios:ring"),
        //统御恶魔，头饰，HP+1，治疗效果减少10%，获得1点恶魔之力，每1点恶魔之力提高5点冷却缩减
    event.create('dominion_demon')
        .displayName("统御恶魔")
        .tooltip(Component.ofString("佩戴时提供1点HP,受到的治疗效果减少10%，获得1点恶魔之力，每1点恶魔之力提高10%冷却缩减").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.max_health",
                    "kubejs:dominion_demon_max_health",
                    1,
                    "add_value"
                )
                .addAttribute(
                    "apothic_attributes:healing_received",
                    "kubejs:dominion_demon_healing_received",
                    -0.10,
                    "add_value"
                )
                .onUnequip(context => {
                    context.entity().getAttribute("irons_spellbooks:cooldown_reduction").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:dominion_demon", 0, "add_value"))
                })
        )
        .maxStackSize(1)
        .tag("curios:head"),
        //狂怒恶魔，护符，HP+1，治疗效果减少10%，获得1点恶魔之力，每1点恶魔之力提高5%点暴击几率
    event.create('fury_demon')
        .displayName("狂怒恶魔")
        .tooltip(Component.ofString("佩戴时提供1点HP,受到的治疗效果减少10%，获得1点恶魔之力，每1点恶魔之力提高5%暴击几率").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.max_health",
                    "kubejs:fury_demon_max_health",
                    1,
                    "add_value"
                )
                .addAttribute(
                    "apothic_attributes:healing_received",
                    "kubejs:fury_demon_healing_received",
                    -0.10,
                    "add_value"
                )
                .onUnequip(context => {
                    context.entity().getAttribute("apothic_attributes:crit_chance").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:fury_demon", 0, "add_value"))
                })

        )
        .maxStackSize(1)
        .tag("curios:charm")

})
    