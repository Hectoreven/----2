
StartupEvents.registry("item", event => {
    //村民商业票券
    event.create('villager_trade_ticket')
        .displayName("村民商业票券")
        .tooltip(Component.ofString("随着世界的繁荣，生活在冒险家小镇的村民们也开始组织起来，发布属于自己的集资票券。").yellow())
        .maxStackSize(64),
    //猪人集团
    event.create('pigman_corporation_ticket')
        .displayName("猪人集团票券")
        .tooltip(Component.ofString("猪人集团发行的商业票券，似乎对黄金更加感兴趣，但是也是出了名的吝啬").yellow())
        .maxStackSize(64),
    //亵渎商会
    event.create('desecration_trade_ticket')
        .displayName("亵渎商会票券")
        .tooltip(Component.ofString("亵渎商会发行的商业票券，亵渎商会在探索魔法等方面有很多进取，并且擅长将很多魔法世俗化供大家使用").yellow())
        .maxStackSize(64),
    //可发行票券1
    event.create('custom_trade_ticket_1')
        .displayName("可发行票券1")
        .tooltip(Component.ofString("这是一个可发行票券，可以用来发行属于自己的商业票券").yellow())
        .maxStackSize(64),
    //可发行票券2
    event.create('custom_trade_ticket_2')
        .displayName("可发行票券2")
        .tooltip(Component.ofString("这是一个可发行票券，可以用来发行属于自己的商业票券").yellow())
        .maxStackSize(64),
    //可发行票券3
    event.create('custom_trade_ticket_3')
        .displayName("可发行票券3")
        .tooltip(Component.ofString("这是一个可发行票券，可以用来发行属于自己的商业票券").yellow())
        .maxStackSize(64),
    //可发行票券4
    event.create('custom_trade_ticket_4')
        .displayName("可发行票券4")
        .tooltip(Component.ofString("这是一个可发行票券，可以用来发行属于自己的商业票券").yellow())
        .maxStackSize(64),
    //可发行票券5
    event.create('custom_trade_ticket_5')
        .displayName("可发行票券5")
        .tooltip(Component.ofString("这是一个可发行票券，可以用来发行属于自己的商业票券").yellow())
        .maxStackSize(64)
    
    
    })
