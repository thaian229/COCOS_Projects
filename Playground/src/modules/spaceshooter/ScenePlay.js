/**
 * Space Shooter Main Game Loop
 */

const ScenePlay = cc.Layer.extend({
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
        let playYPos = cc.winSize.height/10;

        // Spawn the player once
        let player = cc.Sprite.create("assests/spaceshooter/sprites/space-ship.png");
        this.addChild(player, 0);
        player.setPosition(cc.winSize.width/2, playYPos);
        // let playerComponent = cc.Component.create();
        // playerSprite.addComponent(playerComponent);

        let btnBack = gv.commonButton(100, 64, size.width - 70, 52,"Back");
        this.addChild(btnBack);
        btnBack.addClickEventListener(this.onSelectBack.bind(this));
    },

    onEnter:function () {
        this._super();
    },

    onSelectBack:function(sender)
    {
        fr.view(SceneMainMenu);
    }
});