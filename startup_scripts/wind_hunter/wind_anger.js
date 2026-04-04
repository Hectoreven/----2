//注册剑：风暴之怒，移动速度+8，攻击力为9，击退为1
StartupEvents.registry("item", event => {
   event.create("storm_wrath_sword", "sword")
    .displayName("风暴之怒")
    .tooltip(Component.ofString("造成普通循环的伤害,增加击退值1").blue())
    .attackDamageBaseline(0)
    .attackDamageBonus(8)

NativeEvents.onEvent("highest", $ItemAttributeModifierEvent, event => {
    if (event.getItemStack().getId() == "kubejs:storm_wrath_sword") {
       event.addModifier("generic.attack_knockback", new $AttributeModifier("kubejs:storm_wrath_sword", 1, "add_value"), "hand")
        //移动速度+8
        event.addModifier("generic.movement_speed", new $AttributeModifier("kubejs:storm_wrath_sword", 0.0016, "add_value"), "hand")
    }
})
})