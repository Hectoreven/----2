StartupEvents.registry("item", event => {
    event.create("tester_blade", "sword")
    //显示名称：挑战者细剑
    .displayName("挑战者细剑")
    .attackDamageBaseline(0)
    .attackDamageBonus(4.5)


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:tester_blade") {
        //生命偷取12%
        event.addModifier("apothic_attributes:life_steal", new $AttributeModifier("kubejs:tester_blade", 0.12, "add_value"), "hand")
        //current_hp_damage 增加 8%，
        event.addModifier("apothic_attributes:current_hp_damage", new $AttributeModifier("kubejs:tester_blade", 0.08, "add_value"), "hand")
        //护甲-20
        event.addModifier("minecraft:generic.armor", new $AttributeModifier("kubejs:tester_blade", -20, "add_value"), "hand")
    }
})
})