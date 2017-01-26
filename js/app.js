var app = angular.module('mySite', []);
app.controller('NavController', function() {
    var vm = this;

            // functions 
        vm.checkActive = checkActive;
        vm.setTab = setTab;

        function checkActive(tabVal){
            if(tabVal === vm.currentTab){
                return 'active';
            }
            return null;
        }

        function setTab(tabVal){
            vm.currentTab = tabVal;
        }

        activate ();

        function activate(){
            vm.currentTab = null;
        }
});