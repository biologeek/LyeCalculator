(function() {
	'use strict';
	angular.module('LyeCalculator').factory('CalculatorService', CalculatorService);



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
		Factory.getFattyAcids = function(callbackSuccess, callbackError){
			var promise = $http({
				method : 'GET',
				url : '/fatty_acids.json'
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