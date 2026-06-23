ItemEvents.rightClicked('kubejs:xinghua_staf', event => {
    const { player, level, hand, item } = event
    if (hand !== 'MAIN_HAND') return

    // 获取法术强度 (AP)
    let ap = player.getAttributeValue("irons_spellbooks:spell_power") || 0
    
    // --- 1. 扣除生命值 ---
    // 公式: 1 + 0.1 * AP
    let hpCost = 1 + (0.1 * ap)
    
    // 如果玩家生命不足以支付，则停止发射
    if (player.health <= hpCost) {
        player.displayClientMessage(Text.red("你的生命力不足以支撑这次施法"), true)
        return
    }
    
    // 执行扣血
    player.health -= hpCost
    
    // 冷却时间
    player.cooldowns.addCooldown(item, 20) 
    player.swing()

    // --- 2. 发射飞弹 ---
    let fireball = level.createEntity('irons_spellbooks:firebolt')
    if (fireball) {
        let look = player.getLookAngle()
        fireball.setPosition(player.x, player.y + player.eyeHeight, player.z)
        fireball.setMotion(look.x * 2.0, look.y * 2.0, look.z * 2.0)
        fireball.owner = player
        
        // --- 【新增】定义伤害逻辑 ---
        // 公式: 2 + 0.1 * AP
        let fireballDamage = 2 + (0.1 * ap)
        fireball.setDamage(fireballDamage) 
        
        // 标记该火球，以便在命中时识别
        fireball.addTag('cibei_fireball')
        
        fireball.spawn()
        
        // 发射音效与粒子
        level.playSound(null, player.x, player.y, player.z, 'minecraft:item.firecharge.use', 'players', 1.0, 1.2)
        level.spawnParticles('minecraft:damage_indicator', true, player.x, player.y + 1, player.z, 0.3, 0.3, 0.3, 5, 0.1)
    }
})

// --- 3. 命中回血逻辑 ---
EntityEvents.afterHurt(event => {
    const { source, level } = event
    
    // 检查是否为慈悲火球命中
    if (source.immediate && source.immediate.tags.contains('cibei_fireball')) {
        let owner = source.actual
        
        if (owner && owner.isPlayer()) {
            let ap = owner.getAttributeValue("irons_spellbooks:spell_power") || 0
            
            // 命中回血公式: 2 + 0.1 * AP
            let healAmount = 2 + (0.1 * ap)
            owner.heal(healAmount)
            
            // 视觉反馈
            level.spawnParticles('minecraft:heart', true, owner.x, owner.y + 1, owner.z, 0.3, 0.3, 0.3, 3, 0.1)
            owner.displayClientMessage(Text.gold(`生命抽取: +${healAmount.toFixed(1)}`), true)
        }
    }
})