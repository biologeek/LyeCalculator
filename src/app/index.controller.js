(function() {
	'use strict';

	angular.module('LyeCalculator').controller('IndexController', IndexController);



	IndexController.$inject = ['$scope', 'Notification', 'CalculatorService', 'Constants', '$location', '$anchorScroll', '$animate', '$translate', 'LOCALES'];


	function IndexController($scope, Notification, CalculatorService, Constants, $location, $anchorScroll, $animate, $translate, LOCALES){

		var vm = this;

		vm.recipe = {};
		vm.recipe.selectedOils=[];
		vm.recipe.calculatedNaOHQuantity = '--'
		vm.recipe.water = {};
		vm.recipe.water.percentage = 38
		vm.recipe.waterQuantity = 0;
		vm.resultClass = Constants.PANEL_DEFAULT;

		vm.recipe.fragrance={};
		vm.recipe.fragrance.percentage=2;
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
		vm.recipe.superFat = 5;	

		vm.availableLanguages = LOCALES.locales



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
				vm.recipe.selectedOils.push(clone);
			}
		}


		/**
		 * 
		 */
		vm.computeOilQuantity = function(){
			var total = 0;

			_.each(vm.recipe.selectedOils, function(e){

				//console.log(e)
				total = total + parseFloat(e.quantity);
			});

			//console.log(total)
			return total;
		}

		/**
		 * Based on vm.selectedOils, vm.superFat and quantities, calculates necesary NaOH quantity in same unit
		 */
		vm.calculateLyeQuantity = function(){
			var currentNaOHQuantity = 0;//grams
					
			var oilsMolarQuantity = 0; // moles
			if (vm.recipe.selectedOils.length > 0){
				_.each(vm.recipe.selectedOils, function(item){
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
						currentOilMolarQuantity = currentOilMolarQuantity + calculateMolarQuantityForSingleFattyAcid(component, item);
					});
					//console.log('3. '+currentOilMolarQuantity.toFixed(5))
					//console.log('4. '+currentNaOHQuantity.toFixed(5))

					currentNaOHQuantity = currentNaOHQuantity + 3 * currentOilMolarQuantity * Constants.NAOH_MOLARM_ASS; // Fixme Why not * 3 ???
				});
					//console.log('4. '+currentNaOHQuantity.toFixed(5))

				vm.recipe.calculatedNaOHQuantity = (currentNaOHQuantity).toFixed(3);

				calculateSuperFat();
				calculateWaterContent();
				switchToResult();

			}
			
		}

		vm.resetForm = function(){
			vm.recipe = {};
			vm.recipe.selectedOils=[];
			vm.recipe.calculatedNaOHQuantity = '--'
			vm.recipe.water.percentage = 38
			vm.recipe.waterQuantity = 0;
			vm.resultClass = Constants.PANEL_DEFAULT;

			$location.hash('');
			$anchorScroll();
		}

		vm.removeOil = function(object){
			_.remove(vm.recipe.selectedOils, function(o){
				return o == object;
			});
		}

		var calculateSuperFat = function(){
			vm.calculatedNaOHQuantity =  (100 - vm.superFat) * vm.calculatedNaOHQuantity / 100;			
		}

		var calculateMolarQuantityForSingleFattyAcid = function(component, item){

			var result = 0;
			//console.log('1. '+result.toFixed(5))
			result = item.quantity * component.percentage / (toTriglyceride(component.molarMass) * 100);	
			//console.log('2. '+result.toFixed(5))
			//console.log (component)
			//console.log(component.name + ' : '+ item.quantity * component.percentage / (component.molarMass * 100))
			return result;			
		}

		var calculateWaterContent = function(){
			vm.recipe.waterQuantity = vm.recipe.water.percentage * vm.computeOilQuantity() / 100;
		}

		var switchToResult = function(){

			vm.resultClass = Constants.PANEL_PRIMARY;

			//console.log(vm.resultClass)
			$location.hash('result-panel');
			$anchorScroll();

		}

		var toTriglyceride = function(singleFattyAcidMolarMass){
			console.log(singleFattyAcidMolarMass * 3 + Constants.GLYCEROL_MOLAR_MASS - 3 * Constants.WATER_MOLAR_MASS);
			return singleFattyAcidMolarMass * 3 + Constants.GLYCEROL_MOLAR_MASS - 3 * Constants.WATER_MOLAR_MASS;
		}




		vm.switchLocale = function(locale){

			$translate.use(locale);

		}
	}
})();