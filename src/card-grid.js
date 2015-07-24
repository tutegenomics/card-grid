angular.module('cardGrid', ['iconPush'])

    .service('cardGridProvider', function() {

    })

    .directive('cardGrid', function($window, $compile, $timeout) {

        var cardGridCtrl = function($scope, $element) {

            $scope.columnElements = [];
            $scope.cardElements = [];
            var gutter  = parseInt($scope.gutter)?parseInt($scope.gutter):20,
                elementWidth = 350,
                cardTemplate = '<div class="card-grid-card" card-grid-element></div>',
                w = angular.element($window);

            w.bind('resize', function() {
                resizeDebounce();
            });

            var init = function() {
                buildCards();
                buildLayout();

                angular.forEach($scope.cards, function(card) {
                    //var smallestColumn = getSmallestColumn();
                })
            };

            var buildLayout = function() {
                $element.empty();
                $scope.columnElements = [];
                var parentWidth = $element[0].parentElement.offsetWidth - (gutter*4);
                var columns = Math.floor(parentWidth / elementWidth);
                var containerWidth = columns*elementWidth + (gutter*(columns-1));
                $element[0].style.width = containerWidth + 'px';

                for (var i=0;i<columns;i++) {
                    $scope.columnElements.push({
                        height: 0,
                        cards: []
                    });
                }
                angular.forEach($scope.cardElements, function(card) {
                    var smallestColumn = getSmallestColumn();

                    // set card position
                    card.element[0].style.left = smallestColumn*elementWidth + (gutter*smallestColumn) +'px';
                    card.element[0].style.top = $scope.columnElements[smallestColumn].height + 'px';

                    // append element
                    $element.append(card.element);

                    // set card height
                    card.height = card.element[0].offsetHeight;

                    $scope.columnElements[smallestColumn].cards.push(card.element);
                    $scope.columnElements[smallestColumn].height = card.height + gutter + $scope.columnElements[smallestColumn].height;
                });

                console.log($scope.columnElements);

            };

            var buildCards = function() {
                angular.forEach($scope.cards, function(card, i) {
                    var cardElement = angular.element(cardTemplate);

                    // set card width
                    cardElement[0].style.width = elementWidth + 'px';

                    cardElement.attr(card.directive, '');
                    $scope.cardElements.push({
                        element: $compile(cardElement[0])($scope),
                        height: elementWidth
                    });
                })
            };

            var getSmallestColumn = function() {
                var index = 0;
                var value = $scope.columnElements[0].height;
                for (var i = 1; i < $scope.columnElements.length; i++) {
                    if ($scope.columnElements[i].height < value) {
                        value = $scope.columnElements[i].height;
                        index = i;
                    }
                }
                return index;
            };

            var getLargestColumn = function() {

            }

            // debounce grid resize function
            var resizeDebounce = _.debounce(init, 300);


            init();

        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                cards: '=',
                gutter: '@'
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