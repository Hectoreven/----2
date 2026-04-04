StartupEvents.registry("item", event => {
    event.create("red_shadow", "sword")
    //显示名称：红色之影
    .displayName("红色执念")
    //显示内容：攻击不会暴击，循环造成大幅度的伤害，同时切削敌人8%的护甲
    .tooltip(Component.ofString("攻击不会暴击，攻击进行两次循环，造成大幅度的伤害，同时切削敌人8%的护甲").red())
    .attackDamageBaseline(0)
    .attackDamageBonus(10)


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:red_shadow") {
        //暴击率*0
        event.addModifier("apothic_attributes:crit_chance", new $AttributeModifier("kubejs:red_shadow", -100, "add_value"), "hand")
        //保护撕裂+8%
        event.addModifier("apothic_attributes:prot_shred", new $AttributeModifier("kubejs:red_shadow", 0.08, "add_value"), "hand")
        //攻击速度-25%
        event.addModifier("minecraft:generic.attack_speed", new $AttributeModifier("kubejs:red_shadow", -0.5, "add_multiplied_total"), "hand")
    }
})
})