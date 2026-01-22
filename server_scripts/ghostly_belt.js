

function isEquippedCurio(entity, curioId) {
    return curiosHelper.findFirstCurio(entity, curioId).isPresent();
}

ServerEvents.tick((event) => {
        let entity = event.source;
      if (entity instanceof Player) {
        let player = entity;
        if (isEquippedCurio(player, "kubejs:ghostly_belt")) {

            let curio = curiosHelper.findFirstCurio(player, "kubejs:ghostly_belt");
            if (curio.isPresent()) {
                //检测玩家的冷却缩减数值，将其定义为一个数值
                let itemStack = curio.get();
                let cooldownReduction = player.getAttributeValue("irons_spellbooks:cooldown_reduction");
                //为玩家定义一个新的攻击力加成数值，每1%冷却缩减提供1点攻击力提升
                let attackDamageBonus = cooldownReduction * 1.0;
                //应用这个新的攻击力加成数值,用modifier的方法
                player.getAttribute("minecraft:generic.attack_damage").addTransientModifier
                (new net.minecraft.world.entity.ai.attributes.AttributeModifier("kubejs:ghostly_belt_cooldown_attack_damage", attackDamageBonus, net.minecraft.world.entity.ai.attributes.AttributeModifier.Operation.ADDITION)) 
                player.tell(`鬼魂腰带提供了${attackDamageBonus}点攻击力提升`)

            }

        } 
    }});