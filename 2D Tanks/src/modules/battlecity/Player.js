/*
* Hold the tank and gun sprite
* Control Player movement, collision, shootings, etc.
* */

var Player = cc.Sprite.extend({
    _gunSprite: null,
    _deltaTimeLastShot: 0.0,
    _moveDirection: BC.BULLET_DIRECTION.UP,
    fireRate: 1.0,
    speed: 32 * 4,
    HP: 3,
    canBeAttacked: true,
    zOrder: 1,
    spawnLocation: {
        x: 32 * 14,
        y: 32 * 10
    },
    active: true,

    ctor: function () {
        this._super("battlecity/sprites/color_a/Hull_01.png");
        this.setScale(BC.SCALING);
        if (this.spawnLocation) {
            this.x = this.spawnLocation.x;
            this.y = this.spawnLocation.y;
        }

        // Add gun
        this._gunSprite = cc.Sprite.create("battlecity/sprites/color_a/Gun_01.png");
        this.addChild(this._gunSprite, this.zOrder + 1);
        this._gunSprite.setPosition(this.width / 2, this.height / 2);

        // scheduling
        this.scheduleUpdate();
    },

    update: function (dt) {
        this.updateMove(dt);
        this.shoot(dt);

        if (this.HP <= 0) {
            this.active = false;
            this.destroy();
        }
    },

    // update position base on input
    updateMove:function(dt)
    {
        if ((BC.KEYS[cc.KEY.w] || BC.KEYS[cc.KEY.up]) && this.y <= BC.MAP_SIZE.height) {
            this.y += dt * this.speed;
            this.setRotation(BC.ROTATION.UP);
            this._moveDirection = BC.BULLET_DIRECTION.UP;
        }
        if ((BC.KEYS[cc.KEY.s] || BC.KEYS[cc.KEY.down]) && this.y >= 0) {
            this.y -= dt * this.speed;
            this.setRotation(BC.ROTATION.DOWN);
            this._moveDirection = BC.BULLET_DIRECTION.DOWN;
        }
        if ((BC.KEYS[cc.KEY.a] || BC.KEYS[cc.KEY.left]) && this.x >= 0) {
            this.x -= dt * this.speed;
            this.setRotation(BC.ROTATION.LEFT);
            this._moveDirection = BC.BULLET_DIRECTION.LEFT;
        }
        if ((BC.KEYS[cc.KEY.d] || BC.KEYS[cc.KEY.right]) && this.x <= BC.MAP_SIZE.width) {
            this.x += dt * this.speed;
            this.setRotation(BC.ROTATION.RIGHT);
            this._moveDirection = BC.BULLET_DIRECTION.RIGHT;
        }
    },

    shoot:function (dt) {
        this._deltaTimeLastShot += dt;
        if (BC.KEYS[cc.KEY.space] && this._deltaTimeLastShot >= this.fireRate) {
            var bullet = Bullet.getOrCreateBullet(this._moveDirection, 2, BC.UNIT_TAG.PLAYER_BULLET)
            this._deltaTimeLastShot = 0.0;
            bullet.x = this.x + this._moveDirection.offset_x;
            bullet.y = this.y + this._moveDirection.offset_y;
        }
    },

    collideRect:function (x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h);
    },

    hurt:function () {
        if (this.canBeAttacked) {
            this.HP--;
        }
    },

    destroy:function () {
        // TODO
    }
});