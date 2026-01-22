StartupEvents.registry("item", event => {
    event.create("fighting_book", "spellbook")
        .setMaxSpellSlots(2)  // 设置最大法术槽位数为2
        .addAttribute("irons_spellbooks:fire_spell_power", 0.5, "add_multiplied_total") // 法术强度+200%
        .addAttribute("irons_spellbooks:cooldown_reduction", 0.5, "add_multiplied_total") // 法术强度+200%
        .addSpell("irons_spellbooks:raise_hell", 1) // 预装1级火球术
        .rarity("UNCOMMON")   // 设置稀有度为"罕见"

    }
    )
