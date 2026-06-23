const ORBIT_RADIUS = 2.0;
const ORBIT_SPEED = 0.15;
const DURATION = 200; 

// 属性 ID 定义 (Iron's Spellbooks 标准属性)
const SPELL_POWER = 'irons_spellbooks:spell_power';
const EVOCATION_POWER = 'irons_spellbooks:evocation_spell_power';
const SUMMON_DAMAGE = 'irons_spellbooks:summon_damage';

ItemEvents.rightClicked('kubejs:zisexinqing', event => {
    const { player, server } = event;
    player.persistentData.putInt('sphere_timer', DURATION);

    for (let i = 0; i < 3; i++) {
        // 增加 Invulnerable 和 PersistenceRequired 确保实体稳定
        server.runCommandSilent(`summon irons_spellbooks:magic_missile ${player.x} ${player.y + 1} ${player.z} {Tags:["custom_orbit","orbit_${i}"],NoGravity:1b,NoAI:1b,Invulnerable:1b,PersistenceRequired:1b}`);
    }
    player.swing();
    player.playSound('minecraft:entity.illusioner.cast_spell');
    //冷却：12秒
    player.cooldowns.addCooldown(event.item, 240);
});

LevelEvents.tick(event => {
    const { level, server } = event;
    const time = level.time;

    level.getEntities().forEach(entity => {
        if (entity.tags.contains('custom_orbit')) {
            let owner = level.getNearestPlayer(entity.x, entity.y, entity.z, 10, false);

            if (!owner || owner.persistentData.getInt('sphere_timer') <= 0) {
                entity.discard();
                return;
            }

            // 1. 位置计算
            let index = entity.tags.contains('orbit_1') ? 1 : (entity.tags.contains('orbit_2') ? 2 : 0);
            let angle = (time * ORBIT_SPEED) + (index * (Math.PI * 2) / 3);
            let targetX = owner.x + Math.cos(angle) * ORBIT_RADIUS;
            let targetZ = owner.z + Math.sin(angle) * ORBIT_RADIUS;
            let targetY = owner.y + 1.2 + Math.sin(time * 0.1) * 0.1;

            entity.setPosition(targetX, targetY, targetZ);
            
            // 强力维持：每刻重置 Age 防止消失
            if (entity.nbt.contains("Age")) {
                entity.mergeNbt({Age: 0});
            }

            // 2. 伤害逻辑 (每 10 刻判定一次，防止伤害过快)
            if (time % 10 == 0) {
                // 获取属性值
                let sPower = owner.getAttributeValue(SPELL_POWER);
                let ePower = owner.getAttributeValue(EVOCATION_POWER);
                let sDamage = owner.getAttributeValue(SUMMON_DAMAGE);

                // 自定义伤害公式: 基础伤害(2) * 法强 * 塑能倍率 + 召唤额外伤害
                // 你可以根据平衡性调整公式
                let totalDamage = (2.0 * sPower * ePower) + sDamage;

                // 检测法球周围的生物
                let targets = level.getEntitiesWithin(entity.boundingBox.inflate(0.5));
                targets.forEach(target => {
                    if (target.isLiving() && target !== owner) {
                        // 触发伤害，来源设为玩家
                        target.attack(totalDamage);
                        // 命中效果：播放粒子
                        level.spawnParticles('minecraft:crit', true, target.x, target.y + 1, target.z, 3, 0.2, 0.2, 0.2, 0.1);
                    }
                });
            }
        }
    });
});

PlayerEvents.tick(event => {
    let timer = event.player.persistentData.getInt('sphere_timer');
    if (timer > 0) event.player.persistentData.putInt('sphere_timer', timer - 1);
});