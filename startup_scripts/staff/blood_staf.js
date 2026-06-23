StartupEvents.registry("item", event => {
    event.create("xinghua_staf", "staff")
    //显示名称：璀璨星华
    .displayName("星花")
    .setEnchantmentValue(90)  // 附魔能力值30
    .tooltip(Component.ofString("消耗自身1+0.1AP的HP释放一颗法球造成2+0.1AP的伤害，如果命中，则恢复2+0.1AP的HP").yellow())
    .setTier(tier => {
        tier.useBaseTier("ARTIFICER", false)  // 使用工匠模板
            .setSpeed(-3.1)  // 攻击速度-3.5
            .setDamage(8)  // 基础伤害20
            .addAttribute("minecraft:generic.max_health", 0.1, "add_multiplied_total") // 最大生命值+10%
            .addAttribute("irons_spellbooks:spell_power", 0.1, "add_multiplied_total") // 法术强度10%
    })
})