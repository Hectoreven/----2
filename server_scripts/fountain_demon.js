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

PlayerEvents.tick(event => {
    let player = event.player
    if (isEquippedCurio(player, "kubejs:fountain_demon")) {

        // 源泉恶魔
        let curio = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:fountain_demon");
        if (curio.isPresent()) {
            let itemStack = curio.get().stack();
            let nbt = getNbt(itemStack);
            if (!nbt.contains("demon", 9)) {
                nbt.putFloat("demon", 1.0);
                setNbt(itemStack, nbt);
            }
        }

        // 契约之戒
        let curioring = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:demonic_contract_ring");
        if (curioring.isPresent()) {
            let itemStack = curioring.get().stack();
            let nbt = getNbt(itemStack);
            if (!nbt.contains("demon", 9)) {
                nbt.putFloat("demon", 7.0);
                setNbt(itemStack, nbt);
            }
        }

        // 毁灭恶魔
        let destruction = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:destruction_demon");
        if (destruction.isPresent()) {
            let itemStack = destruction.get().stack();
            let nbt = getNbt(itemStack);
            if (!nbt.contains("demon", 9)) {
                nbt.putFloat("demon", 1.0);
                setNbt(itemStack, nbt);
            }
        }

        // 血契恶魔
        let bloodpact = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:blood_pact_demon");
        if (bloodpact.isPresent()) {
            let itemStack = bloodpact.get().stack();
            let nbt = getNbt(itemStack);
            if (!nbt.contains("demon", 9)) {
                nbt.putFloat("demon", 1.0);
                setNbt(itemStack, nbt);
            }
        }

        // 洪流恶魔
        let torrent = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:torrent_demon");
        if (torrent.isPresent()) {
            let itemStack = torrent.get().stack();
            let nbt = getNbt(itemStack);
            if (!nbt.contains("demon", 9)) {
                nbt.putFloat("demon", 1.0);
                setNbt(itemStack, nbt);
            }
        }

        // 风灾恶魔
        let tempest = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:tempest_demon");
        if (tempest.isPresent()) {
            let itemStack = tempest.get().stack();
            let nbt = getNbt(itemStack);
            if (!nbt.contains("demon", 9)) {
                nbt.putFloat("demon", 1.0);
                setNbt(itemStack, nbt);
            }
        }

        // 统御恶魔
        let dominion = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:dominion_demon");
        if (dominion.isPresent()) {
            let itemStack = dominion.get().stack();
            let nbt = getNbt(itemStack);
            if (!nbt.contains("demon", 9)) {
                nbt.putFloat("demon", 1.0);
                setNbt(itemStack, nbt);
            }
        }

        // 狂怒恶魔
        let fury = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:fury_demon");
        if (fury.isPresent()) {
            let itemStack = fury.get().stack();
            let nbt = getNbt(itemStack);
            if (!nbt.contains("demon", 9)) {
                nbt.putFloat("demon", 1.0);
                setNbt(itemStack, nbt);
            }
        }


            let demonValue = player.persistentData.getFloat("CurioDemon") + player.persistentData.getFloat("ArmorDemon");
            // 2. 示例1：将demon值融入法力回复加成计算（你可根据需求调整公式）
            // 原有公式：2.5 * nbt → 新增demon值的加成（比如每1点demon额外加0.1）
            let manaRegenBonus = 0.5 + (demonValue * 0.1);
            let attackBonus = demonValue * 2; // 每1点demon提高2点攻击力

            //检测玩家是否装备了源泉恶魔
            let fountain = CuriosApi.curiosHelper.findFirstCurio(player, "kubejs:fountain_demon");
            if (fountain.isPresent()) {
            // 应用这个新的攻击力加成数值,用modifier的方法
            player.getAttribute("irons_spellbooks:mana_regen").addOrUpdateTransientModifier(
                new $AttributeModifier("kubejs:fountain_demon", manaRegenBonus, "add_value")
            );
            player.tell(`当前恶魔值：${demonValue}，法力回复加成：${manaRegenBonus}`);}
            
            //检测是否装备了毁灭恶魔
            if (destruction.isPresent()) {
            player.getAttribute("minecraft:generic.attack_damage").addOrUpdateTransientModifier(
                    new $AttributeModifier("kubejs:destruction_demon", attackBonus, "add_value")
                );
            player.tell(`当前恶魔值：${demonValue}，攻击力加成：${attackBonus}`);}

            //检测是否装备了血契恶魔
            if (bloodpact.isPresent()) {
            player.getAttribute("minecraft:generic.max_health").addOrUpdateTransientModifier(
                    new $AttributeModifier("kubejs:blood_pact_demon", 2 * demonValue, "add_value")
                );
            player.tell(`当前恶魔值：${demonValue}，生命值加成：${2 * demonValue}`);

            //检测是否装备了洪流恶魔
            if (torrent.isPresent()) {
            player.getAttribute("irons_spellbooks:spell_power").addOrUpdateTransientModifier(
                    new $AttributeModifier("kubejs:torrent_demon", 0.1 * demonValue, "add_value")
                );
            player.tell(`当前恶魔值：${demonValue}，法术强度加成：${0.1 * demonValue}`);}

            //检测是否装备了风灾恶魔
            if(tempest.isPresent()) {
            player.getAttribute("minecraft:generic.attack_speed").addOrUpdateTransientModifier(
                    new $AttributeModifier("kubejs:tempest_demon", 0.1 * demonValue, "add_value")
                );
            player.tell(`当前恶魔值：${demonValue}，攻击速度加成：${0.1 * demonValue * 100}%`);}

            //检测是否装备了统御恶魔
            if(dominion.isPresent()) {
            player.getAttribute("irons_spellbooks:cooldown_reduction").addOrUpdateTransientModifier(
                    new $AttributeModifier("kubejs:dominion_demon", 0.1 * demonValue, "add_value")
                );
            player.tell(`当前恶魔值：${demonValue}，冷却缩减加成：${0.1 * demonValue * 100}%`);}

            //检测是否装备了狂怒恶魔
            if(fury.isPresent()) {
            player.getAttribute("apothic_attributes:crit_chance").addOrUpdateTransientModifier(
                    new $AttributeModifier("kubejs:fury_demon", 0.05 * demonValue, "add_value")
                );
            player.tell(`当前恶魔值：${demonValue}，暴击几率加成：${0.05 * demonValue * 100}%`);}

        }
    }
})



