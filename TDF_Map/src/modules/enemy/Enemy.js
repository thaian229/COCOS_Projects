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
    _goal: null,

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
        this._moveDirection = TDF.DIRECTIONS.DOWN;

        // Set move destination and final goal position
        let goal = this._movePath[0];
        this._goal = g_shared_layer._map.getPointFromCell(goal.x, goal.y);
        let firstCell = this._movePath.pop();
        this._moveDestination = g_shared_layer._map.getPointFromCell(firstCell.x, firstCell.y);

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
        this.makeEnemyMove(dt);
    },

    checkReachedGoal: function () {
        if (Math.abs(this.x - this._goal.x) < TDF.TERRAIN_RECT && Math.abs(this.y - this._goal.y) < TDF.TERRAIN_RECT) {
            this.destroy();
        }
    },

    updateDestination: function () {
        if (this._movePath.length <= 0) return;
        console.log("x: " + this.x + ", des x: " + this._moveDestination.x);
        console.log("y: " + this.y + ", des x: " + this._moveDestination.y);
        if (Math.abs(this.x - this._moveDestination.x) < TDF.TERRAIN_RECT && Math.abs(this.y - this._moveDestination.y) < TDF.TERRAIN_RECT) {
            let nextCell = this._movePath.pop();
            this._moveDestination = g_shared_layer._map.getPointFromCell(nextCell);
        }
    },

    updateMoveDirection: function () {
        let offset = TDF.TERRAIN_RECT / 2;
        let prevDirection = this._moveDirection;

        // To right
        if (this._moveDestination.x > this.x + offset) {
            if (this._moveDirection.y > this.y + offset) this._moveDirection = TDF.DIRECTIONS.UP_RIGHT;
            else if (this._moveDirection.y < this.y - offset) this._moveDirection = TDF.DIRECTIONS.DOWN_RIGHT;
            else this._moveDirection = TDF.DIRECTIONS.RIGHT;
        }
        // To Left
        else if (this._moveDirection.x < this.x - offset) {
            if (this._moveDirection.y > this.y + offset) this._moveDirection = TDF.DIRECTIONS.UP_LEFT;
            else if (this._moveDirection.y < this.y - offset) this._moveDirection = TDF.DIRECTIONS.DOWN_LEFT;
            else this._moveDirection = TDF.DIRECTIONS.LEFT;
        }
        // Just up or down
        else {
            if (this._moveDirection.y > this.y) this._moveDirection = TDF.DIRECTIONS.UP;
            else this._moveDirection = TDF.DIRECTIONS.DOWN;
        }
        // Update animation if needed
        if (this._moveDirection !== prevDirection) this.changeDirection(this._moveDirection);
    },

    makeEnemyMove: function (dt) {
        this.x += this._moveDirection.velocityX * dt * this._type.MoveSpeed;
        this.y += this._moveDirection.velocityY * dt * this._type.MoveSpeed;
    },

    destroy: function () {
        this.active = false;
        this.visible = false;
        this.removeFromParent();
    },
});