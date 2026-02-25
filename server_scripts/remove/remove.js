ServerEvents.recipes(event => {
     event.remove({ output: 'waystones:blank_scroll' }) //移除空白传送卷轴
     event.remove({ output: 'waystones:warp_scroll' }) //移除传送卷轴
     event.remove({ output: 'waystones:warp_stone' }) //移除传送石

})