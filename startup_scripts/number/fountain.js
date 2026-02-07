    //数字暴涨设备，攻击力+10%，护甲-10%，暴击几率+25%，栏位：护符
    
StartupEvents.registry('item', event => {
    event.create('number_dubble')
        .displayName('数字暴涨设备')
        .tooltip(Component.ofString('攻击力+10%，护甲-10%，暴击几率+25%').blue())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "generic.attack_damage",
                    "kubejs:number_dubble_attack_damage",
                    0.10,
                    "add_value"
                )
                .addAttribute(
                    "generic.armor",
                    "kubejs:number_dubble_armor",
                    -0.10,
                    "add_value"
                )
                .addAttribute(
                    "apothic_attributes:crit_chance",
                    "kubejs:number_dubble_crit_chance",
                    0.25,
                    "add_value"
                )
        )
        .maxStackSize(1)
        .tag('curios:charm');
    })