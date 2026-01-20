StartupEvents.registry("item", event => {
    event.create("winter_staf", "staff")
    .setEnchantmentValue(90)  // 附魔能力值30
    .setTier(tier => {
        tier.useBaseTier("ARTIFICER", true)  // 使用工匠模板
            .addAttribute("irons_spellbooks:holy_spell_power", -0.1, "add_multiplied_total")   
            .addAttribute("irons_spellbooks:blood_spell_power", -0.8, "add_multiplied_total") 
            .addAttribute("irons_spellbooks:ice_spell_power", 0.6, "add_multiplied_total")  
            .addAttribute("irons_spellbooks:ender_spell_power", -1.0, "add_multiplied_total")  
            .addAttribute("irons_spellbooks:fire_spell_power", -0.1, "add_multiplied_total")  
            .addAttribute("irons_spellbooks:nature_spell_power", 0.4, "add_multiplied_total")  
            .addAttribute("irons_spellbooks:evocation_spell_power", -1.0, "add_multiplied_total")  
            .addAttribute("irons_spellbooks:eldritch_spell_power", 0.05, "add_multiplied_total")
            .addAttribute("irons_spellbooks:lightning_spell_power", 0.1, "add_multiplied_total")
            .setSpeed(-3.1)  // 攻击速度-3.5
            .setDamage(20)  // 基础伤害20
    })

    }
    )
