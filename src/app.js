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

            },
            template: 'this is the template'
        }
    });