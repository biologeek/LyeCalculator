(function() {
	'use strict';
	angular.module('LyeCalculator').service('CalculatorService', CalculatorService);



	CalculatorService.$inject = ['$http'];


	function CalculatorService($http){

		var Factory = {};

		Factory.getOilsInventory = function(callbackSuccess, callbackError){
			var promise = $http({
				method : 'GET',
				url : '/oils.json'
			}).then(function(response){
				console.log(response)
				callbackSuccess(response.data);
			}).then(function(response){
				callbackError(response);
			})

			return promise;
		}

		return Factory;

		
	}

})();