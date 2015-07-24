angular.module('cardGrid', ['iconPush'])

    .service('cardGridProvider', function() {

    })

    .directive('cardGrid', function($window, $compile, $timeout) {

        var cardGridCtrl = function($scope, $element) {

            $scope.cardElements = [];
            $scope.columnElements = [];
            var gutter  = $scope.gutter?$scope.gutter:10,
                elementWidth = 400,
                columnTemplate = '<div class="card-grid-column"></div>',
                cardTemplate = '<div class="card" card-grid-element></div>',
                w = angular.element($window);


            var init = function() {
                var size = getSize();
                //angular.forEach($scope.cards, function(card) {
                //    var smallestColumn = getSmallestColumn();
                //})
            };

            var getSize = function() {
                var parentWidth = $element[0].parentElement.offsetWidth;
                var columns = Math.floor(parentWidth / elementWidth);
                var containerWidth = columns*elementWidth;


                //return returnVal;
            };

            var getSmallestColumn = function() {
                var index = 0;
                var value = $scope.columnElements[0].element[0].offsetHeight;
                for (var i = 1; i < $scope.columnElements.length; i++) {
                    if ($scope.columnElements[i].element[0].offsetHeight < value) {
                        value = $scope.columnElements[i].element[0].offsetHeight;
                        index = i;
                    }
                }
                return index;
            };



            init();

        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                cards: '=',
                gutter: '&'
            },
            controller: cardGridCtrl,
            template: '<div class="card-grid-wrapper"></div>'
        }
    })

    .directive('cardGridElement', function() {
        var cardGridElementCtrl = function($scope, $element) {
        };

        return {
            require: '^cardGrid',
            restrict: 'A',
            controller: cardGridElementCtrl
        }
    });