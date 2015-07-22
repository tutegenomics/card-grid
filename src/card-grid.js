angular.module('cardGrid', [])

    .service('cardGridProvider', function() {

    })

    .directive('cardGrid', function($window, $compile) {

        var cardGridCtrl = function($scope, $element) {

            $scope.cardElements = [];
            $scope.columnElements = [];
            var columnTemplate = '<div class="card-grid-column"></div>';
            var cardTemplate = '<div class="card"></div>';
            var w = angular.element($window);
            w.bind('resize', function() {
                resizeDebounce();
            });


            var grid = {
                init: function() {
                    var self = this;
                    self.empty();
                    var gridSize = self.getSize();

                    self.createColumns();

                    angular.forEach($scope.cards, function(card) {
                        var newCard = angular.element(cardTemplate);

                        // we're loading in a directive
                        if (card.directiveName) {

                            // apply directive attribute
                            newCard.attr(card.directiveName, '');

                            //apply data attribute
                            newCard.attr('data', 'cardElements');

                            // compile element
                            newCard = $compile(newCard)($scope);

                            // push to card array
                            $scope.cardElements.push({
                                element: newCard,
                                directive: card.directiveName
                            });

                        //  if we're loading in regular content
                        // todo: should this check for clean html?
                        } else if (card.content) {

                            // add content into card
                            newCard[0].innerHTML = card.content

                            // push to card array
                            $scope.cardElements.push({
                                element: newCard,
                                content: card.content
                            });
                        } else {
                            // no content available for this card - throw console error
                            console.log('error', 'No directive name or Content specified - unable to create card');
                            return;
                        }

                        // for each card, find the smallest column, and append card
                        angular.forEach($scope.cards, function(card) {
                            $scope.columnElements[self.getSmallestColumn()].element.append($scope.cardElements[$scope.cardElements.length-1].element);
                        });
                    });

                },
                resize: function() {
                    var self = this;
                    self.empty();
                    self.createColumns();
                    angular.forEach($scope.cardElements, function(card, index) {
                        $scope.columnElements[self.getSmallestColumn()].element.append(card.element);
                    });
                },
                empty: function() {
                    $element.empty();
                },
                createColumns: function() {
                    var self = this;
                    $scope.columnElements = [];
                    for (var i=0;i<self.getSize().columns;i++) {
                        var newColumn = angular.element(columnTemplate);
                        $scope.columnElements.push({
                            element: $compile(newColumn)($scope)
                        });
                        $element.append($scope.columnElements[i].element);
                    }
                },
                getSize: function() {
                    var containerWidth = $element[0].offsetWidth,
                        returnVal;
                    if (containerWidth > 1400) {
                        returnVal = {columns: 4, width: 1600};
                    } else if (containerWidth > 1060) {
                        returnVal = {columns: 3, width: 1200};
                    } else if (containerWidth > 760) {
                        returnVal = {columns: 2, width: 900};
                    } else {
                        returnVal = {columns: 1, width: 400};
                    }

                    return returnVal;
                },
                getSmallestColumn: function() {
                    var index = 0;
                    var value = $scope.columnElements[0].element[0].offsetHeight;
                    for (var i = 1; i < $scope.columnElements.length; i++) {
                        if ($scope.columnElements[i].element[0].offsetHeight < value) {
                            value = $scope.columnElements[i].element[0].offsetHeight;
                            index = i;
                        }
                    }
                    return index;
                }

            };

            // debounce grid resize function
            var resizeDebounce = _.debounce(grid.resize.bind(grid), 300);

            // watch for any changes with the card data - init if it changes
            $scope.$watch('cards', function(newVal) {
                if (newVal.length) {
                    grid.init();
                }
            }, true);

            // if cards are available, initialize
            if ($scope.cards.length) {
                grid.init();
            } else {
                // else show empty message
                $element.append('<div class="card-grid-empty"></div>');
            }

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