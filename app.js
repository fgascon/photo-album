angular.module('photos', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/list.html',
                controller: 'PhotosListCtrl'
            })
            .otherwise({redirectTo: '/'});
    }])
    .controller('PhotosListCtrl', ['$scope', 'PhotosAlbums', function($scope, PhotosAlbums){
        $scope.albums = PhotosAlbums.list();
    }])
    .factory('PhotosAlbums', [function(){
        
        return {
            list: function(){
                return [];
            }
        };
    }]);