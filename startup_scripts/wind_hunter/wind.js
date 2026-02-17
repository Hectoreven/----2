StartupEvents.registry("item", event => {
    // 风行披风，背饰，移动速度+8%
    event.create('wind_cloak')
        .displayName("风行披风")
        .tooltip(Component.ofString("移动速度+8%").blue())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "generic.movement_speed",
                    "kubejs:wind_cloak_movement_speed",
                    0.008,
                    "add_value"
                )
        )
        .maxStackSize(1)
        .tag("curios:back");

    // 裂空者的羽毛，头饰，移动速度+8%，射击速度+25%
    event.create('skybreaker_feather')
        .displayName("裂空者的羽毛")
        .tooltip(Component.ofString("移动速度+8%,射击速度+25%").blue())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "generic.movement_speed",
                    "kubejs:skybreaker_feather_movement_speed",
                    0.008,
                    "add_value"
                )
                // 关键修正：补充缺失的 .addAttribute 方法前缀，去掉多余的独立括号
                .addAttribute(
                    "apothic_attributes:arrow_velocity",
                    "kubejs:skybreaker_feather_arrow_velocity",
                    0.25,
                    "add_value"
                )
        )    
        .maxStackSize(1)
        .tag("curios:head");

    // 狂风之心，项链，移动速度+8%，根据移动速度提升攻击力
    event.create('heart_of_gale')
        .displayName("狂风之心")
        .tooltip(Component.ofString("移动速度+8%，根据移动速度，每1%箭矢伤害1%").blue())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "generic.movement_speed",
                    "kubejs:heart_of_gale_movement_speed",
                    0.008,
                    "add_value"
                )
                 .onUnequip(context => {
                    context.entity().getAttribute("apothic_attributes:arrow_damage").addOrUpdateTransientModifier(new $AttributeModifier("kubejs:heart_of_gale", 0, "add_value"))
                })
        )
        .maxStackSize(1)
        .tag("curios:necklace");
});