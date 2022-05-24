/**
 * Simple Platform Level 1
 */

var ScreenLevel1 = cc.Layer.extend({
    _itemMenu: null,
    _beginPos: 0,
    isMouseDown: false,

    ctor:function () {
        this._super();
        this.loadGui();
    },

    loadGui:function () {
        this.removeAllChildren();
        var size = cc.winSize;

        // Add tilemap for level 1
        var map = cc.TMXTiledMap.create("battlecity/TileMap/battle_city_1_base64.tmx");
        this.addChild(map, 1);
        var objectGroup = map.getObjectGroup("object_layer");
        var play_spawn = objectGroup.getObjects()[0];
        // map.setPosition(size.width/2 - map.width/2, 0);

        var player = cc.Sprite.create("battlecity/sprites/color_a/Hull_01.png");
        this.addChild(player);
        player.setPosition(play_spawn.x, play_spawn.y);
        player.setScale(0.2);

        // Add button back
        var btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        this.addChild(btnBack, 10);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));
    },

    onEnter:function () {
        this._super();
    },

    onSelectBack:function(sender)
    {
        fr.view(ScreenMenu);
    }
});