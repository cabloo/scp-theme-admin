(function () {
  'use strict';

  angular
    .module('app.network.group', [
      'scp.angle.layout.list',
      'scp.core.api',
      'app.network.group.search',
      'app.network.group.list',
      'app.network.group.dashboard',
    ]);
})();
