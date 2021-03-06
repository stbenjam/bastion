/**
 * @ngdoc directive
 * @name Bastion.components.directive:bstContainerScroll
 * @restrict A
 *
 * @requires $window
 * @requires $timeout
 *
 * @description
 *   The container scroll directive should be applied to a wrapping div around an element that
 *   you wish to have scrolling capabilities that is outside the standard browser flow.
 *
 * @example
 *   <pre>
       <div bst-container-scroll></div>
     </pre>
 */
angular.module('Bastion.components').directive('bstContainerScroll', ['$window', '$timeout', function ($window, $timeout) {
    return {
        restrict: 'A',

        compile: function (tElement, attrs) {
            tElement.addClass("container-scroll-wrapper");
            return function (scope, element) {
                var windowElement = angular.element($window);
                var addScroll = function () {
                    var windowWidth = windowElement.width(),
                        windowHeight = windowElement.height(),
                        scrollWidth = element.scrollWidth || 0,
                        offset = element.offset().top;

                    if (attrs.controlWidth) {
                        element.find(attrs.controlWidth).width(windowWidth - scrollWidth);
                    }
                    element.outerHeight(windowHeight - offset);
                    element.height(windowHeight - offset);
                };
                windowElement.bind('resize', addScroll);
                $timeout(function () {
                    windowElement.trigger('resize');
                }, 0);
            };
        }
    };
}]);
