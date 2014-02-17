/**
 * 
 */

var app = angular.module('chatApp', [ 'ui.bootstrap' ]);

// my service factory

app.factory('contactfactory', function() {
	var factory = {};

	factory.contacts = [ {
		email : "vicky"
	}, {
		email : "karthi"
	}, {
		email : "guna"
	}, {
		email : "bala"
	}, {
		email : "niki"
	}, {
		email : "krish"
	}, {
		email : "kumar"
	}, {
		email : "maggi"
	}, {
		email : "rock"
	}, {
		email : "ben"
	}, {
		email : "kevin"
	}, {
		email : "shasha"
	}, {
		email : "diviya"
	}, {
		email : "gopal"
	}, {
		email : "vijay"
	}, {
		email : "ram"
	}, {
		email : "balaji"
	}, {
		email : "sundar"
	} ];
	factory.myGroups = [ {
		groupName : "Avangers",
		members : [ "vicky1", "vicky2", "vicky3" ]
	} ];

	factory.getGroups = function() {
		return factory.myGroups;
	}

	factory.getContacts = function() {
		return factory.contacts;

	}

	factory.newcontact = [];
	factory.newGroup = {};
	factory.Select = null;
	factory.deSelect = null;

	factory.createMember = function(mail) {

		console.log(mail);
		if (factory.newcontact.length !== 0) {
			var length = factory.newcontact.length;
			var check;
			var remove;
			for (var i = 0; i < (length); i++) {
				if (factory.newcontact[i] === mail) {
					remove = i;
					check = true;

				}

			}
			if (check) {
				check = null;
				factory.newcontact.splice(remove, 1);
				remove = null;
				factory.deSelect = true;
				factory.Select = false;
				return;
			}
			if (!check) {
				check = null;
				factory.newcontact.unshift(mail);
				factory.Select = true;
				return;
			}

		} else if (factory.newcontact.length == 0) {

			factory.newcontact.unshift(mail);
			factory.Select = true;
			factory.deSelect = false;

		}

	}// func

	// var groupName;

	factory.createGroup = function(groupName) {
		factory.newGroup.groupName = groupName;

		factory.newGroup.members = factory.newcontact;

		factory.temp = {};

		factory.temp = angular.copy(factory.newGroup);

		factory.myGroups.push(factory.temp);
		console.log("factory.newGroup.groupName" + factory.newGroup.groupName);
		console.log("groupName" + groupName);
		console.log(factory.myGroups);

		factory.newcontact.length = 0;

		// factory.temp.length=0;
	}

	return factory;
}

);

app.controller('contactctrl', function($scope,
		contactfactory) {
	//$scope.group="hello";

	$scope.contacts = contactfactory.getContacts();

	$scope.groups = contactfactory.getGroups();

	$scope.oneAtATime = true;

	$scope.showNameInput = false;

	$scope.showContactList = false;

	$scope.showGroup = true;

	$scope.showMakeGroup = true;

	$scope.showContacts = function() {

		console.log('hi');

		$scope.showNameInput = true;
		$scope.showContactList = true;

		$scope.showGroup = false;
		$scope.showMakeGroup = false;
	}

	$scope.createMember = function(email) {

		contactfactory.createMember(email);
		$scope.Select = contactfactory.Select;
		$scope.deSelect = contactfactory.deSelect;

	}

	$scope.createGroup = function()

	{
		console.log($scope.groupTitle);
		contactfactory.createGroup($scope.groupTitle);
		$scope.showNameInput = false;
		$scope.showContactList = false;

		$scope.showGroup = true;
		$scope.showMakeGroup = true;
	}
	$scope.addMember = function(groupName) {
		var udateMember;
		var currentGroup;
		showContacts();
		var length = factory.myGroup.length();
		for (var i = 0; i < length; i++) {
			if (factory.myGroup.groupName == groupName)
				currentGroup = i;

		}
		factory.myGroups

	}

});
