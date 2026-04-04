StartupEvents.registry("item", event => {
    event.create("cuicanxinghua", "staff")
    //显示名称：璀璨星华
    .displayName("璀璨星华")
    .setEnchantmentValue(90)  // 附魔能力值30
    .tooltip(Component.ofString("受到攻击时有几率触发流星反击").yellow())
    .setTier(tier => {
        tier.useBaseTier("ARTIFICER", false)  // 使用工匠模板
            .addAttribute("generic.max_health", 0.2, "add_multiplied_total")   
            .addAttribute("generic.armor", -0.2, "add_multiplied_total") 
            .addAttribute("irons_spellbooks:spell_resist", 0.8, "add_multiplied_total")  
            .addAttribute("eternal_starlight:generic.meteor_counterattack_chance", 0.2, "add_value")
            .setSpeed(-3.1)  // 攻击速度-3.5
            .setDamage(8)  // 基础伤害20
            .addAttribute("generic.movement_speed", -0.2, "add_multiplied_total") // 移动速度-10%
    })
    event.create('cuicantoushi')
        .displayName("璀璨头饰")
        .tooltip(Component.ofString("佩戴时，提升流星反击几率").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "eternal_starlight:generic.meteor_counterattack_chance",
                    "kubejs:cuicantoushi_meteor_counterattack_chance",
                    0.2,
                    "add_value"
                )
                .addAttribute("generic.max_health", "kubejs:cuicantoushi_max_health", 0.2, "add_multiplied_total")
                .addAttribute("generic.armor", "kubejs:cuicantoushi_armor", -0.2, "add_multiplied_total")
        )
        .maxStackSize(1)
        .tag("curios:head")
    event.create('cuicanshoulian')
        .displayName("璀璨手链")
        .tooltip(Component.ofString("佩戴时，提升流星反击几率").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "eternal_starlight:generic.meteor_counterattack_chance",
                    "kubejs:cuicanshoulian_meteor_counterattack_chance",
                    0.2,
                    "add_value"
                )
                .addAttribute("generic.max_health", "kubejs:cuicanshoulian_max_health", 0.2, "add_multiplied_total")
                .addAttribute("generic.armor", "kubejs:cuicanshoulian_armor", -0.2, "add_multiplied_total")
        )
        .maxStackSize(1)
        .tag("curios:hands")
    event.create('cuicanhufu')
        .displayName("璀璨护符")
        .tooltip(Component.ofString("佩戴时，提升流星反击几率").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "eternal_starlight:generic.meteor_counterattack_chance",
                    "kubejs:cuicanhufu_meteor_counterattack_chance",
                    0.2,
                    "add_value"
                )
                .addAttribute("generic.max_health", "kubejs:cuicanhufu_max_health", 0.2, "add_multiplied_total")
                .addAttribute("generic.armor", "kubejs:cuicanhufu_armor", -0.2, "add_multiplied_total")
        )
        .maxStackSize(1)
        .tag("curios:necklace")
    event.create('cuicanzulian')
        .displayName("璀璨足链")
        .tooltip(Component.ofString("佩戴时，提升流星反击几率").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "eternal_starlight:generic.meteor_counterattack_chance",
                    "kubejs:cuicanzulian_meteor_counterattack_chance",
                    0.2,
                    "add_value"
                )
                .addAttribute("generic.max_health", "kubejs:cuicanzulian_max_health", 0.2, "add_multiplied_total")
                .addAttribute("generic.armor", "kubejs:cuicanzulian_armor", -0.2, "add_multiplied_total")
        )
        .maxStackSize(1)
        .tag("curios:feet")
    event.create('fullmoonring')
        .displayName("满月戒指")
        .tooltip(Component.ofString("佩戴时，获得8%吸血，和15%生命值").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "apothic_attributes:overheal",
                    "kubejs:fullmoonring_overheal",
                    0.08,
                    "add_value"
                )
                .addAttribute(
                    "generic.max_health",
                    "kubejs:fullmoonring_max_health",
                    0.15,
                    "add_multiplied_total"
                )
        )
        .maxStackSize(1)
        .tag("curios:ring") 
    event.create('milkywaybelt')
        .displayName("银河腰带")
        .tooltip(Component.ofString("佩戴时，获得15%过量治疗，和10%生命值").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "apothic_attributes:overheal",
                    "kubejs:milkywaybelt_overheal",
                    0.15,
                    "add_value"
                )
                .addAttribute(
                    "generic.max_health",
                    "kubejs:milkywaybelt_max_health",
                    0.10,
                    "add_multiplied_total"
                )
        )
        .maxStackSize(1)
        .tag("curios:belt") 
    })