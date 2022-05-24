


var gsnTestIdx = -1;

var SPRITE_GROSSINI_TAG = 1;
var SPRITE_TAMARA_TAG = 2;
var SPRITE_KATHIA_TAG = 3;

// the class inherit from TestScene
// every Scene each test used must inherit from TestScene,
// make sure the test have the menu item for back to main menu
var GSNTestScene = TestScene.extend({
    runThisTest:function (num) {
        gsnTestIdx = (num || num == 0) ? (num - 1) : -1;
        this.addChild(nextGSNTest());
        director.runScene(this);
    }
});


var GSNDemo = BaseTestLayer.extend({

    ctor:function () {
        this._super(cc.color(0,0,0,255), cc.color(98,99,117,255) );
    },

    title:function () {
        return "GSNTest";
    },
    subtitle:function () {
        return "";
    },
    onBackCallback:function (sender) {
        var s = new GSNTestScene();
        s.addChild(previousGSNTest());
        director.runScene(s);
    },
    onRestartCallback:function (sender) {
        var s = new GSNTestScene();
        s.addChild(restartGSNTest());
        director.runScene(s);
    },
    onNextCallback:function (sender) {
        var s = new GSNTestScene();
        s.addChild(nextGSNTest());
        director.runScene(s);
    },
    numberOfPendingTests:function() {
        return ( (arrayOfActionsTest.length-1) - actionsTestIdx );
    },

    getTestNumber:function() {
        return actionsTestIdx;
    }
});


var GsnNetwork = GSNDemo.extend({

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        var yBtn = 2*size.height/3;

        var btnLogin = gv.commonButton(160, 48, size.width/4, yBtn,"Login");
        this.addChild(btnLogin);
        btnLogin.addClickEventListener(this.onSelectLogin.bind(this));

        var btnDisconnect = gv.commonButton(160, 48, size.width/2, yBtn,"Disconnect");
        this.addChild(btnDisconnect);
        btnDisconnect.addClickEventListener(this.onSelectDisconnect.bind(this));

        var btnReconnect = gv.commonButton(160, 48, 3*size.width/4, yBtn,"Reconnect");
        this.addChild(btnReconnect);
        btnReconnect.addClickEventListener(this.onSelectReconnect.bind(this));

        this.lblLog = gv.commonText(fr.Localization.text("..."), size.width*0.4, size.height*0.05);
        this.addChild(this.lblLog);

        this.initGuiGame();
    },
    initGuiGame:function()
    {
        var size = cc.director.getVisibleSize();

        this._gameNode = new cc.Node();
        this._gameNode.setPosition(cc.p(size.width*0.4, size.height*0.4));
        this._gameNode.setVisible(false);
        this.addChild(this._gameNode);

        var btnLeft = gv.commonButton(64, 64, -80, 0,"<");
        this._gameNode.addChild(btnLeft);
        btnLeft.addClickEventListener(function()
        {
            testnetwork.connector.sendMove(Direction.LEFT);
        }.bind(this));

        var btnRight = gv.commonButton(64, 64, 80, 0,">");
        this._gameNode.addChild(btnRight);
        btnRight.addClickEventListener(function()
        {
            testnetwork.connector.sendMove(Direction.RIGHT);
        }.bind(this));
        var btnUp = gv.commonButton(64, 64, 0, 80,"<");
        btnUp.setRotation(90);
        this._gameNode.addChild(btnUp);
        btnUp.addClickEventListener(function()
        {
            testnetwork.connector.sendMove(Direction.UP);
        }.bind(this));
        var btnDown = gv.commonButton(64, 64, 0, -80,">");
        btnDown.setRotation(90);
        this._gameNode.addChild(btnDown);
        btnDown.addClickEventListener(function()
        {
            testnetwork.connector.sendMove(Direction.DOWN);
        }.bind(this));



    },
    onSelectLogin:function(sender)
    {
        this.lblLog.setString("Start Connect!");
        gv.gameClient.connect();
    },
    onSelectDisconnect:function(sender)
    {
        this.lblLog.setString("Coming soon!");
    },
    onSelectReconnect:function(sender)
    {
        this.lblLog.setString("Coming soon!");
    },
    onConnectSuccess:function()
    {
        this.lblLog.setString("Connect Success!");
    },
    onConnectFail:function(text)
    {
        this.lblLog.setString("Connect fail: " + text);
    },
    onFinishLogin:function()
    {
        // this.lblLog.setString("Finish login!");
        this._gameNode.setVisible(true);
    },
    onUserInfo:function(userName, x, y)
    {
        this._gameNode.setVisible(true);
        this.lblLog.setString("Pos:" + x + "," + y);
    },
    updateMove:function(x, y)
    {
        this.lblLog.setString("Pos:" + x + "," + y);
    },

    title:function () {
        return "GsnNetwork";
    },
    subtitle:function () {
        return "";
    }
});

