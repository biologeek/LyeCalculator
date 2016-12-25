(function() {
	'use strict';

	angular.module('LyeCalculator').controller('IndexController', IndexController);



	IndexController.$inject = ['$scope', 'Notification', 'CalculatorService'];


	function IndexController($scope, Notification, CalculatorService){

		var vm = this;

		vm.selectedOils=[];
		vm.oilsList = [];
		console.log(vm.oilsList);
		CalculatorService.getOilsInventory(function(data){
			vm.oilsList = data;
		console.log(vm.oilsList);
		}, function(data){

		});



	}

})();