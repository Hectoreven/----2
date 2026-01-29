StartupEvents.registry("item", event => {
    event.create("cibei_staf", "staff")
    //显示名称：慈悲之杖
    .displayName("慈悲之杖")
    .setEnchantmentValue(30)  // 附魔能力值30
    .setTier(tier => {
        tier.useBaseTier("Graybeard", false)  // 使用工匠模板
            .addAttribute("irons_spellbooks:holy_spell_power", 0.1, "add_multiplied_total")   
            .addAttribute("irons_spellbooks:cooldown_reduction", 0.2, "add_multiplied_total")
            .addAttribute("irons_spellbooks:mana_regen", 0.75, "add_multiplied_total")
            .setSpeed(-3.1)  // 攻击速度-3.5
            .setDamage(4)  // 基础伤害20
    })

    }
    )
