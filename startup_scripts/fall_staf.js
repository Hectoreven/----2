StartupEvents.registry("item", event => {
    event.create("fall_staf", "staff")
    //显示名称：秋之杖
    .displayName("秋之杖")
    .setEnchantmentValue(90)  // 附魔能力值30
    .setTier(tier => {
        tier.useBaseTier("ARTIFICER", true)  // 使用工匠模板
            .addAttribute("irons_spellbooks:holy_spell_power", 0.2, "add_multiplied_total")   
            .addAttribute("irons_spellbooks:blood_spell_power", -0.8, "add_multiplied_total") 
            .addAttribute("irons_spellbooks:ice_spell_power", 0.1, "add_multiplied_total")  
            .addAttribute("irons_spellbooks:ender_spell_power", -1.0, "add_multiplied_total")  
            .addAttribute("irons_spellbooks:fire_spell_power", -0.1, "add_multiplied_total")  
            .addAttribute("irons_spellbooks:nature_spell_power", 0.3, "add_multiplied_total")  
            .addAttribute("irons_spellbooks:evocation_spell_power", -1.0, "add_multiplied_total")  
            .addAttribute("irons_spellbooks:eldritch_spell_power", 0.05, "add_multiplied_total")
            .addAttribute("irons_spellbooks:lightning_spell_power", 0.1, "add_multiplied_total")
            .setSpeed(-3.1)  // 攻击速度-3.5
            .setDamage(20)  // 基础伤害20
    })

    }
    )
