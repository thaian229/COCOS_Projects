/*
* Hold bullet sprite, move bullet and define bullet collision
* */

var Bullet = cc.Sprite.extend({
    active: true,
    moveDirection: null,
    HP: 1,
    zOrder: 2,

    ctor: function (moveDirection) {
        this._super("battlecity/sprites/Light_Shell.png");

        this.moveDirection = moveDirection;
        this.scheduleUpdate();
    },

    update: function (dt) {
        this.x += this.moveDirection.x * dt;
        this.y += this.moveDirection.y * dt;
        if (this.x <= 0 || this.x >= BC.MAP_SIZE.width || this.y <= 0 || this.y >= BC.MAP_SIZE.height || this.HP <= 0) {
            this.destroy();
        }
    },

    destroy: function () {
        // TODO
        this.active = false;
        this.visible = false;
    },

    hurt: function () {
        this.HP--;
    },

    // Get collision detect rect for checking
    collideRect: function (x, y) {
        return cc.rect(x - 3, y - 3, 6, 6);
    }
});

Bullet.getOrCreateBullet = function (moveDirection, zOrder, mode) {
    /**/
    var selChild = null;
    if (mode === BC.UNIT_TAG.PLAYER_BULLET) {
        for (var j = 0; j < BC.CONTAINER.PLAYER_BULLETS.length; j++) {
            selChild = BC.CONTAINER.PLAYER_BULLETS[j];
            if (selChild.active === false) {
                selChild.visible = true;
                selChild.HP = 1;
                selChild.active = true;
                selChild.moveDirection = moveDirection;
                selChild.setRotation(selChild.moveDirection.rotation);
                return selChild;
            }
        }
    }
    else {
        for (var j = 0; j < BC.CONTAINER.ENEMY_BULLETS.length; j++) {
            selChild = BC.CONTAINER.ENEMY_BULLETS[j];
            if (selChild.active === false) {
                selChild.visible = true;
                selChild.HP = 1;
                selChild.active = true;
                selChild.moveDirection = moveDirection;
                selChild.setRotation(selChild.moveDirection.rotation);
                return selChild;
            }
        }
    }
    selChild = Bullet.create(moveDirection, zOrder, mode);
    return selChild;
};

Bullet.create = function (moveDirection, zOrder, mode) {
    var bullet = new Bullet(moveDirection);
    g_sharedGameLayer.addChild(bullet, zOrder, mode);
    if (mode === BC.UNIT_TAG.PLAYER_BULLET) {
        BC.CONTAINER.PLAYER_BULLETS.push(bullet);
    } else {
        BC.CONTAINER.ENEMY_BULLETS.push(bullet);
    }
    return bullet;
};

Bullet.preSet = function () {
    var bullet = null;
    for (var i = 0; i < 10; i++) {
        bullet = Bullet.create(BC.BULLET_DIRECTION.UP, 2, BC.UNIT_TAG.PLAYER_BULLET);
        bullet.visible = false;
        bullet.active = false;
    }
    for (var j = 0; j < 10; j++) {
        bullet = Bullet.create(BC.BULLET_DIRECTION.UP, 2, BC.UNIT_TAG.ENEMY_BULLET);
        bullet.visible = false;
        bullet.active = false;
    }
};

