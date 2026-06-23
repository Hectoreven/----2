StartupEvents.registry("item", event => {
    event.create("illusion_staf", "staff")
    //显示名称：璀璨星华
    .displayName("幻象法杖")
    .setEnchantmentValue(90)  // 附魔能力值30
    .tooltip(Component.ofString("释放一颗法球，造成2+0.2末影AP+0.1AP的魔法伤害，并让你和目标交换位置").yellow())
    .setTier(tier => {
        tier.useBaseTier("ARTIFICER", false)  // 使用工匠模板
            .setSpeed(-3.1)  // 攻击速度-3.5
            .setDamage(8)  // 基础伤害20
            .addAttribute("irons_spellbooks:ender_spell_power", 0.2, "add_multiplied_total") // 末影法术强度10%
            .addAttribute("irons_spellbooks:spell_power", 0.1, "add_multiplied_total") // 法术强度10%
    })
})