//
NativeEvents.onEvent($CurioChangeEvent, event => {
    if (event.entity.isPlayer()) {
        let demon = 0;
        CuriosApi.getCuriosInventory(event.entity).ifPresent(iCuriosItemHandler => {
            for (let i = 0; i < iCuriosItemHandler.getEquippedCurios().getSlots(); i++) {
                let itemStack = iCuriosItemHandler.getEquippedCurios().getStackInSlot(i);
                if (!itemStack.isEmpty()) {
                    demon = demon + getNbt(itemStack).getFloat("demon")
                }
            }
        });
        event.entity.persistentData.putFloat("CurioDemon", demon)
    }
})

NativeEvents.onEvent($LivingEquipmentChangeEvent, event => {
    if (event.entity.isPlayer()) {
        let demon = 0;

        event.entity.getArmorSlots().forEach(itemStack => {
            if (!itemStack.isEmpty()) {
                demon = demon + getNbt(itemStack).getFloat("demon")
            }
        })

        event.entity.persistentData.putFloat("ArmorDemon", demon)
    }
})

EntityEvents.afterHurt(event => {
    if (event.source.getType() == "player" && event.getSource().getActual() instanceof Player) {
        let attacker = event.getSource().getActual();

        let entity = event.getEntity()
        if (attacker.getMainHandItem().getItem().id == "minecraft:diamond_sword") {
            let lightningBolt = $EntityType.LIGHTNING_BOLT.create(entity.level)
            lightningBolt.setVisualOnly(true)
            lightningBolt.setPos(entity.position())
            entity.level.addFreshEntity(lightningBolt)

            entity.level.getEntities().forEach(target => {
                if (target.isLiving() && target.distanceToSqr(entity) <= 25) {
                    /** @type {import("net.minecraft.world.entity.LivingEntity").$LivingEntity } */
                    let living = target
                    living.heal(15)
                }
            })
        }
    }
})

/**
 * @param {import("net.minecraft.world.item.ItemStack").$ItemStack} itemStack
 * @returns {import("net.minecraft.nbt.CompoundTag").$CompoundTag}
*/
function getNbt(itemStack) {
    return itemStack.getOrDefault("minecraft:custom_data", $CustomData.EMPTY).copyTag()
}

/**
 * @param {import("net.minecraft.world.item.ItemStack").$ItemStack} itemStack
 * @param {import("net.minecraft.nbt.CompoundTag").$CompoundTag} nbt
*/
function setNbt(itemStack, nbt) {
    itemStack.set("minecraft:custom_data", $CustomData.of(nbt))
}