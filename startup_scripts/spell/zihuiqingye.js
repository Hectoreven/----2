StartupEvents.registry('irons_spellbooks:spells', event => {
    event.create('orbiting_orbs')
        .setCastTime(20)
        .setCooldownSeconds(15)
        .setManaCostPerLevel(15)
        .setSchool('irons_spellbooks:evocation')
        .setMinRarity('rare')
        .setMaxLevel(10)
        // 核心：当法术施放时
        .onCast(ctx => {
            if (ctx.level.isClientSide()) return;

            let player = ctx.entity;
            let level = ctx.level;
            let spellLevel = ctx.getSpellLevel();
            
            // --- 属性计算 ---
            let baseDamage = 4 + (spellLevel * 2);
            let spellPower = ctx.getSpellPower();
            let summonDamageMult = player.getAttributeValue('irons_spellbooks:summon_damage');
            let finalDamage = baseDamage * spellPower * summonDamageMult;
            let durationTicks = (10 + (spellLevel * 2)) * 20;

            // --- 法球生成与逻辑 ---
            // 我们生成 3 个逻辑标记（这里使用 scheduleRepeating 进行逐帧更新）
            let orbData = [
                { angle: 0, state: 'orbit', target: null, currentPos: player.position() },
                { angle: 120, state: 'orbit', target: null, currentPos: player.position() },
                { angle: 240, state: 'orbit', target: null, currentPos: player.position() }
            ];

            let ticksPassed = 0;
            
            // 使用 KubeJS 的定时任务模拟法球行为
            let task = level.getServer().scheduleRepeatingInTicks(1, callback => {
                if (!player.isAlive() || ticksPassed >= durationTicks) {
                    callback.stop();
                    return;
                }
                ticksPassed++;
                let pPos = player.position().add(0, 1.2, 0); // 以玩家胸口为中心

                orbData.forEach((orb, i) => {
                    if (orb.state === 'orbit') {
                        // 1. 轨道环绕
                        orb.angle = (orb.angle + 8) % 360;
                        let rad = orb.angle * (Math.PI / 180);
                        let targetX = pPos.x() + Math.cos(rad) * 2.5;
                        let targetZ = pPos.z() + Math.sin(rad) * 2.5;
                        let targetY = pPos.y() + Math.sin(ticksPassed * 0.1) * 0.5;
                        
                        orb.currentPos = { x: targetX, y: targetY, z: targetZ };

                        // 寻敌逻辑
                        let enemies = level.getEntitiesWithin(player.boundingBox.inflate(8)).filter(e => 
                            e.isLiving() && e.uuid != player.uuid && !e.isAlliedTo(player)
                        );
                        if (enemies.length > 0) {
                            orb.target = enemies[0];
                            orb.state = 'attack';
                        }
                    } 
                    else if (orb.state === 'attack') {
                        // 2. 冲向目标
                        if (!orb.target || !orb.target.isAlive() || orb.target.distanceToSqr(player) > 100) {
                            orb.state = 'return';
                        } else {
                            let tPos = orb.target.position().add(0, 1, 0);
                            orb.currentPos.x += (tPos.x() - orb.currentPos.x) * 0.35;
                            orb.currentPos.y += (tPos.y() - orb.currentPos.y) * 0.35;
                            orb.currentPos.z += (tPos.z() - orb.currentPos.z) * 0.35;

                            if (orb.target.position().distanceToSqr(orb.currentPos.x, orb.currentPos.y, orb.currentPos.z) < 1.2) {
                                orb.target.attack(finalDamage);
                                // 触发 Iron's Spells 的魔法视觉效果
                                level.spawnParticles('irons_spellbooks:electricity', true, orb.currentPos.x, orb.currentPos.y, orb.currentPos.z, 0.2, 0.2, 0.2, 5, 0.1);
                                orb.state = 'return';
                            }
                        }
                    } 
                    else if (orb.state === 'return') {
                        // 3. 返回玩家
                        orb.currentPos.x += (pPos.x() - orb.currentPos.x) * 0.25;
                        orb.currentPos.y += (pPos.y() - orb.currentPos.y) * 0.25;
                        orb.currentPos.z += (pPos.z() - orb.currentPos.z) * 0.25;

                        if (player.position().distanceToSqr(orb.currentPos.x, orb.currentPos.y, orb.currentPos.z) < 1.0) {
                            orb.state = 'orbit';
                        }
                    }

                    // --- 渲染部分 ---
                    // 使用 magic_missile 粒子替代真正的实体，以节省性能并达到相同视觉效果
                    // 或者如果你必须用实体模型，可以在此处调用 level.spawnLightning 等，但推荐用粒子模拟模型
                    level.spawnParticles('irons_spellbooks:magic_missile', true, orb.currentPos.x, orb.currentPos.y, orb.currentPos.z, 0, 0, 0, 1, 0);
                });
            });
        });
});