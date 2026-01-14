StartupEvents.registry('irons_spellbooks:spells', event => {
    // 创建测试法术
    event.create('kubejs:hectorevens_spell')
        .setMaxLevel(5)  // 最大法术等级5
        .setCastTime(1)  // 施法时间1秒
        .setCooldownSeconds(8)  // 冷却8秒
        .setBaseManaCost(1)  // 基础法力消耗1点
        .setManaCostPerLevel(1)  // 每级额外消耗1点法力
        .setCastType('instant')  // 即时施法类型
        .setSchool('irons_spellbooks:holy')  // 属于神圣学派
        .canBeCraftedBy(player => false)  // 所有玩家都不可制作
        .onCast(ctx => {  // 施法时效果
            console.log("玩家等级: " + ctx.level)
            console.log("法术等级: " + ctx.spellLevel)
            console.log("施法实体: " + ctx.entity)
            console.log("施法来源: " + ctx.castSource)
            console.log("玩家魔法数据: " + ctx.playerMagicData)
            ctx.entity.heal(20)  // 治疗施法者20点生命值
        })
    event.create('kubejs:lingmu_slow_spell')
        .setMaxLevel(5)
        .setCastTime(1)
        .setCooldownSeconds(8)
        .setBaseManaCost(1)
        .setManaCostPerLevel(1)
        .setCastType('instant')
        .setSchool('irons_spellbooks:evocation')
        .canBeCraftedBy(player => false)
        .onCast(ctx => {
            //在持续的8秒内，每次攻击对受到伤害的目标施加一个减速效果，减速效果的强度与法术等级相关。
            console.log("玩家等级: " + ctx.level)
            console.log("法术等级: " + ctx.spellLevel)
            console.log("施法实体: " + ctx.entity)
            console.log("施法来源: " + ctx.castSource)
            console.log("玩家魔法数据: " + ctx.playerMagicData)
            const spellLevel = ctx.spellLevel;
            const duration = 160; // 8秒，游戏内时间单位为1/20秒
            const amplifier = spellLevel - 1; // 减速效果的强度与法术等级相关
            ctx.entity.persistentData().setInt('kubejs:lingmu_slow_spell_duration', duration);
            ctx.entity.persistentData().setInt('kubejs:lingmu_slow_spell_amplifier', amplifier);
        })

})