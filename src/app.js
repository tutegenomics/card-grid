angular.module('app', ['cardGrid'])

    .controller('ctrl', function($scope) {
        $scope.cards = [
            {
                directive: 'test-directive'
            },
            {
                directive: 'test-directive'
            },
            {
                directive: 'test-directive'
            },
            {
                directive: 'test-directive'
            }

        ]
    })

    .directive('testDirective', function() {
        return {
            controller: function($scope, $element) {
                //console.log(attrs.data)
            },
            template: function(element, attrs) {
                return '<div style="background-color: #fff;padding: 20px;border: solid 1px #d3d3d3;">hey hey hey</div>';
            }
        }
    });