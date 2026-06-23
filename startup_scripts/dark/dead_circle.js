StartupEvents.registry("item", event => {
  event
    .create("dead_circle", "sword")
    //显示名称：献祭之剑
    .displayName("杀戮光环")
    .attackDamageBaseline(1.5)
    .tooltip(Component.ofString("攻击一个目标10次后，对目标造成大量的魔法伤害").yellow())
           NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:dead_circle") {
        event.addModifier("minecraft:generic.attack_speed", new $AttributeModifier("kubejs:dead_circle", -0.15, "add_multiplied_total"), "hand")
        //击退抗性-75%
        event.addModifier("minecraft:generic.knockback_resistance", new $AttributeModifier("kubejs:dead_circle_knockback", -0.75, "add_multiplied_total"), "hand")
        //暴击几率-100%
        event.addModifier("apothic_attributes:crit_chance", new $AttributeModifier("kubejs:dead_circle_crit", -1.0, "add_multiplied_total"), "hand")
        //移动速度-45%
        event.addModifier("minecraft:generic.movement_speed", new $AttributeModifier("kubejs:dead_circle_speed", 0.3, "add_multiplied_total"), "hand")
    }
  })
})