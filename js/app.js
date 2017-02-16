var app = angular.module('mySite', []);
app.controller('NavController', ['$http', function ($http) {
    var vm = this;

    vm.photos = [];
    // start on 0 index 
    vm.currentImageIndex = 0;
    // functions 
    vm.checkActive = checkActive;
    vm.setTab = setTab;
    vm.getShowcaseImages = getShowcaseImages;
    vm.changeImage = changeImage;

    function checkActive(tabVal) {
        if (tabVal === vm.currentTab) {
            return 'active';
        }
        return 'inactive';
    }

    // pass in -1 or +1
    function changeImage(direction){
        vm.currentImageIndex = vm.currentImageIndex + direction;
        vm.currentImage = vm.photos[vm.currentImageIndex];
    }

    function setTab(tabVal) {
        vm.currentTab = tabVal;
    }

    //TODO Make a showcase album set
    function getShowcaseImages() {
        var showCaseAlbumId = '72157672995329216';
        return getAlbumImages(showCaseAlbumId);
    }

    function getAlbumImages(photoSetId){
      return $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=a204dbf28ba325b9f717d739309ac663&photoset_id='+photoSetId+'&extras=url_q%2C+url_z%2Curl_l%2Ctags&format=json&nojsoncallback=1')
      .success(function (data) {
        if(data && data.photoset && data.photoset.photo.length){
            vm.photos = data.photoset.photo;     
            vm.currentImage = vm.photos[0];     
        }     
    });
    }

    activate();

    function activate() {
        vm.currentTab = 1;
        //getShowcaseImages();
    }


}]);