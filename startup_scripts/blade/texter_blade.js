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
        //护甲-5
        event.addModifier("minecraft:generic.armor", new $AttributeModifier("kubejs:tester_blade", -5, "add_value"), "hand")
    }
})
  //挑战者利刺
  event.create("tester_dagger", "sword")
    .displayName("挑战者利刺")
    .attackDamageBaseline(0)
    .attackDamageBonus(6.0)
NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:tester_dagger") {
        //护甲穿透+3
        event.addModifier("apothic_attributes:armor_pierce", new $AttributeModifier("kubejs:tester_dagger", 3, "add_value"), "hand")
        //护甲-5
        event.addModifier("minecraft:generic.armor", new $AttributeModifier("kubejs:tester_dagger", -5, "add_value"), "hand")
    }}
)

})