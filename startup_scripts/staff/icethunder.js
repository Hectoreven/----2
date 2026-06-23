StartupEvents.registry("item", event => {
    event.create("ice_thunder_staff", "staff")
    //显示名称：冬之杖
    .displayName("冰雪风暴")
    .setEnchantmentValue(90)  // 附魔能力值30
    //介绍文字：右键时，召唤冰雪风暴，对周围至多20个目标进行打击
    .tooltip(Component.ofString("右键时，召唤冰雪风暴，对周围至多20个目标进行打击").blue())
    .setTier(tier => {
        tier.useBaseTier("ARTIFICER", false)
            .addAttribute("irons_spellbooks:ice_spell_power", 0.3, "add_multiplied_total")  
            .setSpeed(-3.1)  // 攻击速度-3.5
            .setDamage(20)  // 基础伤害20
    })

    }
    )
