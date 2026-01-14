StartupEvents.registry("item", event => {
    event.create("holy_magic_sword", "magic_sword")
    //添加法术
    .addSpell("kubejs:hectorevens_spell", 1) 
    //1级专属治疗法术
    .addSpell("irons_spellbooks:fortify", 5) // 可施放5级强化法术
    .setTier(tier =>{
        tier.useBaseTier("CRYSTAL_MAGEHUNTER", true) // 水晶猎魔人模板
            .setUses(666)  // 耐久度666
            .setDamage(4) // 攻击伤害4
            .setRepairIngredient(() => Ingredient.of("minecraft:gold_ingot")) // 用金锭修复

    event.create("lingmu_scythe", "magic_sword",)
    .addSpell("kubejs:lingmu_slow_spell", 1)
    .setTier(tier =>{
        tier.useBaseTier("HELLRAZOR", true)
            .setUses(666)
            .setDamage(8)
            .setRepairIngredient(() => Ingredient.of("minecraft:gold_ingot"))


    }
    )
})
})