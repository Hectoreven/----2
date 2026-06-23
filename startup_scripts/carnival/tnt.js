StartupEvents.registry("potion", event => {
event.create("kubejs:tnt_potion")
.displayName("浓缩液体TNT")
.effect("eternal_starlight:crystal_infection", 20 * 10, 1, true, false, false); 

});