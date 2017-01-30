var app = angular.module('mySite', []);
app.controller('NavController', ['$http', function ($http) {
    var vm = this;

    // functions 
    vm.checkActive = checkActive;
    vm.setTab = setTab;
    vm.getShowcaseImages = getShowcaseImages;


    var request = ''

    function checkActive(tabVal) {
        if (tabVal === vm.currentTab) {
            return 'active';
        }
        return null;
    }

    function setTab(tabVal) {
        vm.currentTab = tabVal;
    }

    function getShowcaseImages() {

        var showCaseAlbumId = '72157672995329216';
        return getAlbumImages(showCaseAlbumId);
    }


    function getAlbumImages(photoSetId){
      return $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=a204dbf28ba325b9f717d739309ac663&photoset_id='+photoSetId+'&extras=url_q%2C+url_z%2Curl_l%2Ctags&format=json&nojsoncallback=1 ')
      .success(function (data) {
        var rows = data;     
    });
    }

    activate();

    function activate() {
        vm.currentTab = null;

        getShowcaseImages();
    }
}]);