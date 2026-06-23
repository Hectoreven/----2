ItemEvents.rightClicked('kubejs:qihuan_staf', event => {
    const { player, level, server, item } = event
    
    let ray = player.rayTrace(20)
    if (!ray.block) return 

    let targetX = ray.block.x + 0.5
    let targetY = ray.block.y + 1.1
    let targetZ = ray.block.z + 0.5

    player.cooldowns.addCooldown(item, 400) // 2秒冷却，方便测试
    player.swing()

    let radius = 10
    // 持续时间：20秒（400 tick），每秒触发一次效果
    let maxSeconds = 400
    let elapsed = 0

    // 预定义 AABB，防止递归中丢失
    let carnivalBox = AABB.of(targetX - radius, targetY - 1, targetZ - radius, targetX + radius, targetY + 4, targetZ + radius)

    // 使用 server.schedule 的闭包特性
    let carnivalTask = (task) => {
        
        // --- 1. 检查是否到达 20 秒结局 ---
        if (elapsed >= maxSeconds) {
            let finalEntities = level.getEntitiesWithin(carnivalBox)
            //获取玩家的攻击力属性
            let ap = player.getAttributeValue("irons_spellbooks:spell_power") || 0
            if (Math.random() < 0.5) {
                // 结局 A：回复 (12 + 0.1AP)
                let healAmt = 12 + (0.1 * ap)
                finalEntities.forEach(e => {
                    if (e.isLiving()) {
                        e.heal(healAmt)
                        level.spawnParticles('minecraft:heart', true, e.x, e.y + 1, e.z, 0.5, 0.5, 0.5, 5, 0.05)
                    }
                })
                server.tell(Text.green("嘉年华结束：生命洗礼！"))
            } else {
                // 结局 B：伤害 (3.5AP + 8)
                let dmgAmt = (3.5 * ap) + 8
                finalEntities.forEach(e => {
                    if (e.isLiving()) {
                        // 使用 player 作为伤害来源，确保 AP 属性伤害能被系统接受
                        e.attack(dmgAmt) 
                        level.spawnParticles('minecraft:explosion', true, e.x, e.y + 1, e.z, 0.3, 0.3, 0.3, 3, 0.1)
                    }
                })
                server.tell(Text.red("嘉年华结束：混乱爆炸！"))
            }
            return // 停止递归
        }

        // --- 2. 持续阶段：粒子、急迫效果与加速 ---
        // 绘制法阵粒子
        for (let angle = 0; angle < 360; angle += 15) {
            let rad = angle * (Math.PI / 180)
            let px = targetX + radius * Math.cos(rad)
            let pz = targetZ + radius * Math.sin(rad)
            //增加粒子数量，形成更密集的法阵效果
            level.spawnParticles('minecraft:note', true, px, targetY, pz, 0.5, 0.5, 0.5, 1, 0.1)
            //firework
            level.spawnParticles('minecraft:firework', true, px, targetY, pz, 0.5, 0.5, 0.5, 1, 0.1)
        }
        //为玩家添加急迫效果，持续 1 秒，等级 1



        elapsed++
        // 关键：每 20 tick (1秒) 再次调度自身
        server.scheduleInTicks(1, carnivalTask)
    }

    // 启动递归
    server.scheduleInTicks(1, carnivalTask)
    server.tell(Text.gold("嘉年华法阵已开启，持续 20 秒..."))
})