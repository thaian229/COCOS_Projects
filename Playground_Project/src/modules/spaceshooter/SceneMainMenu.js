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

        // Draw title background
        let titleBackGround = cc.Sprite.create("assests/spaceshooter/colors/1x1_#ff0000ff.png");
        this.addChild(titleBackGround, -1);
        titleBackGround.setScale(400, 128);
        // let scaleTo = cc.scaleTo(0, 400, 128);
        // titleBackGround.runAction(scaleTo);
        titleBackGround.setPosition(xBtn, 4*cc.winSize.height/6);
        // let moveTo = cc.moveTo(0, xBtn, 4*cc.winSize.height/6);
        // titleBackGround.runAction(moveTo);

        // Draw Title Text
        let titleText = cc.LabelTTF("Space Shooter", "assests/spaceshooter/fonts/Pixeboy-z8XGD.ttf", 32);
        this.addChild(titleText);
        titleText.setPosition(xBtn, 4*cc.winSize.height/6);


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