var GsnLocalize = GSNDemo.extend({

    ctor:function() {
        this._super();
        this.loadGui();

    },
    loadGui:function()
    {
        this.removeAllChildren();
        var size = cc.winSize;

        var btnVietLang = gv.commonButton(200, 64, size.width - 120, size.height - 52,"Vietnamese");
        this.addChild(btnVietLang);
        btnVietLang.addClickEventListener(this.onSelectVietnamese.bind(this));

        var btnEnglish = gv.commonButton(200, 64, size.width - 120, size.height - 136,"English");
        this.addChild(btnEnglish);
        btnEnglish.addClickEventListener(this.onSelectEnglish.bind(this));

        var lblHello = gv.commonText(fr.Localization.text("lang_hello"), size.width*0.4, size.height*0.8);
        this.addChild(lblHello);

        var lblDemo = gv.commonText(fr.Localization.text("lang_auto_text"), size.width*0.4, size.height*0.5);
        this.addChild(lblDemo);

    },
    onEnter:function(){
        this._super();
    },
    onSelectVietnamese:function(sender)
    {
        fr.Localization.getInstance().setCurrentLanguage('vi');
        this.loadGui();
    },
    onSelectEnglish:function(sender)
    {
        fr.Localization.getInstance().setCurrentLanguage('en');
        this.loadGui();
    },

    title:function () {
        return "GsnLocalize";
    },
    subtitle:function () {
        return "";
    }
});

