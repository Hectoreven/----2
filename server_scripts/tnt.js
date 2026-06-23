/** @type {typeof import("net.neoforged.neoforge.event.entity.living.LivingEquipmentChangeEvent").$LivingEquipmentChangeEvent } */
let $LivingEquipmentChangeEvent = Java.loadClass("net.neoforged.neoforge.event.entity.living.LivingEquipmentChangeEvent")
/** @type {typeof import("top.theillusivec4.curios.api.event.CurioChangeEvent").$CurioChangeEvent } */
let $CurioChangeEvent = Java.loadClass("top.theillusivec4.curios.api.event.CurioChangeEvent")
/** @type {typeof import("net.minecraft.world.item.component.CustomData").$CustomData } */
let $CustomData = Java.loadClass("net.minecraft.world.item.component.CustomData")
/** @type {typeof import("net.minecraft.world.entity.EntityType").$EntityType } */
let $EntityType = Java.loadClass("net.minecraft.world.entity.EntityType")
/** @type {typeof import("net.minecraft.world.entity.LivingEntity").$LivingEntity } */
let $LivingEntity = Java.loadClass("net.minecraft.world.entity.LivingEntity")


ItemEvents.rightClicked('minecraft:splash_potion', event => {
    const { player, level, server } = event;
//检测饰品栏里佩戴kubejs:tnt_shooter
    let hasTntShooter = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:tnt_shooter").isPresent();
    if (!hasTntShooter) {
        return; // 没有TNT发射器，不执行后续代码
    }
    // 消耗物品
    if (!player.isCreative()) {
        player.mainHandItem.count--;
    }

    // 在玩家位置（或视线位置）触发范围效果
    //身上有效果：eternal_starlight:crystal_infection
    let targets = level.getEntities().filter(e => e.living  && e.hasEffect('eternal_starlight:crystal_infection') && e.uuid != player.uuid && e.distanceToEntity(player) <= 8);

    targets.forEach(entity => {
        // 1. 造成 9 点伤害 (1.21.1 伤害类型通常使用 player_attack 或 magic)
        entity.attack(9);

        // 2. 施加 3 秒效果 (3秒 = 60 ticks)
        entity.potionEffects.add('eternal_starlight:crystal_infection', 60, 0);
        
        // 3. 视觉反馈：粒子
        server.runCommandSilent(`particle minecraft:firefly ${entity.x} ${entity.y + 1} ${entity.z} 0.2 0.2 0.2 0.1 115`);
    });

    // 播放药水破碎音效
    player.playSound('minecraft:entity.splash_potion.break', 1.0, 1.0);
});