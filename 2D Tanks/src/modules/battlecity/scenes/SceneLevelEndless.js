/**
 * Simple Battle City Level Endless
 */

STATE_PLAYING = 0;
STATE_GAMEOVER = 1;
MAX_CONTAINT_WIDTH = 75;
MAX_CONTAINT_HEIGHT = 75;

var g_sharedGameLayer;

var SceneLevelEndless = cc.Layer.extend({
    _player: null,
    _explosions: null,
    _state: STATE_PLAYING,
    map: null,
    explosionAnimation: [],
    scoreLabel: null,
    _tmpScore: 0,
    _spawnRate: 2.0,
    _deltaTimeSinceSpawned: 0.0,
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
        this.createWallsColliders();

        g_sharedGameLayer = this.map;

        // var objectGroup = map.getObjectGroup("object_layer");
        // var play_spawn = objectGroup.getObjects()[0];

        // Player
        this._player = new Player();
        this.map.addChild(this._player, this._player.zOrder, BC.UNIT_TAG.PLAYER);

        // Event listeners
        this.addKeyboardListener();

        // schedule
        this.scheduleUpdate();

        // Add score counter
        this.scoreLabel = cc.LabelTTF("Score: 0", "battlecity/Pixeboy.ttf", 48);
        this.scoreLabel.attr({
            anchorX: 1,
            anchorY: 0,
            x: size.width - 25,
            y: size.height - 50
        });
        this.addChild(this.scoreLabel, 10);

        // Add button back
        var btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        this.addChild(btnBack, 10);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));

        // Presetting Object Pools
        Bullet.preSet();
        Enemy.preSet();
    },

    createWallsColliders: function () {
        var wallLayer = this.map.getLayer("wall");
        for (var i = 0; i < 25; i++) {
            for (var j = 0; j < 25; j++) {
                var sprite = wallLayer.getTileAt(cc.p(i, j));
                if (!sprite) continue;
                var k = Math.floor(Math.random() * 2) + 1;
                if (i === 0 || i === 24 || j === 0 || j === 24) k = 0;
                var wall = new Wall(sprite, BC.WallType[k]);
                this.map.addChild(wall, 0, 5000);
                wall.active = true;
                BC.CONTAINER.WALLS.push(wall);
            }
        }
    },

    addKeyboardListener:function () {
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

    update:function (dt) {
        if (this._state === STATE_PLAYING) {
            this.checkIsCollide();
            this.checkIsBlocked();
            this.updateUI();
            this.checkPlayerDied();
            this.spawnEnemies(dt);
        }
    },

    checkIsCollide:function () {
        var enemyNode, bulletNode;

        // check collide of Player's bullet & Enemies
        var i, player = this._player;
        for (i = 0; i < BC.CONTAINER.ENEMIES.length; i++) {
            enemyNode = BC.CONTAINER.ENEMIES[i];
            if (!enemyNode.active)
                continue;

            for (var j = 0; j < BC.CONTAINER.PLAYER_BULLETS.length; j++) {
                bulletNode = BC.CONTAINER.PLAYER_BULLETS[j];
                if (bulletNode.active && this.collide(bulletNode, enemyNode)) {
                    bulletNode.hurt();
                    enemyNode.hurt();
                }
            }
        }

        // Check collide of Enemies' bullets & Player
        for (i = 0; i < BC.CONTAINER.ENEMY_BULLETS.length; i++) {
            bulletNode = BC.CONTAINER.ENEMY_BULLETS[i];
            if (bulletNode.active && this.collide(bulletNode, player)) {
                if (player.active) {
                    bulletNode.hurt();
                    player.hurt();
                }
            }
        }
    },

    checkIsBlocked: function () {
        var enemyNode, wallNode, i = 0, j = 0, player = this._player;
        player.resetBlocked();
        // check player is blocked
        for (i = 0; i < BC.CONTAINER.WALLS.length; i++) {
            wallNode = BC.CONTAINER.WALLS[i];
            if (wallNode.active && this.collide(player, wallNode)) {
                if (wallNode.x + 16 >= player.x + 32 && Math.abs(wallNode.y + 16 - player.y) <= 32) player.isBlocked.RIGHT = true;
                if (wallNode.x + 16 <= player.x - 32 && Math.abs(wallNode.y + 16 - player.y) <= 32) player.isBlocked.LEFT = true;
                if (wallNode.y + 16 >= player.y + 32 && Math.abs(wallNode.x + 16 - player.x) <= 32) player.isBlocked.UP = true;
                if (wallNode.y + 16 <= player.y - 32 && Math.abs(wallNode.x + 16 - player.x) <= 32) player.isBlocked.DOWN = true;
            }
        }

        // Check enemies blocked
        for (i = 0; i < BC.CONTAINER.ENEMIES.length; i++) {
            enemyNode = BC.CONTAINER.ENEMIES[i];
            if (!enemyNode.active) continue;

            enemyNode.resetBlocked();
            for (j = 0; j < BC.CONTAINER.WALLS.length; j++) {
                wallNode = BC.CONTAINER.WALLS[j];
                if (wallNode.active && this.collide(enemyNode, wallNode)) {
                    if (wallNode.x + 16 >= enemyNode.x + 32 && Math.abs(wallNode.y + 16 - enemyNode.y) <= 32) enemyNode.isBlocked.RIGHT = true;
                    if (wallNode.x + 16 <= enemyNode.x - 32 && Math.abs(wallNode.y + 16 - enemyNode.y) <= 32) enemyNode.isBlocked.LEFT = true;
                    if (wallNode.y + 16 >= enemyNode.y + 32 && Math.abs(wallNode.x + 16 - enemyNode.x) <= 32) enemyNode.isBlocked.UP = true;
                    if (wallNode.y + 16 <= enemyNode.y - 32 && Math.abs(wallNode.x + 16 - enemyNode.x) <= 32) enemyNode.isBlocked.DOWN = true;
                }
            }
        }
    },

    updateUI:function () {
        if (this._tmpScore < BC.SCORE) {
            this._tmpScore++;
        }
        this.scoreLabel.setString("Score: " + this._tmpScore);
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

    spawnEnemies: function (dt) {
        if (BC.ACTIVE_ENEMIES >= BC.MAX_ENEMIES) {
            return;
        }
        this._deltaTimeSinceSpawned += dt;
        if (this._deltaTimeSinceSpawned >= this._spawnRate) {
            this._deltaTimeSinceSpawned = 0.0;
            var enemyTypeIndex = Math.floor(Math.random() * BC.EnemyType.length);
            var addEnemy = Enemy.getOrCreateEnemy(BC.EnemyType[enemyTypeIndex]);
            if (enemyTypeIndex % 2 === 0) {
                addEnemy.x = 32 * 2;
                addEnemy.y = Math.floor(Math.random() * 800 - 32 * 8) + 32 * 4;
            } else {
                addEnemy.x = Math.floor(Math.random() * 800 - 32 * 8) + 32 * 4;
                addEnemy.y = 32 * 2;
            }
        }
    },

    collide:function (a, b) {
        var ax = a.x, ay = a.y, bx = b.x, by = b.y;
        if (Math.abs(ax - bx) > MAX_CONTAINT_WIDTH || Math.abs(ay - by) > MAX_CONTAINT_HEIGHT)
            return false;
        // get 2 collider Rect (box) and check intersection
        var aRect = a.collideRect(ax, ay);
        var bRect = b.collideRect(bx, by);
        return cc.rectIntersectsRect(aRect, bRect);
    },

    onGameOver:function () {
        // TODO: GameOver Scene
        fr.view(SceneMenu);
    },

    onEnter:function () {
        this._super();
    },

    onSelectBack:function (sender)
    {
        fr.view(SceneMenu);
    }
});