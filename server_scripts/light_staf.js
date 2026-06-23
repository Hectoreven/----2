ItemEvents.rightClicked('kubejs:light_staf', event => {
    const { player, level, hand, item } = event
    if (hand !== 'MAIN_HAND') return

    // 获取当前法力值 (Irons Spellbooks 存储在名为 "irons_spellbooks:mana" 的属性或 Data 中)
    // 注意：1.21.1 访问方式可能因版本而异，这里使用属性获取方式
    // let currentMana = player.getAttributeValue("irons_spellbooks:mana") 
    
    // // 检查法力是否足够 (每 Tick 消耗 1 点)
    // if (currentMana < 1) {
    //     player.displayClientMessage(Text.red("法力不足!"), true)
    //     return
    // }

    // 扣除法力：通过属性修改或命令模拟（这里推荐使用属性修改以保持同步）
    // 1.21.1 中建议使用 player.modifyAttribute 来实现
    // player.setAttributeBaseValue("irons_spellbooks:mana", currentMana - 1)

    // 冷却设为 1，实现最高频率
    player.cooldowns.addCooldown(item, 1)

    let look = player.getLookAngle()
    let projectile = level.createEntity('irons_spellbooks:guiding_bolt')
    
    if (projectile) {
        projectile.setPosition(
            player.x + look.x * 0.5, 
            player.y + player.eyeHeight - 0.2, 
            player.z + look.z * 0.5
        )
        //伤害为1点+0.1*法术强度
        let spell_power=player.getAttribute("irons_spellbooks:spell_power").getValue()
        let holy_power=player.getAttribute("irons_spellbooks:holy_spell_power").getValue()
        projectile.setDamage(0.2 +0.1 * holy_power + 0.05 * spell_power)

        let speed = 2.5
        projectile.setMotion(look.x * speed, look.y * speed, look.z * speed)
        projectile.owner = player
        
        // 【关键】打上标签，方便在伤害监听中识别并覆盖伤害
        projectile.addTag('custom_light_projectile')
        
        projectile.spawn()
        level.playSound(null, player.x, player.y, player.z, 'minecraft:entity.player.hurt_freeze', 'players', 0.1, 2.0)

        // 检测目标身上有tag:custom_light_target和irons_spellbooks:guided的实体，让minecraft:generic.scale提升100%。

        let targets = level.getEntities().filter(e => e.living && e.hasEffect('irons_spellbooks:guided'));
        targets.forEach(entity => {
            entity.getAttribute("minecraft:generic.scale").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:light_staf_scale", 1.0, "add_multiplied_total"))
        })
    }
})