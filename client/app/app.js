var app = angular.module('app', ['user']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider)
{
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

	if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.common = {};
    }

	// $httpProvider.defaults.headers.common['Content-Type'] = 'application/json'; // not working 
    $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
    $httpProvider.defaults.headers.common.Pragma = "no-cache";
    $httpProvider.defaults.headers.common["If-Modified-Since"] = "0";
});