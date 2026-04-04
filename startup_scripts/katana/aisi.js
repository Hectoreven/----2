StartupEvents.registry("item", event => {
    event.create("aisi", "sword")
    //显示名称：哀思
    .displayName("哀思")
    .attackDamageBaseline(0)
    .attackDamageBonus(9)
    //速度+11%movement speed
    //tooltip(Component.ofString("闪避率40%，移动速度11%").blue())
    .tooltip(Component.ofString("连续小幅度伤害4次后，下次攻击解锁3次特大幅度的伤害").blue())


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:aisi") {
        event.addModifier("generic.max_health", new $AttributeModifier("kubejs:aisi", -0.2, "add_multiplied_total"), "hand")
        //暴击伤害+40
        event.addModifier("apothic_attributes:crit_damage", new $AttributeModifier("kubejs:aisi", 0.4, "add_value"), "hand")
    }
})
})
