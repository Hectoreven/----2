StartupEvents.registry('item', event => {
    // 注册名为 hui_blade 的剑
    event.create('hui_sword', 'sword')
        .tier('wood') // 使用钻石级面板作为基础（可自行修改为 iron, netherite 等）
        .attackDamageBaseline(1.0) // 基础攻击力（配合钻石面板，实际面板伤害会更高）
        .attackDamageBonus(1.0)
        .maxDamage(100) // 设置最大耐久度（例如钻石剑是 1561）
        .displayName('灰烬之刃') // 游戏内显示的名称
        //介绍：每损失1耐久，获得1%攻击力提升，满耐久时无增益
        .tooltip('§7每损失1耐久，获得1%攻击力提升，满耐久时无增益');
})