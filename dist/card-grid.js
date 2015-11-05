angular.module('cardGrid', [])

    .directive('cardGrid', ['$window', '$compile', function($window, $compile) {

        var cardGridCtrl = function($scope, $element) {

            $scope.columnElements = [];
            $scope.cardElements = [];
            var gutter  = parseInt($scope.gutter)?parseInt($scope.gutter):20,
                elementWidth = _.isNumber($scope.cardWidth)?$scope.cardWidth:367,
                w = angular.element($window);

            w.bind('resize', function() {
                resizeDebounce();
            });

            var init = function() {
                $scope.buildCards();
                $scope.buildLayout();
            };

            $scope.$on('$updateCardGridLayout', function() {
                resizeDebounce(true);
            });

            $scope.buildLayout = function(hasChanged) {
                var parentWidth = $element[0].parentElement.offsetWidth;
                var columns = Math.floor((parentWidth / (elementWidth + gutter)));

                // minimum of 1 column
                columns = columns?columns:1;

                // new width with added gutters
                var containerWidth = (columns*elementWidth) + gutter*(columns-1);

                // only continue if the container width has changed
                if ($scope.containerWidth != containerWidth || hasChanged) {
                    $element.empty();
                    $scope.columnElements = [];
                    $scope.containerWidth = containerWidth;
                    $element[0].style.width = containerWidth + 'px';

                    // create new column object
                    for (var i=0;i<columns;i++) {
                        $scope.columnElements.push({
                            height: 0,
                            cards: []
                        });
                    }

                    angular.forEach($scope.cardElements, function(card) {
                        var smallestColumn = getSmallestColumn();
                        card.element.removeClass('card-grid-card-full');

                        // set card position
                        Velocity(card.element, {
                            left: smallestColumn*elementWidth + (gutter*smallestColumn),
                            top: $scope.columnElements[smallestColumn].height,
                            opacity: 1
                        }, {
                            easing: 'ease'
                        });

                        // append element
                        $element.append(card.element);

                        // set card height
                        card.height = card.element[0].offsetHeight;
                        $scope.columnElements[smallestColumn].height = card.height + gutter + $scope.columnElements[smallestColumn].height;

                        // push card to column object
                        $scope.columnElements[smallestColumn].cards.push(card.element);
                    });

                    // set height of container
                    Velocity($element, {
                        height: $scope.columnElements[getLargestColumn()].height + 'px'
                    });


                }
            };

            function buildCard(content) {
                var el = content.element && _.isString(content.element)?content.element:'div';
                var cardElement = angular.element('<'+el+' class="card-grid-card"></'+el+'>');
                if (_.isString(content.attrs)) {
                    cardElement.attr(content.attrs, '');
                } else {
                    _.forEach(content.attrs, function(attr, key) {
                        if (!_.isNumber(key)) {
                            cardElement.attr(key, attr);
                        } else {
                            if (_.isObject(attr)) {
                                cardElement.attr(Object.keys(attr)[0], attr[Object.keys(attr)[0]])
                            } else {
                                cardElement.attr(attr, '');
                            }
                        }
                    });
                }
                return cardElement;
            }

            $scope.buildCards = function() {
                angular.forEach($scope.cards, function(card, i) {

                    var cardElement = buildCard(card);

                    //var cardElement = angular.element(cardTemplate);

                    // set card width
                    cardElement[0].style.width = elementWidth + 'px';
                    cardElement[0].style.opacity = 0;

                    $scope.cardElements.push({
                        element: $compile(cardElement)($scope),
                        height: elementWidth
                    });
                })
            };

            $scope.openCard = function(element) {
                Velocity(element, {
                    top: 0,
                    left: gutter,
                    width: $scope.containerWidth - gutter*2
                }, {
                    begin: function(element) {
                        element[0].style.zIndex = 10;
                    }
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
                var index = 0;
                var value = $scope.columnElements[0].height;
                for (var i = 1; i < $scope.columnElements.length; i++) {
                    if ($scope.columnElements[i].height > value) {
                        value = $scope.columnElements[i].height;
                        index = i;
                    }
                }
                return index;
            };

            // debounce grid resize function
            var resizeDebounce = _.debounce($scope.buildLayout, 100);

            // rebuild if the directive's parent elements width changes
            $scope.$watch(
                function () {
                    return $element[0].parentElement.offsetWidth;
                },
                function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        $scope.buildLayout();
                    }
                });

            init();
        };

        cardGridCtrl.$inject = ["$scope", "$element"];

        return {
            restrict: 'E',
            replace: true,
            scope: {
                cards: '=',
                gutter: '@',
                cardWidth: '='
            },
            controller: cardGridCtrl,
            template: '<div class="card-grid-wrapper"></div>'
        }
    }]);