PlayerEvents.tick(event => {
    let player = event.player
    if (isEquippedCurio(player, "kubejs:heart_of_gale")) {

        let curio = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:heart_of_gale");
        if (curio.isPresent()) {
            //检测玩家的移动速度，将其定义为一个数值
            let itemStack = curio.get().stack();
            let cooldownReduction = player.getAttributeValue("minecraft:generic.movement_speed");
            //为玩家定义一个新的拉弓强度加成数值，每1%移动速度提供1%点拉弓强度加成
            let spellpowerBonus = cooldownReduction * 1
            //应用这个新的拉弓强度加成数值,用modifier的方法
            player.getAttribute("apothic_attributes:arrow_damage").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:heart_of_gale", spellpowerBonus, "add_value"))
            //player.tell(`狂风之心提供了${spellpowerBonus}点箭矢伤害提升`)
        }

    }
})