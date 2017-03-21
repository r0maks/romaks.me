var app = angular.module('mySite', []);
app.controller('NavController', ['$http', '$scope', '$window', function ($http, $scope, $window) {
    var vm = this;

    vm.photos = [];
    // start on 0 index 
    vm.currentImageIndex = 0;
    vm.portraitImagesLoaded = false

    // functions 
    vm.checkActive = checkActive;
    vm.setTab = setTab;
    vm.getPortraitImages = getPortraitImages;
    vm.changeImage = changeImage;


    function checkActive(tabVal) {
        if (tabVal === vm.currentTab) {
            return 'active';
        }
        return 'inactive';
    }

    // pass in -1 or +1
    function changeImage(direction) {
        vm.currentImageIndex = vm.currentImageIndex + direction;
        vm.currentImage = vm.photos[vm.currentImageIndex];
    }

    function setTab(tabVal) {

        if (tabVal !== vm.currentTab) {

            if (tabVal === 2 && vm.portraitImagesLoaded === false) {
                getPortraitImages(vm.portraitImagesLoaded)
            }

            vm.currentTab = tabVal;
            // always move to the top of the page
            $window.scrollTo(0, 0);
        }
    }

    //TODO Make a showcase album set
    function getPortraitImages() {
        var showCaseAlbumId = '72157665034972542';
        return getAlbumImages(showCaseAlbumId, vm.portraitImagesLoaded);
    }

    function getAlbumImages(photoSetId, flag) {
        return $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=a204dbf28ba325b9f717d739309ac663&photoset_id=' + photoSetId + '&extras=url_q%2C+url_z%2Curl_l%2Ctags&format=json&nojsoncallback=1')
            .success(function (data) {
                if (data && data.photoset && data.photoset.photo.length) {
                    vm.photos = data.photoset.photo;
                    vm.currentImage = vm.photos[0];

                    if (flag != null && flag == false) {
                        flag = true
                    }
                }
            });
    }

    activate();

    function activate() {
        vm.currentTab = 1;
    }
}]);