(function(){
	'use strict';

	var app = angular.module('LyeCalculator', [
		'ngSanitize',
        'ngCookies',
		'ui.select',
		'ui-notification',
        'pascalprecht.translate',// angular-translate
        'tmh.dynamicLocale'// angular-dynamic-locale
	]);

	app.config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 5000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });
    });
    
    app.config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

    app.config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',// path to translations files
            suffix: '.json'// suffix, currently- extension of the translations
        });
        $translateProvider.preferredLanguage('en_US');// is applied on first load
        $translateProvider.useLocalStorage();// saves selected language to localStorage
        $translateProvider.useMissingTranslationHandlerLog();

    });

    app.config(function (tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('vendors/angular-i18n/angular-locale_{{locale}}.js');
    });
})();