/**
 * 
 */
/**
 * 
 */

var message=null;
//$(document).ready(function(){});

//angularjs

var app = angular.module('chatApp', [ 'ui.bootstrap' ]);

// my service factory
app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;console.log('http');
    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

angular.element(document).ready(function () {
    
	
	$cometdRouting.constructRoutingFrame();

});

app.run(function( $timeout) {
    console.log('starting run');
    $timeout(function() {
        
    	console.log("ready function");

    	
		var dataObject = new Object();
		dataObject.action = 'init';
		$cometdRouting.postMessageToComet(dataObject);
		
		var dataObject = new Object();
		dataObject.action = 'subscribe';
		dataObject.channelName = '/f';
		$cometdRouting.postMessageToComet(dataObject);
    	
    }, 3000);
});

app.factory('contactfactory', function() {
	var factory = {};
console.log('factory');



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
	factory.datas=[];

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

app.controller('contactctrl', function($scope,$http,
		contactfactory) {
//	$scope.data=[];
	var i=0;

	console.log('contactctrl');

	$scope.contacts = contactfactory.getContacts();

	$scope.groups = contactfactory.getGroups();

	$scope.oneAtATime = true;

	$scope.showNameInput = false;

	$scope.showContactList = false;

	$scope.showGroup = true;

	$scope.showMakeGroup = true;
	

	

	
	$scope.showContacts = function() {

		console.log('showcontacts');

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

		$scope.addMember = function(groupName) {
		var udateMember;
		var currentGroup;
		showContacts();
		var length = factory.myGroup.length();
		for (var i = 0; i < length; i++) {
			if (factory.myGroup.groupName == groupName)
				currentGroup = i;

		}
		

	}
		
		
		$scope.getContactsJson=function()
		
		{  
/*		$http.post('https://api-dot-staging-dot-distributedsource-cms.appspot.com/services/data/v2.0/objects/Account/validateLoginForCS?apikey=af85f731-b5d9-48dd-b06c-6a8033bb6c42', { "login" : "vignesh.bala@a-cti.com" , "password" :  "9843997944" })
			.success(function(data, status){console.log(data);});
			
			$http({method: 'JSONP', url: 'https://api-dot-staging-dot-distributedsource-cms.appspot.com/services/data/v2.0/objects/Account/validateLoginForCS?apikey=af85f731-b5d9-48dd-b06c-6a8033bb6c42'}).success(
				    function(data, status) {
				        // your stuff.
				    	console.log("dfsdfs"+data);
				    
				    }
				)	;
			*/
		$.ajax({
			  type: "POST",
			  url: ' https://api-dot-staging-dot-distributedsource-cms.appspot.com/services/data/v2.0/objects/Account/validateLoginForCS/?apikey=af85f731-b5d9-48dd-b06c-6a8033bb6c42', 
		
			  data: { "login" : "vignesh.bala@a-cti.com",
				       "password":"9843997944"},
				       dataType: "application/json",
			  success: function(data,status)
			  {   console.log(hi);
				  console.log(data);
			  }
			  
			 
			});
		$.ajax({
			 url: ' https://api-dot-staging-dot-distributedsource-cms.appspot.com/services/data/v2.0/objects/Account/validateLoginForCS/?apikey=af85f731-b5d9-48dd-b06c-6a8033bb6c42',
			type: 'POST',
			  dataType: 'text',
			  contentType: "application/json",
			  data: {
				  "login" : "vignesh.bala@a-cti.com",
				       "password":"9843997944"
			  },
			  success: function(response) {
			    response = eval(response);
			    alert("Hey");
			  },
			  error: function(data){
				  console.log(JSON.parse(data));
			  }
		
		
		});
		
			
			/*$.gJSON( 'https://api-dot-staging-dot-distributedsource-cms.appspot.com/services/data/v2.0/objects/Account/validateLoginForCS?apikey=af85f731-b5d9-48dd-b06c-6a8033bb6c42',
					{
			    login: "vignesh.bala@a-cti.com",
			    password: "9843997944"
			  
			  }).done(function( json ) {
				    console.log( "JSON Data: " + json);
			  })
			  .fail(function( jqxhr, textStatus, error ) {
			    var err = textStatus + ", " + error;
			    console.log( "Request Failed: " + err );
			});*/
						
		}
		
		
//reading the messeage events

		$scope.hi=function()
		{ 
			console.log('rightdiv');
		
			
			var dataObject = new Object();
			dataObject.action = 'publish';

			var messageObject = new Object();
			messageObject.xyz = contactfactory.myGroups[0].groupName;
			messageObject.abc = $scope.msgdata;

			dataObject.message = messageObject;
			dataObject.channelName = '/f';

		$cometdRouting.postMessageToComet( dataObject );

		var _irFrame = document.getElementById('irframe'); // irframe is the id of iframe

	if( window.addEventListener )
				_irFrame.addEventListener( 'load' , onIFrameLoad , false );
		else
				_irFrame.attachEvent( 'onload' , onIFrameLoad  );

		// and
		if( window.addEventListener )
		{
			addEventListener( 'message' , _Listener , false );
			
		}
		else
		{	
		attachEvent( 'onmessage' , _Listener ); 
		}

		function _Listener( event )	{
		
		console.log('message'+event);
	    console.log('rep'+i);
		
	    contactfactory.datas.push(JSON.parse(event.data));
	    $scope.data= contactfactory.datas;
	    $scope.$apply();
	    console.log($scope.data);
	    
	    console.log("mes"+event.data);
	    i++;

	  
		}
		
		
		function onIFrameLoad()
		{}
		
		
		}
	
		
});

/// child controller 
app.controller('contactctrl2', function($scope,$http,
		contactfactory) {
	console.log('contactctrl222');
	var activegroup=null;
	activegroup=$scope.activegroup;
	
  $scope.groupclicked=function(name)
  {    
	  for(var i=0; i<contactfactory.myGroups.length; i++)
		  {
		  if(name===contactfactory.myGroups[i].groupName)
			  {
			  if(contactfactory.newcontact.length!=0){
			contactfactory.myGroups[i].members.push(contactfactory.newcontact);
			  return;
			  }
			  }
		  
		  
		  }
	  
	  
	  
  }
	
	$scope.createGroup = function()

	{
		console.log($scope.groupTitle);
		console.log($scope.searchContact);
		contactfactory.createGroup($scope.groupTitle);
		$scope.showNameInput = false;
		$scope.showContactList = false;
		$scope.showGroup = true;
		$scope.showMakeGroup = true;
	}



	
	
});

app.controller('rightDivCtrl', function($scope,
		contactfactory) {



});

