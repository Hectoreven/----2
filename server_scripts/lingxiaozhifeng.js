ItemEvents.rightClicked('kubejs:lingxiaozhifeng', event => {
    const { player, level, server, item } = event
    
    let ray = player.rayTrace(20)
    if (!ray.block) return 

    let targetX = ray.block.x + 0.5
    let targetY = ray.block.y + 0.3
    let targetZ = ray.block.z + 0.5

    player.cooldowns.addCooldown(item, 40)
    player.swing()

    let radius = 2.5 
    let maxTicks = 10 
    let elapsed = 0

    let carnivalBox = AABB.of(targetX - radius, targetY - 1, targetZ - radius, targetX + radius, targetY + 4, targetZ + radius)

    let carnivalTask = (task) => {
        if (elapsed >= maxTicks) {
            let finalEntities = level.getEntitiesWithin(carnivalBox)
            let ap = player.getAttributeValue("minecraft:generic.movement_speed") || 0.1
            let dmgAmt = 25 * ap 
            
            // --- 新增：爆炸时的樱花雨效果 ---
            // 生成 80 个随机分布的樱花粒子，覆盖 5x5 区域
            for (let i = 0; i < 80; i++) {
                let rx = targetX + (Math.random() - 0.5) * 5
                let ry = targetY + Math.random() * 3
                let rz = targetZ + (Math.random() - 0.5) * 5
                level.spawnParticles('minecraft:instant_effect', true, rx, ry, rz, 0.2, 0.2, 0.2, 1, 0.2)
            }

            finalEntities.forEach(e => {
                if (e.isLiving() && e.uuid !== player.uuid) {
                    e.attack(dmgAmt) 
                    // 怪物受击时额外爆出一簇樱花
                    level.spawnParticles('minecraft:reverse_portal', true, e.x, e.y + 1, e.z, 0.1, 0.1, 0.1, 100, 5)
                }
            })
            
            level.playSound(null, targetX, targetY, targetZ, 'minecraft:entity.generic.explode', 'music', 0.8, 1.2)
            server.tell(Text.lightPurple("凌霄：樱落斩灭！"))
            return 
        }

        // 持续阶段的法阵粒子
        for (let angle = 0; angle < 360; angle += 20) {
            let rad = angle * (Math.PI / 180)
            let px = targetX + radius * Math.cos(rad)
            let pz = targetZ + radius * Math.sin(rad)
            level.spawnParticles('minecraft:note', true, px, targetY, pz, 0.1, 0.1, 0.1, 1, 0.05)
        }

        elapsed++
        server.scheduleInTicks(1, carnivalTask)
    }

    server.scheduleInTicks(1, carnivalTask)
    server.tell(Text.gold("凌霄之锋！"))
})