(function () {
  'use strict';

  angular
    .module('app.network.switch.list.filters')
    .controller('SwitchFiltersCtrl', SwitchFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchFiltersCtrl(Select, Search, Observable, $state, $q, $timeout) {
    var filters = this;

    filters.$onInit = init;
    filters.$onChanges = $onChanges;

    filters.current = {
    };
    filters.searchFocus = Observable(false);

    filters.fireChangeEvent = fireChangeEvent;

    //////////

    function init() {
      _.assign(filters.current, {
        q: $state.params.q,
      });
      var promises = [
        $timeout(),
        // filters.switch.setSelectedId($state.params['switch']),
      ];

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      filters.shouldWatchMainSearch && Search.on('change', function(searchStr) {
        _.assign(filters.current, {
          q: searchStr
        });
      })
      // filters.switch.on('change', fireChangeEvent);
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        // switch: filters.switch.getSelected('id'),
      });

      $state.go($state.current.name, {
        // 'switch': filters.current.switch,
        'q': filters.current.q,
      }, {location: 'replace'});
      filters.shouldWatchMainSearch && Search.go(filters.current.q);

      if (filters.change) {
        filters.change();
      }
    }

    function $onChanges(changes) {
      if (changes.show) {
        var onShow = filters.searchFocus.set.bind(null, true);
        (changes.show.currentValue ? onShow : angular.noop)();
      }
    }
  }
})();
