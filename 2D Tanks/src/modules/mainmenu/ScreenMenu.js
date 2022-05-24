/**
 * Created by GSN on 7/6/2015.
 */

var ScreenMenu = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        var yBtn = 3*size.height/5;

        var btnPlatformer = gv.commonButton(200, 64, cc.winSize.width/2, yBtn/2,"Platformer");
        this.addChild(btnPlatformer);
        btnPlatformer.addClickEventListener(this.onSelectPlatformer.bind(this));

    },

    onEnter:function(){
        this._super();
    },

    onSelectPlatformer:function(sender)
    {
        fr.view(ScreenLevel1);
    }
});