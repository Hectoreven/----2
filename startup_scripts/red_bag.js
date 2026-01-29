StartupEvents.registry("item", event => {
    event.create("red_bag_pickaxe", "pickaxe")
    //显示名称：红包
    .displayName("红包")
        .attackDamageBaseline(5)
})


NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:red_bag_pickaxe") {
        //经验获取提升80%
        event.addModifier("apothic_attributes:experience_gained", new $AttributeModifier("kubejs:red_bag_pickaxe", 0.8, "add_multiplied_total"), "hand")
    }
})