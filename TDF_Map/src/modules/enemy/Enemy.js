/*
*
* */

var Enemy = cc.Sprite.extend({
    _moveSpeed: TDF.ENEMIES.LESSER.MoveSpeed,
    _hp: TDF.ENEMIES.LESSER.BaseHP,
    _damage: TDF.ENEMIES.LESSER.BaseDamage,
    _type: TDF.ENEMIES.LESSER,

    ctor: function (type) {
        this._type = type;
        let baseFrame = cc.spriteFrameCache.getSpriteFrame(type.SPRITE_BASE + "0000" + ".png");
        this._super(baseFrame);
    }
});