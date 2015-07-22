angular.module('app', ['cardGrid'])

    .controller('ctrl', function($scope) {
        $scope.cards = [
            {
                content: '',
                directiveName: 'test-directive',
                data: ''
            },
            {
                content: '',
                directiveName: 'test-directive',
                data: {

                }
            },
            {
                content: '',
                directiveName: 'test-directive',
                data: {

                }
            },
            {
                content: '',
                directiveName: 'test-directive',
                data: {

                }
            },
            {
                content: '',
                directiveName: 'test-directive',
                data: {

                }
            },
        ]
    })

    .directive('testDirective', function() {
        return {
            link: function(scope, element) {
                scope.here = 'hey'
            },
            template: function(element, attrs) {
                var number = Math.floor(Math.random() * 51) - 20;
                var string = '';
                for (var i=0; i<number; i++) {
                    string += '<br>';
                }
                return 'hey hey hey' + string;
            }
        }
    });