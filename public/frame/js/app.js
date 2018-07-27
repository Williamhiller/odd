// Ionic Starter App

angular.module('global',['global.router','global.controller','global.service','global.directive','global.filter']);
angular.module('myApp', ['ionic','global'])
    .run(["$rootScope","$state",'$location','$ionicPlatform','$window','$ionicLoading','$ionicViewSwitcher','$ionicHistory',function($rootScope,$state,$location,$ionicPlatform,$window,$ionicLoading,$ionicViewSwitcher,$ionicHistory){
        "use strict";
        $rootScope.stateGo = function(statename,base){
            if(!base) {
                $state.go(statename);
                // $ionicViewSwitcher.nextDirection("forward");
                return;
            }
            $state.go(statename,base);
        };
        $rootScope.back = function (state){
            // 检测是否保存有上一个页面的信息  即是否刷新过当前页面
            if(!state){
                $ionicHistory.backView()?$ionicHistory.goBack():$state.go("tab."+$location.path().split('/')[1]);
                $ionicViewSwitcher.nextDirection("back")
            }else {
                $state.go(state);
            }
            // $ionicViewSwitcher.nextDirection("back")
        };
        $rootScope.showLoading = function(message,timeout) {
            $ionicLoading.show({
                template: message || '拼命加载中...',
                duration: timeout  //n毫秒后关闭
            });
        };
        $rootScope.hideLoading = function(){
            $ionicLoading.hide();
        };

        //将外部全局配置引入
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

            //如果需要登录则检测登录状态
            // userService.isLogin();
            if(!angular.isUndefined(toState.data)){
                // if(toState.data.isLogin&& !$rootScope.isLogin) {
                //     event.preventDefault();
                //     $state.go('tab.login',{jumpPage:fromState.name,param:fromParams});
                //     return;
                // }

                //是否隐藏tabs
                if(toState.data.hideTabs){
                    $rootScope.hideTabs = true;
                }else{
                    $rootScope.hideTabs = false;
                }
            }
        });
        $rootScope.$on('$stateChangeSuccess', function(event,State){

        });

    }])

// 安卓tabs自动在上边 设置统一在底部
    .config(["$ionicConfigProvider","$httpProvider",function ($ionicConfigProvider,$httpProvider) {
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');
        //
        // $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        // $ionicConfigProvider.platform.android.navBar.alignTitle('left');


        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');

    }]);