var GsnAnimation = GSNDemo.extend({

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        var btnPlayIdle = gv.commonButton(200, 64, size.width - 120, size.height - 52,"Idle");
        this.addChild(btnPlayIdle);
        btnPlayIdle.addClickEventListener(this.testPlayAnimation.bind(this));

        var btnTestFinishEvent = gv.commonButton(200, 64, size.width - 120, size.height - 136,"Test Finish Event");
        btnTestFinishEvent.setTitleFontSize(26);
        this.addChild(btnTestFinishEvent);
        btnTestFinishEvent.addClickEventListener(this.testFinishAnimationEvent.bind(this));

        var btn_change_display = gv.commonButton(200, 64, size.width - 120, size.height - 220,"Change display");
        btn_change_display.setTitleFontSize(28);
        this.addChild(btn_change_display);
        btn_change_display.addClickEventListener(this.testChangeDisplayOnBone.bind(this));

        var btn_test_load = gv.commonButton(200, 64, size.width - 120, size.height - 304,"Test load ani");
        this.addChild(btn_test_load);
        btn_test_load.addClickEventListener(this.testLoadAnimation.bind(this));

        var btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));

        var xPos = (size.width - 220)/2;
        this.lblLog = gv.commonText(fr.Localization.text("..."), xPos, size.height*0.2);
        this.addChild(this.lblLog);

        this.nodeAnimation = new cc.Node();
        this.nodeAnimation.setPosition(xPos, size.height*0.5);
        this.nodeAnimation.setScaleX(-1);
        this.addChild(this.nodeAnimation);

        this.character = null;
        this.lblResult = new cc.LabelBMFont("",res.FONT_BITMAP_DICE_NUMBER);

        this.lblResult.setAnchorPoint(0.5,0.5);
        this.lblResult.retain();
        this.testPlayAnimation();
    },
    onEnter:function(){
        this._super();
    },
    onRemoved:function()
    {
        fr.unloadAllAnimationData(this);
    },
    updateTest:function(dt)
    {
        this.nodeAnimation.setScale(0.5);
        this.nodeAnimation.runAction(cc.scaleTo(0.5, 1.0).easing(cc.easeBounceOut()));
    },
    onSelectBack:function(sender)
    {
        fr.view(ScreenMenu);
    },
    testAnimationBinding:function()
    {
        if(this.character)
            this.character.removeFromParent();
        this.character = fr.createAnimationById(resAniId.chipu,this);
        this.nodeAnimation.addChild(this.character);
        this.character.setPosition(cc.p(0,0));
        this.character.setScale(2);
        this.character.getAnimation().gotoAndPlay("win_0_",-1,-1,1);
        this.character.setCompleteListener(function () {
            this.testAnimationBinding();
        }.bind(this));

    },
    testPlayAnimation:function()
    {
        if(this.character)
            this.character.removeFromParent(true);

        this.character = fr.createAnimationById(resAniId.chipu,this);
        //doi mau, yeu cau phai co file shader, nhung bone co ten bat dau tu color_ se bi doi mau
        this.character.setBaseColor(255,255,0);
        //chinh toc do play animation
        this.character.getAnimation().setTimeScale(0.5);
        this.nodeAnimation.addChild(this.character);
        //play animation gotoAndPlay(animationName, fadeInTime, duration, playTimes)
        this.character.getAnimation().gotoAndPlay("idle_0_",-1);

    },
    testFinishAnimationEvent:function()
    {
        if(this.character)
            this.character.removeFromParent();
        this.character = fr.createAnimationById(resAniId.chipu,this);
        this.nodeAnimation.addChild(this.character);
        this.character.getAnimation().gotoAndPlay("win_0_",-1,-1,1);
        this.character.setCompleteListener(this.onFinishAnimations.bind(this));
    },
    testChangeDisplayOnBone:function()
    {
        if(this.character)
            this.character.removeFromParent();
        this.character = fr.createAnimationById(resAniId.eff_dice_number,this);
        this.nodeAnimation.addChild(this.character);
        this.lblResult.removeFromParent();
        this.character.getArmature().getCCSlot("2").setDisplayImage(this.lblResult);
        var number = 2 + cc.random0To1()*10;
        this.lblResult.setString(Math.floor(number).toString());
        this.lblResult.retain();
        this.character.getAnimation().gotoAndPlay("run",0);

    },
    testLoadAnimation:function()
    {
        var testCount = 100;
        var start = Date.now();

        for(var i = 0; i< testCount; i++)
        {
            var ani  = fr.createAnimationById(resAniId.firework_test,this);
            this.addChild(ani);
            ani.setPosition(cc.random0To1()*cc.winSize.width, cc.random0To1()*cc.winSize.height);
            ani.getAnimation().gotoAndPlay("run",cc.random0To1()*5,-1,1);
            ani.setCompleteListener(this.onFinishEffect.bind(this));
        }
        var end = Date.now();
        cc.log("time: " + (end - start));
        this.lblLog.setString("time: " + (end - start));
    },

    onFinishAnimations:function()
    {
        this.character.getAnimation().gotoAndPlay("idle_0_",0);
    },
    onFinishEffect:function(animation)
    {
        animation.removeFromParent();
    },

    title:function () {
        return "GsnAnimation";
    },
    subtitle:function () {
        return "";
    }
});

var GSNAsyncImage = GSNDemo.extend({
    ctor:function() {
        this._super();

        this._avatar =  new fr.Avatar("https://png.icons8.com/color/1600/avatar.png", "res/Images/Icon.png");
        this.addChild(this._avatar);
        this._avatar.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    },
    onEnter:function(){
        this._super();
    },
    title:function () {
        return "AsyncImage";
    },
    subtitle:function () {
        return "";
    }
});

var GSNAnimation2 = GSNDemo.extend({
    ctor:function() {
        this._super();

    },
    onEnter:function(){
        this._super();
    },
    title:function () {
        return "AsyncImage";
    },
    subtitle:function () {
        return "Show animation from web";
    }
});

var arrayOfGSNTest = [
    GsnNetwork,
    GsnLocalize,
    GsnAnimation,
    GSNAnimation2,
    GSNAsyncImage
];


var nextGSNTest = function () {
    gsnTestIdx++;
    gsnTestIdx = gsnTestIdx % arrayOfGSNTest.length;

    if(window.sideIndexBar){
        actionsTestIdx = window.sideIndexBar.changeTest(gsnTestIdx, 1);
    }

    return new arrayOfGSNTest[gsnTestIdx]();
};
var previousGSNTest = function () {
    gsnTestIdx--;
    if (gsnTestIdx < 0)
        gsnTestIdx += arrayOfGSNTest.length;

    if(window.sideIndexBar){
        gsnTestIdx = window.sideIndexBar.changeTest(gsnTestIdx, 1);
    }

    return new arrayOfGSNTest[gsnTestIdx]();
};
var restartGSNTest = function () {
    return new arrayOfGSNTest[gsnTestIdx]();
};