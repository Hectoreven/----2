StartupEvents.registry("item", event => {
    event.create("qihuan_staf", "staff")
    //显示名称：璀璨星华
    .displayName("奇幻法杖")
    .setEnchantmentValue(90)  // 附魔能力值30
    .tooltip(Component.ofString("在目标地点召唤一个10*10的法阵，定义为【嘉年华】。在20秒后进行随机，有50%的概率为内部的所有单位回复12+0.1AP的生命，也有50%的概率让范围内的所有单位受到3.5AP+8的伤害.").yellow())
    .setTier(tier => {
        tier.useBaseTier("ARTIFICER", false)  // 使用工匠模板
            .setSpeed(-3.1)  // 攻击速度-3.5
            .setDamage(8)  // 基础伤害20
            .addAttribute("irons_spellbooks:spell_power", 0.1, "add_multiplied_total") // 法术强度10%
    })
})