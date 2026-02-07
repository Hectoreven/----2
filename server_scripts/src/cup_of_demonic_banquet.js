// 饰品效果：eou:cup_of_demonic_banquet后，击杀目标时，为自己回复1+0.1LV%的HP
// 需要配合curios和eou:cup_of_demonic_banquet标签使用
const curiosHelper = Java.loadClass("top.theillusivec4.curios.api.CuriosApi").getCuriosHelper()
 
//entity是否装备了饰品id为curioId的饰品
//return boolean
function isEquippedCurio(entity, curioId) {
    return curiosHelper.findFirstCurio(entity, curioId).isPresent()
}

EntityEvents.death(event => {
    //如果目标死亡，为自己回复1HP
    let entity = event.source.actual
    if (entity instanceof Player) {
        let player = entity
        
        if (isEquippedCurio(player, "kubejs:test")) {

            let curio = curiosHelper.findFirstCurio(player, "kubejs:test")
            if (curio.isPresent()) {
                let itemStack = curio.get()
                    let randommath = Math.floor(Math.random() + 4)//
                    let level = randommath
                    let healAmount = 1 + level

            player.heal(healAmount)
            player.tell(`恶宴之杯榨取了${healAmount}点生命值`)
                }
            }

        }
    }
)