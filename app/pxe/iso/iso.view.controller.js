(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('IsoViewCtrl', IsoViewCtrl)
    ;

  /**
   * View Iso Controller
   *
   * @ngInject
   */
  function IsoViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('pxe/iso/'+$stateParams.id);
    vm.edit.submit = submit;
    vm.edit.id = $stateParams.id;

    vm.logs = {
      filter: {
        target_type: 'iso',
        target_id: $stateParams.id,
      },
    };

    activate();

    //////////

    function activate() {
      vm.edit.getCurrent();
    }

    function submit() {
      vm.edit.patch(vm.edit.getData());
    }
  }
})();
