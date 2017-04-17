define(['backbone'],function(){
    var Router = Backbone.Router.extend({

        routes: {
            "hot":          "hotFun",
            "new":          "newFun",
            "pay":           "payFun",
            "pay/:query":    "payFun",
            "list":         "listFun",
            "personal":     "personalFun",
            "info":         "infoFun",
            "account":      "accountFun",
            "collection":    "collectionFun",
            "send":          "sendFun",
            "comment":       "commentFun",
            "like":          "likeFun",
            "collect":       "collectFun",
            "*actions":      "defaultAction"
        },
        hotFun: function() {
            require(['./modules/hot/hot.js'],function(loading){
                loading.render();
                loading.event();
            });
            getIndexNav()
        },
        newFun: function() {
            require(['./modules/new/new.js'],function(loading){
                loading.render();
                loading.event();
            });
            getIndexNav()
        },
        payFun: function(query) {
            require(['./modules/pay/pay.js'],function(loading){
                loading.render();
                loading.event(query);
            });
            getIndexNav()
        },
        listFun: function() {
            require(['./modules/list/list.js'],function(loading){
                loading.render();
                loading.event();
            });
            getIndexNav()
        },
        personalFun: function() {
            require(['./modules/personal/personal.js'],function(loading){
                loading.render();
                loading.event();
            });
            getSetNav()
        },
        infoFun: function() {
            require(['./modules/info/info.js'],function(loading){
                loading.render();
                loading.event();
            });
            getSetNav()
        },
        accountFun: function() {
            require(['./modules/account/account.js'],function(loading){
                loading.render();
                loading.event();
            });
            getSetNav()
        },
        collectionFun: function() {
            require(['./modules/collection/collection.js'],function(loading){
                loading.render();
                loading.event();
            });
            getSetNav()
        },
        sendFun: function() {
            require(['./modules/send/send.js'],function(loading){
                loading.render();
                loading.event();
            });
            getHomeNav()
        },
        commentFun: function() {
            require(['./modules/comment/comment.js'],function(loading){
                loading.render();
                loading.event();
            });
            getHomeNav()
        },
        likeFun: function() {
            require(['./modules/like/like.js'],function(loading){
                loading.render();
                loading.event();
            });
            getHomeNav()
        },
        collectFun: function() {
            require(['./modules/collect/collect.js'],function(loading){
                loading.render();
                loading.event();
            });
            getHomeNav()
        },
        defaultAction:function(){
            location.hash = 'hot';
        }
    });

    var router = new Router();
    function getIndexNav() {
        if($('.left-nav').find('div.left-index-nav').length == 1)return
        require(['./modules/index-nav/index-nav.js'],function(loading){
            loading.render();
            loading.event();
        });
    }
    function getSetNav() {
        if($('.left-nav').find('div.left-set-nav').length == 1)return
        require(['./modules/set-nav/set-nav.js'],function(loading){
            loading.render();
            loading.event();
        });
    }
    function getHomeNav() {
        if($('.left-nav').find('div.left-homo-nav').length == 1)return
        require(['./modules/home-nav/home-nav.js'],function(loading){
            loading.render();
            loading.event();
        });
    }
});