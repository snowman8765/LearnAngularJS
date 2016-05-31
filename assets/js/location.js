const app2 = angular.module("LocationBar", []);

class MyAppCtrl {
  constructor($scope, $location){
    this.$scope = $scope;
    this.$location = $location;
    
    let self = this;
    this.$scope.$watch(function () {
      return self.$location.absUrl();
    }, function (url) {
      self.$scope.url = url;
    });
    
    MyAppCtrl.$inject = ['$scope', '$location'];
  }
}

app2.component("locationBar", {
  templateUrl: "/assets/location.html",
  controller: MyAppCtrl
});
