StartupEvents.registry("item", event => {
    event.create("dongyehu_katana", "sword")
    //显示名称：东野虎刀
    .displayName("洞爷湖")
    .attackDamageBaseline(0)
    .attackDamageBonus(16)


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:dongyehu_katana") {
        event.addModifier("generic.max_health", new $AttributeModifier("kubejs:dongyehu_katana", -0.2, "add_multiplied_total"), "hand")
        //暴击伤害+40
        event.addModifier("apothic_attributes:crit_damage", new $AttributeModifier("kubejs:dongyehu_katana", 0.4, "add_value"), "hand")
    }
})
})