var user = angular.module('user',['ui.router']);

user.config(function($stateProvider, $urlRouterProvider)
{
	$stateProvider.state('user',
	{
		url : '/user/list',
		templateUrl :'/app/user/list.tpl',
		controller : 'userCtrl'
	})
	.state('detail',
	{
		url : '/user/detail/:username',
		templateUrl : '/app/user/detail.tpl',
		controller : 'userDetailCtrl'
	})
})
.controller('userCtrl', function($scope, userService)
{
	$scope.title = 'Welcome to user list';

	userService.getService('list',{name:'aa'}).then(function(response)
	{
		if(response.statusCode == 200)
		{
			$scope.users = response.data;
		}
	}).catch(function(err)
	{
		console.log(err);
	})
})
.controller('userDetailCtrl',function($scope,$stateParams, userService)
{
	$scope.title = 'User Detail';
	var username = $stateParams.username;

	var init = function()
	{
		getUserDetail();
	};


	var getUserDetail = function()
	{
		var postData = {username : username};

		userService.getService('detail', postData).then(function(response)
		{
			if(response.statusCode == 200)
			{
				$scope.details = response.data;
			}
		}).catch(function(err)
		{
			console.log(err);
		});
	};

	init();
	
});