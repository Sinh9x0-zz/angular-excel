app.controller('mainController', function(fileFactory, $scope) {
	var _this = this;
    $scope.uploadFile = function(event){
        fileFactory.sendFile(event.target.files[0], function(data){
        	_this.data = data;
        })
    };

});

app.factory('fileFactory', function($http){
	factory = {}

	factory.sendFile = function(file, callback){
		$http.post('/sendFile/', file).success(function(data){
			callback(data);
		});
	}

	return factory;
})

app.directive('onChange', function() {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
		  var onChangeHandler = scope.$eval(attrs.onChange);
		  element.bind('change', onChangeHandler);
		}
	}
});