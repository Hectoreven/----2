/** @type {typeof import("net.minecraft.world.entity.ai.attributes.AttributeModifier").$AttributeModifier } */
let $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier")


function isEquippedCurio(entity, curioId) {
    return CuriosApi.curiosHelper.findFirstCurio(entity, curioId).isPresent()
}


PlayerEvents.tick(event => {
    let player = event.player
    if (isEquippedCurio(player, "kubejs:ghostly_belt")) {

        let curio = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:ghostly_belt");
        if (curio.isPresent()) {
            //检测玩家的冷却缩减数值，将其定义为一个数值
            let itemStack = curio.get().stack();
            let cooldownReduction = player.getAttributeValue("irons_spellbooks:cooldown_reduction");
            //为玩家定义一个新的攻击力加成数值，每1%冷却缩减提供0.1点攻击力加成
            let attackDamageBonus = cooldownReduction * 0.1;
            //应用这个新的攻击力加成数值,用modifier的方法
            player.getAttribute("minecraft:generic.attack_damage").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:ghostly_belt", attackDamageBonus, "add_multiplied_base"))
            //player.tell(`鬼魂腰带提供了${attackDamageBonus}点攻击力提升`)
        }

    }
})