/*
*
* */

var Enemy = cc.Sprite.extend({
    _moveSpeed: TDF.ENEMIES.LESSER.MoveSpeed,
    _hp: TDF.ENEMIES.LESSER.BaseHP,
    _damage: TDF.ENEMIES.LESSER.BaseDamage,
    _type: TDF.ENEMIES.LESSER,
    _movePath: null,
    _aniMgr: null,

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
        this._movePath = TDFMap.getInstance()._movePath;
    },
});