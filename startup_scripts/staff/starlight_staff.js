StartupEvents.registry("item", event => {
    event.create("starlight_staf", "staff")
    //显示名称：璀璨星华
    .displayName("星光烁杖")
    .setEnchantmentValue(90)  // 附魔能力值30
    .tooltip(Component.ofString("朝正前方，左前方，右前方，左后方，右后方发射5颗法球，可飞行6秒，每颗造成0.7*末影法术强度+0.3*法术强度的伤害。").yellow())
    .setTier(tier => {
        tier.useBaseTier("ARTIFICER", false)  // 使用工匠模板
            .setSpeed(-3.1)  // 攻击速度-3.5
            .setDamage(8)  // 基础伤害20
            .addAttribute("irons_spellbooks:ender_spell_power", 0.2, "add_multiplied_total") // 末影法术强度10%
            .addAttribute("irons_spellbooks:spell_power", 0.1, "add_multiplied_total") // 法术强度10%
    })
})