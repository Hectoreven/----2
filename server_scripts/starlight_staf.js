ItemEvents.rightClicked('kubejs:starlight_staf', event => {
    const { player, level, hand } = event
    
    // 检查主手（如果是副手触发，请调整逻辑）
    if (hand != 'MAIN_HAND') return
    
    // 冷却时间设置 (20 ticks = 1秒)
    player.swing()
    player.cooldowns.addCooldown(event.item, 20)
    
    // 获取玩家朝向向量
    let look = player.getLookAngle()
    
    // 定义5个方向的偏转角度 (弧度)
    // 正前, 左前, 右前, 左后, 右后
    let angles = [0, -Math.PI / 6, Math.PI / 6, -Math.PI / 2, Math.PI / 2]
    
    angles.forEach(angle => {
        // 计算旋转后的向量
        let cos = Math.cos(angle)
        let sin = Math.sin(angle)
        
        let vx = look.x * cos - look.z * sin
        let vz = look.x * sin + look.z * cos
        
        let spell_power=player.getAttribute("irons_spellbooks:spell_power").getValue()
        let ender_spell_power=player.getAttribute("irons_spellbooks:ender_spell_power").getValue()

        // 生成雪球
        let snowball = level.createEntity('irons_spellbooks:magic_missile')
        snowball.setPosition(player.x, player.y + player.eyeHeight, player.z)
        snowball.setMotion(vx * 1.5, look.y * 0.2, vz * 1.5)
        snowball.owner = player
        //伤害设置为0.6*末影法术强度+0.3*法术强度
        snowball.setDamage((0.3 * spell_power) + (0.7 * ender_spell_power))        
        
        // 标记雪球为法杖发射，用于后续伤害计算
        snowball.nbt.isStarlightProjectile = 1
        snowball.spawn()
    })
    
    level.playSound(null, player.x, player.y, player.z, 'minecraft:entity.snowball.throw', 'players', 1.0, 1.0)
})
