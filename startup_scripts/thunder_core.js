//雷涌核心，护符，佩戴时，雷霆法术强度增加25%
StartupEvents.registry("item", event => {
event.create('thunder_core')
    .displayName("雷涌核心")
    .tooltip(Component.ofString("雷霆法术强度增加25%，施法速度-25%").yellow())
    .attachCuriosCapability(
        CuriosJSCapabilityBuilder.create()
            .modifyAttributesTooltip((tooltips, stack) => tooltips)
            .addAttribute(
                "irons_spellbooks:lightning_spell_power",
                "kubejs:thunder_core_lightning_spell_power",
                0.25,
                "add_value"
            )
            .addAttribute(
                "irons_spellbooks:cast_time_reduction",
                "kubejs:thunder_core_cast_time_reduction",
                -0.25,
                "add_value"
            )
    )
    .maxStackSize(1)
    .tag("curios:charm")
})