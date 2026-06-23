StartupEvents.registry("item", event => {
    event.create("work_mace", "sword")
    //显示名称：红色之影
    .displayName("灵魂榨炼者")
    //显示内容：攻击将依据自身暴击伤害属性额外追加伤害；以暴击伤害-1作为额外伤害数值，数值大于零时立即对目标造成一次额外打击，
    .tooltip(Component.ofString("攻击将依据自身暴击伤害属性额外追加对目标造成3次震荡打击，此攻击可以重复触发").red())
    .attackDamageBaseline(0)
    .attackDamageBonus(1.5)


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:work_mace") {
        //暴击率*0
        event.addModifier("apothic_attributes:crit_chance", new $AttributeModifier("kubejs:work_mace", -100, "add_multiplied_total"), "hand")
        //暴击伤害+16%
        event.addModifier("apothic_attributes:crit_damage", new $AttributeModifier("kubejs:work_mace", 2.4, "add_multiplied_total"), "hand")
        //攻击速度-50%
        event.addModifier("minecraft:generic.attack_speed", new $AttributeModifier("kubejs:work_mace", -0.6, "add_multiplied_total"), "hand")
        //末影法术强度-90%
        event.addModifier("irons_spellbooks:ender_spell_power", new $AttributeModifier("kubejs:work_mace", -0.95, "add_multiplied_total"), "hand")
        //攻击力-20%
        event.addModifier("minecraft:generic.attack_damage", new $AttributeModifier("kubejs:work_mace", -0.5, "add_multiplied_total"), "hand")
        //生命值+25%
        event.addModifier("minecraft:generic.max_health", new $AttributeModifier("kubejs:work_mace", 0.25, "add_multiplied_total"), "hand")
    }
})
})