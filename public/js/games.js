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

	$.ajax({
	 	url: "http://cardables.azurewebsites.net/api/getAllGames",
	  	type:'GET',
	}).done(function(data) {
		gameinfo = data;
		$scope.$apply(function(){
			for(var i=0;i<gameinfo.length;i++){
				$scope.games.push({id:gameinfo[i]._id, name:gameinfo[i].name, max:gameinfo[i].max, current:1})
			}
		});
		console.log(data)
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
		console.log($('#input' + gid).val());
		console.log('game joined.');
		//get the id of the game i am joining

		// do a get request = /joinGame?pw=....&?gid=...
		window.location.href = "http://cardables.azurewebsites.net/index.html:"+gid;
	}

}
