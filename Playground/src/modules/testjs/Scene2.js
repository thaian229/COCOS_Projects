/**
 * Created by AnNT21.
 */

const Scene2 = cc.Layer.extend({
    _itemMenu: null,
    _beginPos: 0,
    isMouseDown: false,

    ctor:function () {
        this._super();
        let size = cc.director.getVisibleSize();
    },

    onEnter:function () {
        this._super();
    }
});