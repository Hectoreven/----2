ItemEvents.rightClicked('kubejs:illusion_staf', event => {
    const { player, level, hand, item } = event
    if (hand !== 'MAIN_HAND') return

    player.swing()
    player.cooldowns.addCooldown(item, 30)

    const look = player.getLookAngle()
    const orb = level.createEntity('eternal_starlight:wilted_petal')
    
    orb.setPosition(player.x, player.y + player.eyeHeight - 0.2, player.z)
    orb.setMotion(look.x * 1.8, look.y * 1.8, look.z * 1.8)
    orb.owner = player
    
    // 使用 Tag 标记，方便在伤害事件中识别
    orb.addTag('isIllusionOrb')

    orb.spawn()

    level.playSound(null, player.x, player.y + 1.5, player.z, 'minecraft:entity.ender_eye.launch', 'players', 1.0, 1.2)
})
EntityEvents.afterHurt(event => {
    const { source, entity: target, level } = event
    
    // 检查伤害直接来源是否是带标记的箭（法球）
    if (source.immediate && source.immediate.type === 'eternal_starlight:wilted_petal' && source.immediate.tags.contains('isIllusionOrb')) {
        const projectile = source.immediate
        const player = projectile.owner // 这里的 owner 就是发射者

        // 基础安全检查：目标是生物、不是发射者本人
        if (target.isLiving() && player && target.uuid != player.uuid) {
            
            // --- 核心交换逻辑 ---
            const targetPos = { x: target.x, y: target.y, z: target.z }
            const playerPos = { x: player.x, y: player.y, z: player.z }

            // 执行传送
            player.setPosition(targetPos.x, targetPos.y, targetPos.z)
            target.setPosition(playerPos.x, playerPos.y, playerPos.z)

            // --- 伤害计算 ---
            // 获取 Irons Spellbooks 属性值 (使用 getAttributeValue 简化写法)
            let enderPower = player.getAttributeValue("irons_spellbooks:ender_spell_power") || 0
            let spellPower = player.getAttributeValue("irons_spellbooks:spell_power") || 0
            let totalDamage = 2 + (0.2 * enderPower) + (0.1 * spellPower)

            // 重新设置当前事件的伤害值，这样不需要额外调用 target.hurt()
            event.amount = totalDamage
            
            // 传送音效
            level.playSound(null, target.x, target.y, target.z, 'minecraft:entity.enderman.teleport', 'players', 1.0, 1.2)
            
            console.log(`[Illusion] 成功交换: ${player.username} <-> ${target.type}`)
        }
    }
})