(function() {
	'use strict';

	angular.module('LyeCalculator').controller('IndexController', IndexController);



	IndexController.$inject = ['$scope', 'Notification', 'CalculatorService', 'Constants'];


	function IndexController($scope, Notification, CalculatorService, Constants){

		var vm = this;

		vm.selectedOils=[];

		vm.calculatedNaOHQuantity = '--'
		/**
		 * Stores available oils list
		 */
		vm.oilsList = [];
		/**
		 * Stores available fatty acids characteristics
		 */
		vm.fattyAcidsList = [];
		vm.currentOil = [];

		/**
		 * Super fat in percentage
		 */
		vm.superFat = 5;	


		CalculatorService.getOilsInventory(function(data){
			vm.oilsList = data;
		}, function(data){});

		CalculatorService.getFattyAcids(function(data){
			vm.fattyAcidsList = data;
		}, function(data){});



		/**
		 * adds oil to selected list
		 */
		vm.addCurrentOil = function(){
			if (vm.currentOil !== {}){

				var toClone = _.find(vm.oilsList, function(o){
					return o.id == vm.currentOil[0]; 
				});

				var clone = _.clone(toClone);

				clone.quantity = vm.currentOil.quantity;
				vm.selectedOils.push(clone);
			}
		}



		/**
		 * Based on vm.selectedOils, vm.superFat and quantities, calculates necesary NaOH quantity in same unit
		 */
		vm.calculateLyeQuantity = function(){
			var currentNaOHQuantity = 0;//grams
					
			var oilsMolarQuantity = 0; // moles
			if (vm.selectedOils.length > 0){
				_.each(vm.selectedOils, function(item){
					/*
					 * For each complex oil (eg olive oil), determines triglyceride composition (eg palmitic oil)
					 * For each triglyceride, calculates necesary sodium hydroxyde quantity in moles then in grams
					 */
					var currentOilMolarQuantity = 0; //moles
					_.each(item.composition, function(fattyAcid){

						var component = _.find(vm.fattyAcidsList, function(o){
							return o.id == fattyAcid.id;
						})

						component.percentage = fattyAcid.percentage;
						currentOilMolarQuantity = currentOilMolarQuantity + calculateLyeQuantityForSingleFattyAcid(component, item);
					});
					console.log('3. '+currentOilMolarQuantity.toFixed(5))
					console.log('4. '+currentNaOHQuantity.toFixed(5))

					currentNaOHQuantity = currentNaOHQuantity + currentOilMolarQuantity * Constants.NAOH_MOLARM_ASS; // Fixme Why not * 3 ???
				});
					console.log('4. '+currentNaOHQuantity.toFixed(5))

				vm.calculatedNaOHQuantity = (currentNaOHQuantity).toFixed(3);

				calculateSuperFat();

			}
			
		}

		var calculateSuperFat = function(){
			vm.calculatedNaOHQuantity =  (100 - vm.superFat) * vm.calculatedNaOHQuantity / 100;			
		}

		var calculateLyeQuantityForSingleFattyAcid = function(component, item){

			var result = 0;
			console.log('1. '+result.toFixed(5))
			result = item.quantity * component.percentage / (component.molarMass * 100);	
			console.log('2. '+result.toFixed(5))
			console.log (component)
			console.log(component.name + ' : '+ item.quantity * component.percentage / (component.molarMass * 100))
			return result;			
		}
	}

})();