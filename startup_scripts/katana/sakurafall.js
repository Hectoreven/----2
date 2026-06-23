StartupEvents.registry("item", event => {
    event.create("sakurafall_katana", "sword")
    //显示名称：哀思
    .displayName("樱下舞")
    .attackDamageBaseline(0)
    .attackDamageBonus(9)
    //速度+11%movement speed
    //tooltip(Component.ofString("闪避率40%，移动速度11%").blue())
    .tooltip(Component.ofString("左键攻击时，强制扣除自身 50% 当前 HP。以目标为中心造成 6 半径范围9 + (额外目标数 \times 3)的伤害，且命中目标后，每命中一个单位回复 1 点 HP。").blue())


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:sakurafall_katana") {
        //暴击伤害+40
        event.addModifier("apothic_attributes:crit_damage", new $AttributeModifier("kubejs:sakurafall_katana", 0.4, "add_value"), "hand")
    }
})
})
