var fr = fr||{};
fr.Avatar = cc.Node.extend({
    ctor: function (url, defaultAvatar) {
        this._super();
        this._size = 160;
        this.setCascadeOpacityEnabled(true);

        this._defaultAvatar = new cc.Sprite(defaultAvatar);
        this.addChild(this._defaultAvatar);
        this._defaultAvatar.setCascadeOpacityEnabled(true);
        this._avatar = null;
        if(url !== undefined){
            this.updateAvatar(url);
        }
        return true;
    },
    updateAvatar:function(url)
    {
        if(_.isEmpty(url))
        {
            return;
        }
        if(this._avatar == null)
        {
            this._avatar = fr.AsyncSprite.create(this._defaultAvatar.getContentSize(), this.onFinishLoad.bind(this));
            this.addChild(this._avatar);
        }
        //cc.log("Url", url);
        this._defaultAvatar.setVisible(true);
        this._avatar.setVisible(false);
        this._avatar.updatePath(url,this.getStorePath(url));

    },
    onFinishLoad:function(result)
    {
        if(result)
        {
            //cc.log("Load Finish");
            this._defaultAvatar.setVisible(false);
            this._avatar.setVisible(true);
        }
        else
        {
            //cc.log("Load Failed");
            this._defaultAvatar.setVisible(true);
            this._avatar.setVisible(false);
        }
    },
    getStorePath:function(url)
    {
        return jsb.fileUtils.getWritablePath() + CryptoJS.MD5(url);
    }

});