StartupEvents.registry("item", event => {
    event.create("rongzhuhuoyan", "sword")
    //显示名称：红色之影
    .displayName("熔铸火焰")
    //显示内容：攻击不会暴击，五次循环，每次挥刀会叠加一层层数，增加10%攻击倍率，最后一次攻击则造成特大幅度的伤害，同时攻击附带火焰伤害
    .tooltip(Component.ofString("攻击不会暴击，攻击进行五次循环，前四次攻击造成中幅度伤害，每次挥刀会叠加一层层数，增加10%攻击倍率，最后一次攻击进行AOE挥砍，造成特大幅度的伤害，同时攻击附带火焰伤害的攻击特效").red())
    .attackDamageBaseline(0)
    .attackDamageBonus(9)


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:rongzhuhuoyan") {
        //暴击率*0
        event.addModifier("apothic_attributes:crit_chance", new $AttributeModifier("kubejs:rongzhuhuoyan", -100, "add_value"), "hand")
        //火焰伤害+16%
        event.addModifier("apothic_attributes:fire_damage", new $AttributeModifier("kubejs:rongzhuhuoyan", 8, "add_value"), "hand")
        //攻击速度-50%
        event.addModifier("minecraft:generic.attack_speed", new $AttributeModifier("kubejs:rongzhuhuoyan", -0.5, "add_multiplied_total"), "hand")
    }
})
})