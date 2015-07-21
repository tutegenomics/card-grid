angular.module('cardGrid', [])

    .service('cardGridProvider', function() {

    })

    .directive('cardGrid', function($window, $compile) {

        var cardGridCtrl = function($scope, $element) {

            $scope.cardElements = [];
            $scope.columnElements = [];
            var columnTemplate = '<div class="card-grid-column"></div>';
            var cardTemplate = '<div class="card"></div>';
            var gridSize = function(containerWidth) {
                if (containerWidth >= 900) {
                    return {columns: 2, width: 900};
                } else if (containerWidth >= 1200) {
                    return {columns: 3, width: 1200};
                } else if (containerWidth >= 1600) {
                    return {columns: 4, width: 1600};
                } else {
                    return 1;
                }
            };

            var w = angular.element($window);
            w.bind('resize', function() {
                resizeDebounce();
            });


            var grid = {
                init: function() {
                    this.empty();

                    var gridCount = gridSize($element[0].offsetWidth);

                    for (var i=0;i<gridCount.columns;i++) {
                        var newColumn = angular.element(columnTemplate);
                        $scope.columnElements.push({
                            element: $compile(newColumn)($scope)
                        });
                        $element.append($scope.columnElements[$scope.columnElements.length-1].element);
                    }

                    angular.forEach($scope.cards, function(card) {
                        var newCard = angular.element(cardTemplate);

                        // apply directive attribute
                        newCard.attr(card.directiveName, '');

                        //apply data attribute
                        newCard.attr('data', card.data);

                        // compile element and add to card array
                        $scope.cardElements.push({
                            element: $compile(newCard)($scope),
                            directive: card.directiveName
                        });

                        $scope.columnElements[grid.getSmallestColumn()].element.append($scope.cardElements[$scope.cardElements.length-1].element);

                        console.log($scope.columnElements[0].element[0].style.height)


                    });
                },
                resize: function() {
                    var self = this;
                    angular.forEach($scope.cards, function(card) {
                        console.log('hey')
                    });
                },
                empty: function() {
                    $element.empty();
                },
                getSmallestColumn: function() {
                    return $scope.columnElements.reduce(function(a, b) {
                        return Math.min(a.element[0].style.height,b.element[0].style.height)
                    });
                }
            };
            var resizeDebounce = _.debounce(grid.resize, 500);

            grid.init();

        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                cards: '='
            },
            controller: cardGridCtrl,
            template: '<div class="card-grid-wrapper"></div>'
        }
    });