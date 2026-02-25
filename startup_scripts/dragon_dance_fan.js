StartupEvents.registry("item", event => {
    event.create("dragon_dance_fan", "sword")
    .displayName("花之乱舞")
    .attackDamageBaseline(2)
    .attackDamageBonus(7.5)
    .tooltip(Component.ofString("攻击进行四段循环，每段造成小幅度的伤害").yellow())

       NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:dragon_dance_fan") {
        event.addModifier("minecraft:generic.attack_speed", new $AttributeModifier("kubejs:dragon_dance_fan", 0.9, "add_multiplied_total"), "hand")
    }


    })
})
    