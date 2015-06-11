(function (angular) {
    'use strict';

    angular
        .module('movieClub.dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController(propertiesApi, usersApi) {
        var vm = this;
        vm.properties = {};
        vm.usernames = [];
        init();

        function init() {

            vm.properties.$isLoading = true;
            propertiesApi.getAll()
                .then(function (properties) {
                    vm.properties = properties;
                    vm.properties.$isLoading = false;
                });

            vm.usernames.$isLoading = true;
            usersApi.getAll()
                .then(function (users) {
                    vm.usernames = _(users)
                        .filter('username')
                        .pluck('username')
                        .value();
                    vm.usernames.$isLoading = false;
                });
        }
    }

}(window.angular));