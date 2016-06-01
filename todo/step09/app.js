"use strict";

const app = angular.module("App", ["LocationBar"]);

class TodoService {
  constructor($rootScope, $filter){
    this.where = $filter("filter");
    this.all = {done:undefined};
    this.done = {done:true};
    this.remaining = {done:false};
    this.currentFilter = this.all;
    
    this.$rootScope = $rootScope;
    this.list = [];
    
    let self = this;
    this.$rootScope.$watch(function () {
      return self.list;
    }, function (value) {
      self.$rootScope.$broadcast("change:list", value);
    }, true);
    
    TodoService.$inject = ["$rootScope", "$filter"];
  }

  getDone() {
    return this.where(this.list, this.done);
  };

  add(title) {
    this.list.push({
      title: title,
      done: false
    });
  };

  remove(currentTodo) {
    this.list = this.where(this.list, function (todo) {
      return currentTodo !== todo;
    });
  };

  removeDone() {
    this.list = this.where(this.list, this.remaining);
  };

  changeState(state) {
    angular.forEach(this.list, function (todo) {
      todo.done = state;
    });
  };
}
app.service("todos", TodoService);

class RegisterController {
  constructor(todos){
    this.newTitle = "";
    this.todos = todos;
    
    RegisterController.$inject = ["todos"];
  }
  
  addTodo() {
    this.todos.add(this.newTitle);
    this.newTitle = "";
    return false;
  }
}
app.component("register", {
  controller: RegisterController,
  templateUrl: "template/register.html"
});

class ToolbarController {
  constructor($scope, todos){
    this.$scope = $scope;
    this.todos = todos;
    
    let self = this;
    this.$scope.$on("change:list", function (evt, list) {
      let length = list.length;
      let doneCount = self.todos.getDone().length;

      self.allCount = length;
      self.doneCount = doneCount;
      self.remainingCount = length - doneCount;
    });
    this.$scope.$on("change:filter", function (evt, filter) {
      self.todos.currentFilter = filter;
    });
    
    ToolbarController.$inject = ["$scope", "todos"];
  }

  checkAll() {
    this.todos.changeState(!!this.remainingCount);
  };

  changeFilter(filter) {
    this.$scope.$emit("change:filter", filter);
  };

  removeDoneTodo() {
    this.todos.removeDone();
  };
}
app.component("toolbar", {
  controller: ToolbarController,
  templateUrl: "template/toolbar.html"
});

class TodoListController {
  constructor($scope, todos){
    this.$scope = $scope;
    this.todos = todos;
    this.originalTitle = null;
    this.editing = null;
    this.todoList = null;
    
    let self = this;
    this.$scope.$on("change:list", function (evt, list) {
      self.todoList = list;
    });
    this.$scope.$on("change:filter", function (evt, filter) {
      self.todos.currentFilter = filter;
    });
    
    TodoListController.$inject = ["$scope", "todos"];
  }

  editTodo(todo) {
    this.originalTitle = todo.title;
    this.editing = todo;
  };

  doneEdit(todoForm) {
    if (todoForm.$invalid) {
      this.editing.title = this.originalTitle;
    }
    this.editing = this.originalTitle = null;
  };

  removeTodo(todo) {
    this.todos.remove(todo);
  };
}
app.component("todolist", {
  controller: TodoListController,
  templateUrl: "template/todoList.html"
});

class MySelectController {
  constructor($scope, $el, attrs){
    this.$scope = $scope;
    this.$el = $el;
    this.attrs = attrs;
    
    let self = this;
    this.$scope.$watch(this.attrs.mySelect, function (val) {
      if (val) {
        self.$el[0].select();
      }
    });
    
    MainController.$inject = ["$scope", "$el", "attrs"];
  }
}
app.component("mySelect", {
  controller: MySelectController
});
