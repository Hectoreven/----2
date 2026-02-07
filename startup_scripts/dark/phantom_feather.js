
StartupEvents.registry("item", event => {
    //魅影羽饰,irons_spellbooks:blood_spell_power+8%,移动速度+8%，
    event.create("phantom_feather")
        .displayName("魅影羽饰")
        .tooltip(Component.ofString("猩红法术强度r+8%,移动速度+8%").gray())
        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
                .modifyAttributesTooltip((tooltips, stack) => tooltips)
                .addAttribute(
                    "irons_spellbooks:blood_spell_power",
                    "kubejs:phantom_feather_blood_spell_power",
                    0.08,
                    "add_value"
                )
                .addAttribute(
                    "minecraft:generic.movement_speed",
                    "kubejs:phantom_feather_movement_speed",
                    0.08,
                    "add_value"
                )
        )
        .maxStackSize(1)
        .tag("curios:head")
})