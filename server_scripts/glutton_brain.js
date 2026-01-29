/** @type {typeof import("net.minecraft.world.entity.ai.attributes.AttributeModifier").$AttributeModifier } */
let $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier")


function isEquippedCurio(entity, curioId) {
    return CuriosApi.curiosHelper.findFirstCurio(entity, curioId).isPresent()
}


PlayerEvents.tick(event => {
    let player = event.player
    if (isEquippedCurio(player, "kubejs:glutton_brain")) {

        let curio = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:glutton_brain");
        if (curio.isPresent()) {
            //检测玩家的冷却缩减数值，将其定义为一个数值
            let itemStack = curio.get().stack();
            let cooldownReduction = player.getAttributeValue("minecraft:generic.max_health");
            //为玩家定义一个新的法术强度加成数值，每1%冷却缩减提供0.01点法术强度加成
            let spellpowerBonus = cooldownReduction * 0.01;
            //应用这个新的法术强度加成数值,用modifier的方法
            player.getAttribute("irons_spellbooks:spell_power").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:glutton_brain", spellpowerBonus, "add_multiplied_base"))
            player.tell(`暴食者之脑提供了${spellpowerBonus}点法术强度提升`)
        }

    }
})