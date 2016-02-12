app.controller('mainController', function(fileFactory, $scope) {
	var _this = this;
    $scope.uploadFile = function(event){
        fileFactory.sendFile(event.target.files[0], function(data){
        	_this.data = data.content;
        	_this.sheets = data.sheets;
        })
    };

    fileFactory.getAll(function(dbData){
    	console.log(dbData)
    	_this.dbData = dbData;
    })

});

app.factory('fileFactory', function($http){
	factory = {}

	factory.sendFile = function(file, callback){
		var fd = new FormData();
        fd.append('file', file);
		$http.post('/sendFile/', fd, {
				transformRequest: angular.identity,
            	headers: {'Content-Type': undefined}
        }).success(function(data){
			callback(data);
		});
	}

	factory.getAll = function(callback){
		$http.get('/getAll').success(function(dbData){{
			callback(dbData);
		}})
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