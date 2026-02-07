StartupEvents.registry("item", event => {
    //魔法拐杖糖
    event.create('magic_candy')
        .displayName("魔法拐杖糖")
        .tooltip(Component.ofString("获得法术强度10%").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "minecraft:generic.attack_speed",
                    "irons_spellbooks:spell_power",
                    0.1,
                    "add_value"
                )
            )
        .maxStackSize(1)
        .tag("curios:belt")
        //carnival_ticket,法力恢复+10%
    event.create('carnival_ticket')
        .displayName("嘉年华门票")
        .tooltip(Component.ofString("法力恢复+10%").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "irons_spellbooks:mana_regen",
                    "kubejs:carnival_ticket_mana_regen",
                    0.1,
                    "add_value"
                )
        )
        .maxStackSize(1)
        .tag("curios:hands")
        

    }
    )
