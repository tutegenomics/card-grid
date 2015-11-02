angular.module('app', ['cardGrid'])

    .controller('ctrl', function($scope) {
        $scope.cards = [
            {
                element: 'test-element-name'
            },
            {
                attrs: [
                    'test-element-name',
                    'test-this-out'
                ]
            },
            {
                attrs: 'test-directive'
            },
            {
                attrs: {
                    'test-element-name': 'value',
                    'test-this-out': ''
                }
            },
            {
                attrs: [
                    {
                        'test-directive': 'value'
                    }
                ]
            }

        ]
    })

    .directive('testDirective', function() {
        return {
            controller: function($scope, $element) {
            },
            template: function(element, attrs) {
                return '<div style="background-color: #fff;padding: 20px;border: solid 1px #d3d3d3;">hey hey hey</div>';
            }
        }
    })
    .directive('testElementName', function() {
        return {
            controller: function($scope, $element) {
            },
            scope: {
                value: '=testElementName'
            },
            template: function(element, attrs) {
                return '<div style="background-color: #fff;padding: 20px;border: solid 1px #d3d3d3;">test element name</div>';
            }
        }
    });