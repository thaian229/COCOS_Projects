/*
* Enemy class, with move, attack, collision, etc.
* */

var Enemy = cc.Sprite.extend({
    _gunSprite: null,
    eID: 0,
    active: true,
    zOrder: 1,
    HP: 1,
    enemyType: null,
    moveDirection: null,

    ctor: function (enemyType) {
        this.enemyType = enemyType;
        this._super(this.enemyType.hullPath);

        // Init fields
        this.moveDirection = BC.BULLET_DIRECTION.UP;
        this.HP = this.enemyType.HP;

        // Add gun
        this._gunSprite = cc.Sprite.create(this.enemyType.gunPath);
        this.addChild(this._gunSprite, this.zOrder + 1);
        this._gunSprite.setPosition(this.width / 2, this.height / 2);

        // Schedule
        this.scheduleUpdate();
        this.schedule(this.shoot, this.enemyType.fireRate);
    },

    update: function (dt) {
        this.updateMove();
        if (this.HP <= 0) {
            this.active = false;
            this.destroy();
        }
    },

    updateMove: function (dt) {
        // TODO
    },

    destroy:function () {
        BC.SCORE += this.scoreValue;
        // TODO
        this.visible = false;
        this.active = false;
        this.stopAllActions();
        this.unschedule(this.shoot);
        BC.ACTIVE_ENEMIES--;
    },

    shoot:function () {
        var x = this.x, y = this.y;
        var b = Bullet.getOrCreateBullet(this.moveDirection, 2, BC.UNIT_TAG.ENEMY_BULLET);
        b.x = x + this.moveDirection.offset_x;
        b.y = y + this.moveDirection.offset_y;
    },

    hurt:function () {
        this.HP--;
    },

    collideRect:function (x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h);
    }
});

Enemy.getOrCreateEnemy = function (arg) {
    var selChild = null;
    for (var j = 0; j < MW.CONTAINER.ENEMIES.length; j++) {
        selChild = MW.CONTAINER.ENEMIES[j];

        if (selChild.active == false && selChild.enemyType == arg.type) {
            selChild.HP = arg.HP;
            selChild.active = true;
            selChild.moveType = arg.moveType;
            selChild.scoreValue = arg.scoreValue;
            selChild.attackMode = arg.attackMode;
            selChild._hurtColorLife = 0;

            selChild.schedule(selChild.shoot, selChild.delayTime);
            selChild.visible = true;
            MW.ACTIVE_ENEMIES++;
            return selChild;
        }
    }
    selChild = Enemy.create(arg);
    MW.ACTIVE_ENEMIES++;
    return selChild;
};

Enemy.create = function (enemyType) {
    var enemy = new Enemy(enemyType);
    g_sharedGameLayer.addChild(enemy, enemy.zOrder, BC.UNIT_TAG.ENEMY);
    BC.CONTAINER.ENEMIES.push(enemy);
    return enemy;
};

Enemy.preSet = function () {
    var enemy = null;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < EnemyType.length; j++) {
            enemy = Enemy.create(EnemyType[j]);
            enemy.visible = false;
            enemy.active = false;
            enemy.stopAllActions();
            enemy.unscheduleAllCallbacks();
        }
    }
};