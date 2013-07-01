angular.module('photos', ['ngResource'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/list.html',
                controller: 'PhotosListCtrl'
            })
            .when('/:id', {
                templateUrl: 'views/album.html',
                controller: 'PhotosAlbumCtrl'
            })
            .otherwise({redirectTo: '/'});
    }])
    .controller('PhotosListCtrl', ['$scope', '$location', 'PhotosAlbums', function($scope, $location, PhotosAlbums){
        $scope.albums = PhotosAlbums.query();
        
        $scope.getFirstPhoto = function(album){
            if(album && album.photos && album.photos[0] && album.photos[0].url)
                return album.photos[0].url;
            else
                return null;
        };
        
        $scope.openAlbum = function(album){
            $location.path('/'+album.id);
        };
    }])
    .controller('PhotosAlbumCtrl', ['$scope', '$routeParams', 'PhotosAlbums', function($scope, $routeParams, PhotosAlbums){
        $scope.album = PhotosAlbums.get({id: $routeParams.id});
    }])
    .factory('PhotosAlbums', ['$resource', function($resource){
        
        return $resource('/api/:albumId.json', {}, {
            query: {method:'GET', params:{albumId:'list'}, isArray:true}
        });
    }]);