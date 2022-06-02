/*
*
* */

var AnimationManager = {
    _instance: null,

    ctor: function () {
        if (this._instance === null) {
            this._instance = this;
        }
        this.initiate();
    },

    initiate: function () {
        // Load all sprites
        cc.spriteFrameCache.addSpriteFrames(res.Animation_Lesser);
        cc.spriteFrameCache.addSpriteFrames(res.Animation_Elite);
        cc.spriteFrameCache.addSpriteFrames(res.Animation_Captain);

        // Generate animations for each enemy types
    },

    presetAnimationForType: function (type) {

    },

    presetEnemyAnimation: function (type, direction) {

    },

    getEnemyAnimation: function (type, direction) {

    },
};