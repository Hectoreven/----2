    //源泉恶魔：HP+1，"佩戴者受到15%额外伤害，提高5*【恶魔之力】法力每秒回复0.5*【恶魔之力】法力值"
    
StartupEvents.registry('item', event => {
    event.create('fountain_demon')
        .displayName("源泉恶魔")
        .tooltip(Component.ofString("佩戴时提供1点HP,戴者受到的治疗效果减少25%,提高5*【恶魔之力】法力每秒回复0.5*【恶魔之力】法力值").red())
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
                    "irons_spellbooks:holy_magic_resist",
                    "kubejs:fountain_demon_holy_magic_resist",
                    -0.25,
                    "add_value"
                )

            )
        .maxStackSize(1)
        .tag("curios:head")
    //恶魔契约之戒,神圣法术抗性减少175%
    event.create('demonic_contract_ring')
        .displayName("恶魔契约之戒")
        .tooltip(Component.ofString("佩戴时，神圣法术抗性减少25%").red())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "irons_spellbooks:holy_magic_resist",
                    "kubejs:demonic_contract_ring_holy_magic_resist",
                    -1.75,
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
        .tag("curios:ring")

    })