angular.module('app-bootstrap').directive('miInput', [
  function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link(scope, elem, attrs, ngModel) {
        ngModel.$options = ngModel.$options || {};
        ngModel.$options.updateOn = 'blur';
        elem.on('blur', () => {
          ngModel.$options.updateOn = 'default';
        })
      }
    }
  }
]);
