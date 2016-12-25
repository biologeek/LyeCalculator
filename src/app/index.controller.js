(function() {
	'use strict';

	angular.module('LyeCalculator').controller('IndexController', IndexController);



	IndexController.$inject = ['$scope', 'Notification'];//, 'CalculatorService'];


	function IndexController($scope, Notification){//, CalculatorService){

		var vm = this;

		vm.selectedOils=[];
		console.log(vm.oilsList);
		/*CalculatorService.getOilsInventory(function(data){
			vm.oilsList = data;
		}, function(data){

		});
*/

		Notification.error('ble')
		console.log(vm.oilsList);

	}

})();