/*
*
* */

var Enemy = cc.Sprite.extend({
    _moveSpeed: TDF.ENEMIES.LESSER.MoveSpeed,
    _hp: TDF.ENEMIES.LESSER.BaseHP,
    _damage: TDF.ENEMIES.LESSER.BaseDamage,
    _type: TDF.ENEMIES.LESSER,
    _movePath: null,
    _moveDirection: null,
    _moveDestination: null,

    ctor: function (type) {
        this._type = type;
        let baseFrame = cc.spriteFrameCache.getSpriteFrame(type.SPRITE_BASE + Utils.intTo4Chars(0) + ".png");
        this._super(baseFrame);

        this.initiate();
    },

    initiate: function () {
        this._moveSpeed = this._type.MoveSpeed;
        this._hp = this._type.BaseHP;
        this._damage = this._type.BaseDamage;
        this._movePath = g_shared_layer._map._movePath;
        this._moveDirection = TDF.DIRECTIONS.DOWN_RIGHT;
        let goal = this._movePath[this._movePath.length - 1];
        this._moveDestination = g_shared_layer._map.getPointFromCell(goal.x, goal.y);

        this.changeDirection(this._moveDirection);
        this.scheduleUpdate();
    },

    changeDirection: function (direction) {
        this.stopAllActions();
        let animation = cc.AnimationCache.getInstance().getAnimation(this._type.name + direction.name);
        let action = cc.animate(animation).repeatForever();
        this.runAction(action);
    },

    update: function (dt) {
        this.checkReachedGoal();
        this.updateDestination();
        this.updateMoveDirection();
        this.makeEnemyMove();
    },

    checkReachedGoal: function () {},

    updateDestination: function () {},

    updateMoveDirection: function () {},

    makeEnemyMove: function (dt) {},

    destroy: function () {
        this.active = false;
        this.visible = false;
        this.removeFromParent();
    },
});