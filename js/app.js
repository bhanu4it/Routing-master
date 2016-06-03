var one=angular.module("naren",['ui.router']);

one.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise("/home");
	$stateProvider.state("home",{
		url:'/home',templateUrl:'pages/home.html'		
	})
	             .state("about",{
		url:'/about',templateUrl:'pages/about.html'		
	})
	            .state("service",{
		url:'/service',templateUrl:'pages/service.html'		
	})
				.state("forms",{
		url:'/forms',templateUrl:'pages/forms.html',
		controller:'formcntrl'
	})
		.state("edit",{
		url:'/edit/:id',templateUrl:'pages/edit.html',
		controller:'editcntrl'
	})
});

//one.value("SiteUrl","http://localhost/webservice/");
one.constant("SiteUrl","http://localhost/webservice/");

one.service("Webservice",function(SiteUrl){
	this.Adduser=SiteUrl+"Adduser";
	this.viewusers=SiteUrl+"Viewusers";
	this.test=function(){
		return "hi";
	}
	
	
});

one.factory("Webfactory",function(SiteUrl){
	var obj={};
	obj.Adduser=SiteUrl+"Adduser";
	obj.Viewusers=SiteUrl+"Viewusers";
	obj.Edituser=SiteUrl+"Edituser";
	obj.test=function(){
		return "hi";
	}
	return obj;
	
});

one.controller("formcntrl",function($scope,$http,Webfactory,$log){
					alert("hi");				
						$scope.nare=[];
							
// submit data							
$scope.submitdata=function()
{
						var newdata=$scope.fm;
						
	$http({
         method : 'POST',
         url : Webfactory.Adduser,
         data: 'senddata='+JSON.stringify(newdata)+'&send=yes',
         headers : {'Content-Type': 'application/x-www-form-urlencoded'}  }).success(function(res){
			 if(res==1){
			$scope.output="successfully created account";
			$scope.showdata();
		 } else {
			$scope.output="sorry"; 
		 }
		 });

}
// end submit data

// show data
$scope.showdata=function(){
	$http({
         method : 'GET',
         url : Webfactory.Viewusers,
         data: 'send=yes',
         headers : {'Content-Type': 'application/x-www-form-urlencoded'}  }).success(function(res){
			 //alert(res);
			$scope.nare=res;
		 }).error(function(res){ alert(res); });


}

$scope.showdata();

//end show data
							
							
	
	// Delete data							
$scope.deleteuser=function(emailid){
		alert(emailid);				
						
	$http({
         method : 'POST',
         url : Webfactory.Deleteuser,
         data: 'senddata='+emailid,
         headers : {'Content-Type': 'application/x-www-form-urlencoded'}  }).success(function(res){
			 if(res==1){
			$scope.output="successfully delete account";
			$scope.showdata();
		 } else {
			$scope.output="sorry"; 
		 }
		 });

}
// end submit data
});	


// edit data							
		 one.controller("editcntrl",function($scope,$stateParams,$http,Webfactory){
			$scope.userid = $stateParams.id;
			alert($scope.userid);					
			$scope.editteuser=function(nameid){
			
	$http({
         method : 'GET',
         url : Webfactory.Edituser,
         data: 'senddata='+nameid,
         headers : {'Content-Type': 'application/x-www-form-urlencoded'}  }).success(function(res){
			
			$scope.edits=res;
		 }).error(function(res){ alert(res); });
	


}
// end edit data	
							
							
							});



