StartupEvents.registry("item", event => {
    event.create("water_whip", "sword")
    //显示名称：不详污秽
    .displayName("不详污秽")
    .attackDamageBaseline(0)
    .attackDamageBonus(9)


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:water_whip") {
        //过量治疗12%
        event.addModifier("apothic_attributes:overheal", new $AttributeModifier("kubejs:water_whip", 0.12, "add_value"), "hand")
    }
})
})