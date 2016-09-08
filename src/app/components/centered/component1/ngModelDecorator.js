angular.module('app-bootstrap').config([
  '$provide',
  function ($provide) {
    $provide.decorator('ngModelDirective', [
      '$delegate', '$rootScope',
      function ($delegate, $rootScope) {
        const ngModel = $delegate[0];
        console.log('overwrite ngmodel');
        ngModel.compile = function ngModelCompile(element) {
          // Setup initial state of the control
          element.addClass('prist').addClass('untou').addClass('validd');

          return {
            pre: function ngModelPreLink(scope, element, attr, ctrls) {
              var modelCtrl = ctrls[0],
                  formCtrl = ctrls[1] || modelCtrl.$$parentForm;

              modelCtrl.$$setOptions(ctrls[2] && ctrls[2].$options);

              // notify others, especially parent forms
              formCtrl.$addControl(modelCtrl);

              attr.$observe('name', function(newValue) {
                if (modelCtrl.$name !== newValue) {
                  modelCtrl.$$parentForm.$$renameControl(modelCtrl, newValue);
                }
              });

              scope.$on('$destroy', function() {
                modelCtrl.$$parentForm.$removeControl(modelCtrl);
              });
            },
            post: function ngModelPostLink(scope, element, attr, ctrls) {
              var modelCtrl = ctrls[0];

              var updateOnHandler = function (ev) {
                modelCtrl.$$debounceViewValueCommit(ev && ev.type);
              };

              if (modelCtrl.$options && modelCtrl.$options.updateOn) {
                element.on(modelCtrl.$options.updateOn, updateOnHandler);
              }

              scope.$watch(() => modelCtrl.$options.updateOn, (newVal, oldVal) => {
                console.log('cambio ngmodel updateon');
                element.off(oldVal, updateOnHandler);
                if (newVal === 'default') {
                  modelCtrl.$options.updateOnDefault = true;
                } else if (newVal) {
                  element.on(newVal, updateOnHandler);
                }
              });

              element.on('blur', function() {
                if (modelCtrl.$touched) return;

                if ($rootScope.$$phase) {
                  scope.$evalAsync(modelCtrl.$setTouched);
                } else {
                  scope.$apply(modelCtrl.$setTouched);
                }
              });
            }
          };
        }

        return $delegate;
      }
    ]);
  }
]);
