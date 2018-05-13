var app = angular.module('mySite', []);
app.controller('NavController', ['$http', '$scope', '$window', function ($http, $scope, $window) {
    var vm = this;

    vm.portraits = [];
    vm.currentTab = 1;
    // start on 0 index 
    vm.currentImageIndex = 0;
    vm.portraitImagesLoaded = false

    // functions 
    vm.checkActive = checkActive;
    vm.setTab = setTab;
    vm.getPortraitImages = getPortraitImages;
    vm.setActivePortrait = setActivePortrait;
    vm.goLink = goLink;
    vm.imgLoaded = imgLoaded;
    vm.currentYear = (new Date()).getFullYear();

    function checkActive(tabVal) {
        if (tabVal === vm.currentTab) {
            return 'active';
        }
        return 'inactive';
    }


    function setActivePortrait(index) {

        $scope.$broadcast('show-photo', {index: index, photos: vm.portraits});
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

        if (vm.portraitsLoaded === vm.portraits.length) {
            vm.allPortraitsLoaded = true;
        }

        vm.portraitPercentage = (vm.portraitsLoaded / vm.portraits.length) * 100;
        vm.portraitPercentage = Math.round(vm.portraitPercentage * 100) / 100
    }

    //TODO Make a showcase album set
    function getPortraitImages() {
        var showCaseAlbumId = '72157665034972542';
        getAlbumImages(showCaseAlbumId)
        .success(function (data) {
            if (data && data.photoset && data.photoset.photo.length) {
                vm.portraits = data.photoset.photo;
                vm.isLoading = false;
                if (!vm.portraitImagesLoaded) {
                    vm.portraitImagesLoaded = true
                }
            }
        });
    }

    function getAlbumImages(photoSetId) {
        return $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=a204dbf28ba325b9f717d739309ac663&photoset_id=' + photoSetId + '&extras=url_q%2C+url_z%2Curl_l%2Ctags&format=json&nojsoncallback=1');
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


(function () {
    'use strict';

    angular
        .module('mySite')
        .directive('photoViewer', PhotoViewerDirective);

    function PhotoViewerDirective() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            restrict: 'EA',
            scope: {
            },
            controllerAs: 'vm',
            controller: PhotoViewerController,
            templateUrl: 'photo-viewer.html'
        };
        return directive;

    }
    /* @ngInject */
    function PhotoViewerController($scope) {

        var vm = this;
        vm.currentImageIndex = 0;
        vm.currentImage = null;
        vm.changeImage = changeImage;
        vm.checkDisable = checkDisable;
        vm.imageLoading = true;
        vm.element = angular.element('#imageDialog');

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

            vm.imageLoading = true;
            vm.currentImageIndex = vm.currentImageIndex + direction;
            vm.currentImage = vm.photos[vm.currentImageIndex];
        }

        activate();

        function activate() {

            // listen for a set of photos as well as an index at which to start
            $scope.$on('show-photo', function(event, args) { 
                vm.currentImageIndex = args.index;
                vm.photos = args.photos
                vm.currentImage = vm.photos[vm.currentImageIndex];
                vm.element.modal('show');
            });

        }

    }
})();
