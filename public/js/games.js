// $.ajax({
// 	url:"http://cardables.azurewebsites.net/getAllGames",
// 	type:'GET'
// }).done{
// 	console.log('got all games');
// }
// $.ajax({
// 	url:"createGame?name=something&max=1",
// 	type:'GET'
// }).done(
// 	console.log('game created');
// )




function GameCtrl($scope) {
	var gameinfo;
  	$scope.games = [];

	console.log('bonk');
	function create(){
		$.ajax({
		  url: "http://cardables.azurewebsites.net/api/createGame?name=bridge&max=3",
		  type:'GET',
		}).done(function(data) {
			// games = data;
			console.log(data)
		});
	}
	$.ajax({
	  url: "http://cardables.azurewebsites.net/api/getAllGames",
	  type:'GET',
	}).done(function(data) {
		gameinfo = data;
		$scope.$apply(function{
			for(var i=0;i<gameinfo.length;i++){
				$scope.games.push({id:gameinfo[i]._id, name:gameinfo[i].name, max:gameinfo[i].max, current:1})
			}
		});
		console.log(data)
	});
 
  $scope.addGame = function() {
  	console.log('game created');
    $scope.games.push({id:-1,name:$scope.gameId, max:$scope.gameSize, current:0});
    $scope.gameId = '';
    $scope.gameSize = '';
  };
 
  // $scope.remaining = function() {
  //   var count = 0;
  //   angular.forEach($scope.todos, function(todo) {
  //     count += todo.done ? 0 : 1;
  //   });
  //   return count;
  // };
 
  // $scope.archive = function() {
  //   var oldTodos = $scope.todos;
  //   $scope.todos = [];
  //   angular.forEach(oldTodos, function(todo) {
  //     if (!todo.done) $scope.todos.push(todo);
  //   });
  // };
}
