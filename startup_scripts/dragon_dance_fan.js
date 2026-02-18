var $EnergyBoomerangItem = Java.loadClass("cn.leolezury.eternalstarlight.common.item.combat.EnergyBoomerangItem")

/** @type {typeof import("net.minecraft.world.item.Item$Properties").$Item$Properties } */
var $Item$Properties  = Java.loadClass("net.minecraft.world.item.Item$Properties")


StartupEvents.registry("item", event => {
    event.createCustom("dragon_dance_fan",()=> new $EnergyBoomerangItem(new $Item$Properties().stacksTo(1)))
})
