function GameCtrl($scope) {
	var gameinfo;
  	$scope.games = [];

	function create(name, max){
		$.ajax({
		  url: "http://cardables.azurewebsites.net/api/createGame?name=" + name+ "&pw=" +max ,
		  type:'GET',
		}).done(function(data) {
			var gid = data[0].gid;
			console.log(data[0].gid);
			//redirect to the game
			window.location.href = "http://cardables.azurewebsites.net/index.html:" + gid;
		});
	}

	$('.gamelist').hide();
	$.ajax({
	 	url: "http://cardables.azurewebsites.net/api/getAllGames",
	  	type:'GET',
	  	cache:false
	}).done(function(data) {
		gameinfo = data;
		$scope.$apply(function(){
			for(var i=0;i<gameinfo.length;i++){
				$scope.games.push({id:gameinfo[i]._id, name:gameinfo[i].name, max:gameinfo[i].max, current:1})
			}
		});
		$('#loading').hide();
		$('.gamelist').show();
	});
 
	$scope.addGame = function() {
		console.log('game created');
		$scope.games.push({id:1,name:$scope.gameName, pw:$scope.gameSize, current:0});
		create($scope.gameName, $scope.gameSize);
		$scope.gameName = '';
		$scope.gameSize = '';
	};
 	
	$scope.joinGame = function(gid){
		console.log(gid);
		var password = $('#input' + gid).val(); 
		$.ajax({
		  url: "http://cardables.azurewebsites.net/api/joinGame?gid=" + gid+ "&pw=" +password ,
		  type:'GET',
		}).done(function(data) {
			if(data){
				//alow to hit enter
				window.location.href = "http://cardables.azurewebsites.net/index.html:"+gid;
			}else{
				$('#input' + gid).val('');
				alert("wrong password, please try again");
			}
		});
	}

	$scope.delGame = function(gid){
		console.log(gid);
		var password = $('#input' + gid).val(); 
		$.ajax({
		  url: "http://cardables.azurewebsites.net/api/deleteGame?gid=" + gid+ "&pw=" +password ,
		  type:'GET',
		}).done(function(data) {
			if(data){
				var oldGames = $scope.games;
			    $scope.games = [];
			    angular.forEach(oldGames, function(game) {
			      if (game.id!=gid) $scope.games.push(game);
			    });
			    $scope.$apply();
			}else{
				$('#input' + gid).val('');
				alert("wrong password, please try again");
			}
		});
	}

}
