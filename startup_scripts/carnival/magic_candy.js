StartupEvents.registry("item", event => {
    //魔法拐杖糖
    event.create('magic_candy')
        .displayName("魔法拐杖糖")
        .tooltip(Component.ofString("获得唤魔法术强度10%,召唤伤害8%").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "irons_spellbooks:evocation_spell_power",
                    "kubejs:magic_candy_spell_power",
                    0.1,
                    "add_value"
                )
                .addAttribute(
                    "irons_spellbooks:summon_damage",
                    "kubejs:magic_candy_summon_damage",
                    0.08,
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
