const SPELLPOWER = 'irons_spellbooks:ice_spell_power';

ItemEvents.rightClicked('kubejs:ice_thunder_staff', event => {
    const { player, level } = event;

    let scanArea = player.boundingBox.inflate(16, 8, 16);
    // 性能优化：直接过滤掉非活体生物
    let targets = level.getEntitiesWithin(scanArea);

    let count = 0;
    const maxTargets = 20;

    let sPower = player.getAttributeValue(SPELLPOWER);
    let totalDamage = 4.0 * sPower; 

    for (let i = 0; i < targets.length; i++) {
        let target = targets[i];

        // 基础过滤
        if (target.isLiving() && target.uuid !== player.uuid && target.alive) {
            if (count >= maxTargets) break;

            let missile = level.createEntity('irons_spellbooks:icicle');
            if (missile) {
                // 1. 初始位置
                missile.setPosition(player.x, player.y + 2.0, player.z);

                // 2. 关键修复：计算朝向 (Pitch/Yaw)
                // 计算从玩家到目标的向量
                let dx = target.x - player.x;
                let dy = (target.y + target.bbHeight * 0.5) - (player.y + 1.6);
                let dz = target.z - player.z;

                // 计算水平距离
                let dh = Math.sqrt(dx * dx + dz * dz);

                // 计算 Yaw (水平角度) 和 Pitch (垂直角度)
                // 这里的计算是为了让实体的旋转角度指向目标
                let yaw = Math.atan2(dz, dx) * (180 / Math.PI) - 90;
                let pitch = -Math.atan2(dy, dh) * (180 / Math.PI); // 适当调整俯仰角，使导弹稍微向上飞行

                // 3. 将朝向和伤害直接写入 NBT
                // 大多数法术模组的弹射物会根据自身的 Rotation 决定初始飞行方向
                missile.mergeNbt({
                    Owner: player.uuid,
                    damage: totalDamage,
                    NoGravity: true,
                    Rotation: [yaw, pitch], // 强制设置实体的旋转
                    crit: true // 某些导弹支持暴击 NBT
                });

                // 4. 强制设置运动向量（归一化并在 spawn 后执行）
                let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                let speed = 0.25 + 0.1 * sPower; // 设置飞弹速度

                if (dist > 0.1) {
                    // 确保先 spawn，以便实体被世界注册
                    missile.spawn();
                    // 在 spawn 后立即强制设置运动，防止被 AI 复位
                    missile.setMotion(dx / dist * speed, dy / dist * speed, dz / dist * speed);
                } else {
                    // 如果太近，直接 spawn
                    missile.spawn();
                }
                //设置飞弹伤害
                missile.setDamage(totalDamage);

                level.spawnParticles('minecraft:witch', true, missile.x, missile.y, missile.z, 5, 0.1, 0.1, 0.1, 0.05);
                
                count++;
            }
        }
    }

    if (count > 0) {
        player.swing();
        try {
            player.playSound('minecraft:entity.arrow.shoot', 1.0, 1.2);
        } catch (e) {}
        player.addItemCooldown('kubejs:ice_thunder_staff/', 350); 
    } else {
        player.displayClientMessage(Text.red("范围内没有可攻击的目标"), true);
    }
});