/**
 * Created by AnNT21.
 */

const SceneIntroduction = cc.Layer.extend({
    _itemMenu: null,
    _beginPos: 0,
    isMouseDown: false,

    ctor:function () {
        this._super();
        this.loadGui();
    },

    loadGui:function () {
        this.removeAllChildren();
        let size = cc.winSize;

        let btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));
    },

    onEnter:function () {
        this._super();
    },

    onSelectBack:function (sender)
    {
        fr.view(SceneMainMenu);
    }
});