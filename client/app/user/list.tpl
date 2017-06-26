<ul ng-repeat="user in users">
	<li ><a ui-sref="detail({username:user.username})">{{user.username}}</a></li>
</ul>
