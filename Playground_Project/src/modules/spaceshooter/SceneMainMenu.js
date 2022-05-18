/**
 * Created by AnNT21.
 */

const SceneMainMenu = cc.Layer.extend({
    _itemMenu: null,
    _beginPos: 0,
    isMouseDown: false,

    ctor:function () {
        this._super();
        let size = cc.director.getVisibleSize();
        let xBtn = size.width / 2;

        let btnPlay = gv.commonButton(200, 64, xBtn, 2*cc.winSize.height/6, "Play");
        this.addChild(btnPlay);
        btnPlay.addClickEventListener(this.onSelectPlay.bind(this));

        let btnIntroduction = gv.commonButton(200, 64, xBtn, 1*cc.winSize.height/6, "Introduction");
        this.addChild(btnIntroduction);
        btnIntroduction.addClickEventListener(this.onSelectIntroduction.bind(this));
    },

    onEnter:function () {
        this._super();
    },

    onSelectPlay:function (sender) {
        fr.view(ScenePlay);
    },

    onSelectIntroduction:function (sender) {
        fr.view(SceneIntroduction);
    },
});