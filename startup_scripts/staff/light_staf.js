StartupEvents.registry("item", event => {
    event.create("light_staf", "staff")
    //显示名称：慈悲之杖
    .displayName("光芒法杖")
    //介绍："长按右键释放一道粒子数，对敌人每0.5秒造成0.5+0.1AP的魔法伤害"
    .tooltip("长按右键释放一道粒子数，对敌人造成0.2+0.1*圣光法术强度+0.05*法术强度的魔法伤害")
    .setEnchantmentValue(30)  // 附魔能力值30
    .setTier(tier => {
        tier.useBaseTier("Graybeard", false)  // 使用工匠模板
            .addAttribute("irons_spellbooks:holy_spell_power", 0.1, "add_multiplied_total")   
            .addAttribute("irons_spellbooks:spell_power", 0.2, "add_multiplied_total")
            .addAttribute("irons_spellbooks:mana_regen", 0.25, "add_multiplied_total")
            .setSpeed(-3.1)  // 攻击速度-3.5
            .setDamage(4)  // 基础伤害20
    })

    }
    )
