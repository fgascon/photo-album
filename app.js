angular.module('photos', ['ngResource'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/list.html',
                controller: 'PhotosListCtrl'
            })
            .otherwise({redirectTo: '/'});
    }])
    .controller('PhotosListCtrl', ['$scope', 'PhotosAlbums', function($scope, PhotosAlbums){
        $scope.albums = PhotosAlbums.query();
        
        $scope.getFirstPhoto = function(album){
            if(album && album.photos && album.photos[0] && album.photos[0].url)
                return album.photos[0].url;
            else
                return null;
        };
    }])
    .factory('PhotosAlbums', ['$resource', function($resource){
        
        return $resource('http://photos-api.fgascon.com/:albumId.json', {}, {
            query: {method:'GET', params:{albumId:'list'}, isArray:true}
        });
    }]);