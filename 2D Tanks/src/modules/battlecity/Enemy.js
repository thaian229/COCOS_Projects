/*
* Enemy class, with move, attack, collision, etc.
* */

var Enemy = cc.Sprite.extend({
    _gunSprite: null,
    _deltaSinceShoot: 0.0,
    _fireRate: 2.0,
    eID: 0,
    active: false,
    zOrder: 1,
    _HP: 1,
    enemyType: null,
    moveDirection: null,
    isBlocked: {
        LEFT: false,
        RIGHT: false,
        UP: false,
        DOWN: false
    },

    ctor: function (enemyType) {
        this.enemyType = enemyType;
        this._super(this.enemyType.hullPath);

        // Init fields
        this.moveDirection = BC.DIRECTION.UP;
        this._HP = this.enemyType.MaxHP;
        this._fireRate = this.enemyType.fireRate;

        // Add gun
        this._gunSprite = cc.Sprite.create(this.enemyType.gunPath);
        this.addChild(this._gunSprite, this.zOrder + 1);
        this._gunSprite.setPosition(this.width / 2, this.height / 2);


        // Schedule
        // this.scheduleUpdate();
    },

    update: function (dt) {
        this.updateMove(dt);
        this.shoot(dt);
        if (this._HP <= 0) {
            this.destroy();
        }
    },

    updateMove: function (dt) {
        // TODO: Bot's movement
    },

    destroy:function () {
        BC.SCORE += this.enemyType.scoreValue;
        // Hide enemy
        this.visible = false;
        this.active = false;
        this.unscheduleUpdate();
        BC.ACTIVE_ENEMIES--;
    },

    shoot:function (dt) {
        this._deltaSinceShoot += dt;
        if (this._deltaSinceShoot >= this._fireRate) {
            var x = this.x, y = this.y;
            var b = Bullet.getOrCreateBullet(this.moveDirection, 2, BC.UNIT_TAG.ENEMY_BULLET);
            b.x = x + this.moveDirection.offset_x;
            b.y = y + this.moveDirection.offset_y;
            this._deltaSinceShoot = 0.0;
        }
    },

    hurt:function () {
        this._HP--;
    },

    collideRect:function (x, y) {
        var w = this.width * BC.SCALING, h = this.height * BC.SCALING;
        return cc.rect(x - w / 2 + 3, y - h / 2 + 3, w - 6, h - 6);
    },

    resetBlocked: function () {
        this.isBlocked.LEFT = false;
        this.isBlocked.RIGHT = false;
        this.isBlocked.UP = false;
        this.isBlocked.DOWN = false;
    }
});

Enemy.getOrCreateEnemy = function (enemyType) {
    var enemy = null;
    for (var j = 0; j < BC.CONTAINER.ENEMIES.length; j++) {
        enemy = BC.CONTAINER.ENEMIES[j];

        if (enemy.active === false && enemy.enemyType === enemyType) {
            enemy._HP = enemyType.MaxHP;
            enemy.active = true;
            enemy.visible = true;
            enemy.scheduleUpdate();
            BC.ACTIVE_ENEMIES++;
            return enemy;
        }
    }
    enemy = Enemy.create(enemyType);
    enemy.visible = true;
    enemy.active = true;
    enemy.scheduleUpdate();
    BC.ACTIVE_ENEMIES++;
    return enemy;
};

Enemy.create = function (enemyType) {
    var enemy = new Enemy(enemyType);
    g_sharedGameLayer.addChild(enemy, enemy.zOrder, BC.UNIT_TAG.ENEMY);
    enemy.setScale(BC.SCALING);
    BC.CONTAINER.ENEMIES.push(enemy);
    return enemy;
};

Enemy.preSet = function () {
    var enemy = null;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < BC.EnemyType.length; j++) {
            enemy = Enemy.create(BC.EnemyType[j]);
            enemy.visible = false;
            enemy.active = false;
        }
    }
};