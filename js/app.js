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
    vm.setActiveImage = setActiveImage;
    vm.checkDisable = checkDisable;
    vm.goLink = goLink;
    vm.imgLoaded = imgLoaded;

    function checkActive(tabVal) {
        if (tabVal === vm.currentTab) {
            return 'active';
        }
        return 'inactive';
    }

    // pass in +1 or -1
    function checkDisable(direction) {

        if (!vm.photos || !vm.photos.length || vm.photos.length < 1) {
            return true;
        }

        var resultIndex = vm.currentImageIndex + direction;
        var totalLength = vm.photos.length;

        if (resultIndex < 0 || resultIndex > (totalLength - 1)) {
            return true;
        }
        return false;
    }

    // pass in -1 or +1
    function changeImage(direction) {

        vm.showModalImage=false;
        vm.currentImageIndex = vm.currentImageIndex + direction;
        vm.currentImage = vm.photos[vm.currentImageIndex];
    }

    function setActiveImage(index) {
        vm.currentImageIndex = index;
        vm.currentImage = vm.photos[vm.currentImageIndex];
    }

    function setTab(tabVal) {

        if (tabVal !== vm.currentTab) {

            if (tabVal === 2 && vm.portraitImagesLoaded === false) {
                getPortraitImages()
            }

            vm.currentTab = tabVal;
            // always move to the top of the page
            $window.scrollTo(0, 0);
        }
    }

    function goLink(link, flag) {

        if (flag) {
            $window.open(link);
        } else {
            $window.open(link, "_blank");
        }
    }

    vm.portraitsLoaded = 0;
    vm.allPortraitsLoaded = false
    vm.portraitPercentage = 0;;

    function imgLoaded(image) {
        vm.portraitsLoaded++;

        if (vm.portraitsLoaded === vm.photos.length) {
            vm.allPortraitsLoaded = true;
        }

        vm.portraitPercentage = (vm.portraitsLoaded / vm.photos.length) * 100;
        vm.portraitPercentage = Math.round(vm.portraitPercentage * 100) / 100
    }

    //TODO Make a showcase album set
    function getPortraitImages() {
        var showCaseAlbumId = '72157665034972542';
        return getAlbumImages(showCaseAlbumId);
    }

    function getAlbumImages(photoSetId) {
        vm.isLoading = true;
        return $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=a204dbf28ba325b9f717d739309ac663&photoset_id=' + photoSetId + '&extras=url_q%2C+url_z%2Curl_l%2Ctags&format=json&nojsoncallback=1')
            .success(function (data) {
                if (data && data.photoset && data.photoset.photo.length) {
                    vm.photos = data.photoset.photo;
                    //shuffleSet(vm.photos);
                    vm.currentImage = vm.photos[0];
                    vm.isLoading = false;
                    if (vm.portraitImagesLoaded == null || vm.portraitImagesLoaded == false) {
                        vm.portraitImagesLoaded = true
                    }
                }
            });
    }

    // shuffles photoset so they display in a different order every time
    function shuffleSet(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    activate();

    function activate() {
        vm.currentTab = 1;
    }
}]);

app.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                //call the function that was passed
                scope.$apply(attrs.imageonload);
            });
        }
    };
});

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a')) {
        $(this).collapse('hide');
    }
});
