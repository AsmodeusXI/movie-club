(function (angular) {
    'use strict';

    var moduleDependencies = [
        'angular-google-analytics',
        'firebase',
        'templates-main',
        'ui.router'
    ];

    angular
        .module('movieClub', moduleDependencies)
        .config(setDefaultRoute)
        .config(configureAnalytics)
        .config(sceDelegateProvider)
        .run(injectAnalytics)
        .run(handleAuthStates);

    function setDefaultRoute($urlRouterProvider) {
        $urlRouterProvider.when('', '/');
    }

    function configureAnalytics(AnalyticsProvider) {
        AnalyticsProvider.setAccount('UA-52798669-1');
        AnalyticsProvider.trackPages(true);
        AnalyticsProvider.trackUrlParams(true);
        AnalyticsProvider.trackPrefix('movie-club');
    }

    function sceDelegateProvider($sceDelegateProvider) {
        var whiteList = ['*://www.youtube.com/**'];
        $sceDelegateProvider.resourceUrlWhitelist(whiteList);
    }

    function injectAnalytics(Analytics) {
        // Analytics injected to enable automatic page tracking
    }

    function handleAuthStates($rootScope, $state, authApi) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                if ((toState.authRequired && !authApi.isLoggedIn()) ||
                    (toState.adminRequired && !authApi.isAdmin())) {
                    $state.transitionTo('login');
                    event.preventDefault();
                }
            }
        );
    }

}(window.angular));
