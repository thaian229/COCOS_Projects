/**
 * Simple Battle City Level Endless
 */

STATE_PLAYING = 0;
STATE_GAMEOVER = 1;

var SceneLevelEndless = cc.Layer.extend({
    _player: null,
    _explosions: null,
    _state: STATE_PLAYING,
    map: null,
    explosionAnimation: [],
    scoreLabel: null,

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

        // reset global values
        BC.CONTAINER.ENEMIES = [];
        BC.CONTAINER.ENEMY_BULLETS = [];
        BC.CONTAINER.PLAYER_BULLETS = [];
        BC.CONTAINER.EXPLOSIONS = [];
        BC.ACTIVE_ENEMIES = 0;

        BC.SCORE = 0;
        this._state = STATE_PLAYING;

        // Add tilemap
        this.map = cc.TMXTiledMap.create("battlecity/TileMap/BC_1.tmx");
        this.addChild(this.map, 0);
        this.map.setPosition(size.width/2 - this.map.width/2, 0);

        // var objectGroup = map.getObjectGroup("object_layer");
        // var play_spawn = objectGroup.getObjects()[0];

        // Player
        this._player = new Player();
        this.map.addChild(this._player, this._player.zOrder, BC.UNIT_TAG.PLAYER);

        // Event listeners
        this.addKeyboardListener();

        // schedule
        this.scheduleUpdate();
        this.schedule(this.scoreCounter, 1);

        // Add button back
        var btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        this.addChild(btnBack, 10);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));
    },

    addKeyboardListener:function (){
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    BC.KEYS[key] = true;
                    if (key === cc.KEY.w || key === cc.KEY.s || key === cc.KEY.up || key === cc.KEY.down) {
                        BC.KEYS[cc.KEY.a] = false;
                        BC.KEYS[cc.KEY.d] = false;
                        BC.KEYS[cc.KEY.left] = false;
                        BC.KEYS[cc.KEY.right] = false;
                    }
                    else if (key === cc.KEY.a || key === cc.KEY.d || key === cc.KEY.left || key === cc.KEY.right) {
                        BC.KEYS[cc.KEY.w] = false;
                        BC.KEYS[cc.KEY.s] = false;
                        BC.KEYS[cc.KEY.up] = false;
                        BC.KEYS[cc.KEY.down] = false;
                    }
                },
                onKeyReleased: function (key, event) {
                    BC.KEYS[key] = false;
                }
            }, this);
        }
    },

    scoreCounter:function () {
        if (this._state === STATE_PLAYING) {
            // TODO
        }
    },

    update:function (dt) {
        if (this._state === STATE_PLAYING) {
            this.checkIsCollide();
            this.removeInactiveUnit(dt);
            this.updateUI();
            this.checkPlayerDied();
        }
    },

    checkIsCollide:function () {
        // TODO
    },

    removeInactiveUnit:function (dt) {
        // TODO
    },

    updateUI:function () {
        // TODO
    },

    checkPlayerDied:function () {
        var player = this._player;
        if (player.HP <= 0) {
            this._state = STATE_GAMEOVER;
            this._player = null;
            this.runAction(cc.sequence(
                cc.delayTime(0.2),
                cc.callFunc(this.onGameOver, this)
            ));
        }
    },

    collide:function (a, b) {
        // TODO
    },

    onGameOver:function () {
        // TODO
    },

    onEnter:function () {
        this._super();
    },

    onSelectBack:function (sender)
    {
        fr.view(SceneMenu);
    }
});