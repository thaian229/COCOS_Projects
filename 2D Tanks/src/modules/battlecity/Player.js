var Player = cc.Sprite.extend({
    speed: 32 * 4,
    HP: 3,
    canBeAttacked: true,
    zOrder: 1,
    spawnLocation: {
        x: 32 * 14,
        y: 32 * 10
    },
    isActive: true,

    ctor: function () {
        this._super("battlecity/sprites/color_a/Hull_01.png");
        this.setScale(BC.SCALING);
        if (this.spawnLocation) {
            this.x = this.spawnLocation.x;
            this.y = this.spawnLocation.y;
        }

        // Add gun
        var gunSprite = cc.Sprite.create("battlecity/sprites/color_a/Gun_01.png");
        this.addChild(gunSprite, this.zOrder + 1);
        gunSprite.setPosition(this.width / 2, this.height / 2);

        // scheduling
        this.scheduleUpdate();
    },

    update: function (dt) {
        this.updateMove(dt);

        if (this.HP <= 0) {
            this.active = false;
            this.destroy();
        }
    },

    updateMove:function(dt)
    {
        if ((BC.KEYS[cc.KEY.w] || BC.KEYS[cc.KEY.up]) && this.y <= BC.MAP_SIZE.height) {
            this.y += dt * this.speed;
            this.setRotation(BC.ROTATION.UP);
        }
        if ((BC.KEYS[cc.KEY.s] || BC.KEYS[cc.KEY.down]) && this.y >= 0) {
            this.y -= dt * this.speed;
            this.setRotation(BC.ROTATION.DOWN);
        }
        if ((BC.KEYS[cc.KEY.a] || BC.KEYS[cc.KEY.left]) && this.x >= 0) {
            this.x -= dt * this.speed;
            this.setRotation(BC.ROTATION.LEFT);
        }
        if ((BC.KEYS[cc.KEY.d] || BC.KEYS[cc.KEY.right]) && this.x <= BC.MAP_SIZE.width) {
            this.x += dt * this.speed;
            this.setRotation(BC.ROTATION.RIGHT);
        }
    },

    destroy:function () {

    }
});