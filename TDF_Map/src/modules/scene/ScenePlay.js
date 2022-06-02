/**
 * Simple Scene
 */

var ScenePlay = cc.Layer.extend({
    _itemMenu: null,
    _beginPos: 0,
    isMouseDown: false,
    _map: null,
    _deltaTimeSpawned: 0.0,

    ctor: function () {
        this._super();
        this.loadGui();
    },

    loadGui: function () {
        this.removeAllChildren();
        var size = cc.winSize;

        // Load Sprite Frame Cache
        cc.spriteFrameCache.addSpriteFrames(res.Animation_Lesser);
        cc.spriteFrameCache.addSpriteFrames(res.Animation_Elite);
        cc.spriteFrameCache.addSpriteFrames(res.Animation_Captain);

        // Add map
        this._map = new TDFMap();
        this.addChild(this._map);
        this._map.setPosition( (size.width - this._map._width) / 2, (size.height - this._map._height) / 2);

        // Test
        this._map.spawnEnemy(TDF.ENEMIES.LESSER);
        console.log(Utils.intTo4Chars(15));

        var btnBack = gv.commonButton(100, 64, size.width - 70, 52, "Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));
    },

    onEnter: function () {
        this._super();
    },

    onSelectBack: function (sender) {
        fr.view(SceneMenu);
    }
});