StartupEvents.registry("item", event => {
    event.create("zisexinqing", "staff")
    //显示名称：春之杖
    .displayName("紫濯清夜")
    .setEnchantmentValue(30)  // 附魔能力值30
    .setTier(tier => {
        tier.useBaseTier("ARTIFICER", true)  // 使用工匠模板
            .addAttribute("irons_spellbooks:summon_damage", 0.5, "add_multiplied_total")   
            .addAttribute("irons_spellbooks:spell_power", -0.8, "add_multiplied_total")  
            .addAttribute("irons_spellbooks:evocation_spell_power", 1.0, "add_multiplied_total")  
            .addAttribute("irons_spellbooks:cast_time_reduction", 0.3, "add_multiplied_total")
            .addAttribute("irons_spellbooks:max_mana", 0.3, "add_multiplied_total") 
            .setSpeed(-3.1)  // 攻击速度-3.5
            .setDamage(8)  // 基础伤害20
    })

    }
    )
