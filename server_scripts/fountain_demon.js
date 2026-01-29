/** @type {typeof import("net.minecraft.world.item.component.CustomData").$CustomData } */
let $CustomData = Java.loadClass("net.minecraft.world.item.component.CustomData")



PlayerEvents.tick(event => {
    let player = event.player
    if (isEquippedCurio(player, "kubejs:fountain_demon")) {

        let curio = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:fountain_demon");
        if (curio.isPresent()) {
            //检测玩家的冷却缩减数值，将其定义为一个数值
            let itemStack = curio.get().stack();

            let nbt = getNbt(itemStack)
            

            let holy_magic_resist = player.getAttributeValue("irons_spellbooks:holy_magic_resist");
            //为玩家定义一个恶魔之力加成数值，每100神圣魔法抗性提供-4恶魔之力加成数值
            let DeviBonus = holy_magic_resist * -0.05;
            //应用这个新的攻击力加成数值,用modifier的方法
            player.getAttribute("irons_spellbooks:max_mana").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:fountain_demon", 5 * DeviBonus, "add_multiplied_base")),
                player.getAttribute("irons_spellbooks:mana_regen").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:fountain_demon", 2.5 * DeviBonus, "add_multiplied_base"))
            //player.tell(`鬼魂腰带提供了${attackDamageBonus}点攻击力提升`)
        }

    }
})

/**
 * @param {import("net.minecraft.world.item.ItemStack").$ItemStack} itemStack
 * @returns {import("net.minecraft.nbt.CompoundTag").$CompoundTag}
*/
function getNbt(itemStack) {
    itemStack.getOrDefault("minecraft:custom_data", $CustomData.EMPTY)
}

/**
 * @param {import("net.minecraft.world.item.ItemStack").$ItemStack} itemStack
 * @param {import("net.minecraft.nbt.CompoundTag").$CompoundTag} nbt
*/
function setNbt(itemStack, nbt) {
    itemStack.getOrDefault("minecraft:custom_data", $CustomData.of(nbt))
}