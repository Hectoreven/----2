// server_scripts/swap_pendant_logic.js

// 辅助函数：检测玩家是否佩戴了该饰品（支持副手、盔甲栏及 Curios 饰品栏）
function isAccessoryEquipped(player) {
    // 1. 检测副手
    if (player.offHandItem.id === 'minecraft:gold_chestplate') return true;
    
    // 2. 检测盔甲栏
    for (let slot of ['chest', 'legs', 'feet', 'head']) {
        if (player.getEquipment(slot).id === 'minecraft:gold_chestplate') return true;
    }
    
    // 3. 动态检测 Curios 饰品栏（利用 Java 反射，未安装 Curios 也会安全跳过不会崩溃）
    try {
        let CuriosApi = Java.type('top.theillusivec4.curios.api.CuriosApi');
        let hasCurio = CuriosApi.getCuriosHelper().findFirstCurio(player, Item.of('minecraft:gold_chestplate')).isPresent();
        if (hasCurio) return true;
    } catch (e) {
        // 未安装 Curios API 时忽略
    }
    
    return false;
}

ServerEvents.tick(event => {
    event.server.players.forEach(player => {
        // --- 1. 耐久冲销逻辑：如果上一刻触发了切枪攻击，在此处把主手被扣的耐久“报销”掉 ---
        if (player.persistentData.contains('kjs_mainhand_pre_damage')) {
            let preDamage = player.persistentData.getInt('kjs_mainhand_pre_damage');
            let currentMainHand = player.mainHandItem;
            // 如果主手物品没变，且耐久确实减少了（damageValue变大了），则将其复原
            if (!currentMainHand.empty && currentMainHand.damageValue > preDamage) {
                currentMainHand.damageValue = preDamage;
            }
            player.persistentData.remove('kjs_mainhand_pre_damage'); // 清除标记
        }

        // --- 2. 核心切枪监测逻辑 ---
        let currentItem = player.mainHandItem;
        let storedItemId = player.persistentData.getString('kjs_last_item_id');

        if (currentItem.id !== storedItemId) {
            if (storedItemId !== '') {
                let lastDmg = player.persistentData.getDouble('kjs_last_item_damage');
                if (lastDmg > 0) {
                    player.persistentData.putDouble('kjs_prev_item_damage', lastDmg);
                    player.persistentData.putInt('kjs_switch_window', 15); // 15 tick 判定窗口
                }
            }
            player.persistentData.putString('kjs_last_item_id', currentItem.id);
        } else {
            let currentDmg = player.getAttributeValue('minecraft:generic.attack_damage');
            player.persistentData.putDouble('kjs_last_item_damage', currentDmg);
        }

        // 窗口倒计时
        let windowTimer = player.persistentData.getInt('kjs_switch_window');
        if (windowTimer > 0) {
            player.persistentData.putInt('kjs_switch_window', windowTimer - 1);
        }
    });
});

// 监听实体受击：篡改伤害，并转移耐久消耗到副手
EntityEvents.afterHurt(event => {
    let source = event.source;
    if (!source.actual || !source.actual.isPlayer()) return;
    
    let player = source.actual;
    
    // 检查是否佩戴饰品
    if (!isAccessoryEquipped(player)) return;
    
    // 检查是否处于切枪判定时间内
    let windowTimer = player.persistentData.getInt('kjs_switch_window');
    if (windowTimer > 0) {
        let prevDmg = player.persistentData.getDouble('kjs_prev_item_damage');
        let offHandItem = player.offHandItem;

        // 【核心修改点】只有当副手持有可以消耗耐久的物品（如盾牌、工具、其他武器）时，才触发效果
        if (!offHandItem.empty && offHandItem.maxDamage > 0) {
            
            // 1. 覆盖伤害为前者的伤害
            event.amount = prevDmg;
            
            // 2. 扣除副手物品 1 点耐久（该方法会自动计算“耐久”附魔并处理物品损坏破裂）
            offHandItem.damage(1, player);
            
            // 3. 记录当前主手物品受损前的耐久值，留给下一刻的 Tick 事件进行复原
            if (!player.mainHandItem.empty) {
                player.persistentData.putInt('kjs_mainhand_pre_damage', player.mainHandItem.damageValue);
            }
            
            // 成功触发后立刻关闭窗口
            player.persistentData.putInt('kjs_switch_window', 0);
        }
    }
});