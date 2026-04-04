EntityEvents.hurt(event => {
    // 1. 获取攻击源信息
    const source = event.source;
    // 获取直接造成伤害的实体 (比如箭、投掷物)
    const immediateAttacker = source.getImmediate();
    // 获取真正的攻击者 (玩家)
    const actualAttacker = source.getActual();
 
    // 2. 关键判断: 必须是玩家造成的伤害
    //    source.actual 代表最终的伤害来源，对于玩家攻击，这就是玩家实体
    if (!source.actual || !source.actual.isPlayer()) {
        return; // 如果不是玩家造成的伤害，直接退出
    }
 
    // 3. 获取玩家使用的物品
    const player = source.actual;
    // 获取玩家主手的物品
    const usedItem = player.getMainHandItem();
    // 如果玩家主手没有物品，则退出
    if (usedItem.isEmpty()) return;
 
    // 4. 获取被攻击的实体
    const targetEntity = event.entity;
 
    // 5. 寻找匹配的武器
    weaponBuffConfig.forEach(config => {
        // 检查当前使用的武器是否在配置的武器列表中
        // usedItem.id 是获取物品ID的标准方法，例如 'minecraft:iron_sword'
        if (config.weapons.includes(usedItem.id)) {
            // 6. 随机概率判断
            // Math.random() 生成 [0, 1) 之间的随机数
            if (Math.random() < config.probability) {
                // 7. 概率触发，遍历该配置下的所有效果
                config.effects.forEach(effectConfig => {
                    // 确定效果的目标实体
                    let target;
                    if (effectConfig.target === 'attacker') {
                        target = player;
                    } else if (effectConfig.target === 'target') {
                        target = targetEntity;
                    } else {
                        // 如果配置了未知目标，忽略
                        console.warn(`未知的效果目标: ${effectConfig.target}`);
                        return;
                    }
 
                    // 8. 检查目标实体是否存活 (对于给予实体效果是必要的)
                    if (!target || !target.isLiving()) return;
 
                    // 9. 为实体施加状态效果
                    target.potionEffects.add(
                        effectConfig.effect, // 效果ID
                        effectConfig.duration, // 持续时间
                        effectConfig.amplifier, // 等级
                        false, // 是否环境效果 (通常false)
                        true   // 是否显示粒子 (true为显示)
                    );
                });
            }
        }
    });
});