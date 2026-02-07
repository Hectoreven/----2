StartupEvents.registry("item", event => {
    //神秘的守护，最大伤害吸收值10，过量治疗+2%
    event.create('mysterious_protector')
        .displayName("神秘的守护")
        .tooltip(Component.ofString("最大伤害吸收值10，过量治疗+2%").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.max_absorption",
                    "kubejs:mysterious_protector_max_absorption",
                    10,
                    "add_value"
                )
                .addAttribute(
                    "apothic_attributes:overheal",
                    "kubejs:mysterious_protector_current_health_damage",
                    0.02,
                    "add_value"
                )
        )
        .maxStackSize(1)
        .tag("curios:charm"),
    //海王之鳍，游泳速度+15%
    event.create('sea_king_fin')
        .displayName("海王之鳍")
        .tooltip(Component.ofString("游泳速度+15%").aqua())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "neoforge:swim_speed",
                    "kubejs:sea_king_fin_swim_speed",
                    0.15,
                    "add_value"
                )
        )
        .maxStackSize(1)
        .tag("curios:back")

    
})