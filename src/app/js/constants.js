(function() {
	'use strict';

	angular.module('LyeCalculator').constant('Constants', {
		"NAOH_MOLARM_ASS" : 39.997,
		"PANEL_DEFAULT" : "panel panel-default",
		"PANEL_PRIMARY" : "panel panel-primary",
		"GLYCEROL_MOLAR_MASS" : 92.09,
		"WATER_MOLAR_MASS" : 18.02
	})
	.constant('LOCALES', {
    'locales': {
        'en_EN': 'English',
        'fr_FR' : 'Français'
    },
    'preferredLocale': 'fr_FR'
})
})();