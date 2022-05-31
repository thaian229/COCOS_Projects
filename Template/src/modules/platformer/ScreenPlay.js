/**
 * Simple Platform Level 1
 */

var ScreenPlay = cc.Layer.extend({
    _itemMenu: null,
    _beginPos: 0,
    isMouseDown: false,

    ctor:function () {
        this._super();
        this.loadGui();
    },
    loadGui:function () {
        this.removeAllChildren();
        var size = cc.winSize;

        var btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));
    },
    onEnter:function () {
        this._super();
    },
    onSelectBack:function(sender)
    {
        fr.view(ScreenMenu);
    }
});