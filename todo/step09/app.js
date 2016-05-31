"use strict";

const app = angular.module("App", ["LocationBar"]);

class TodoService {
  constructor($rootScope, $filter){
    console.log("TodoService");
    this.where = $filter("filter");
    this.done = { done: true };
    this.remaining = { done: false };
    
    this.$rootScope = $rootScope;
    this.filter = {
      done: this.done,
      remaining: this.remaining
    };
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
};
app.service("todos", TodoService);

class RegisterController {
  constructor(todos){
    console.log("RegisterController");
    this.newTitle = "zzz";
    this.todos = todos;
    console.log(todos);
    this.addTodo();
    
    RegisterController.$inject = ["todos"];
  }
  
  addTodo() {
    console.log("addTodo");
    this.todos.add(this.newTitle);
    this.newTitle = "";
  }
};
app.component("register", {
  controller: RegisterController
});

class ToolbarController {
  constructor($scope, todos){
    console.log("ToolbarController");
    this.$scope = $scope;
    this.todos = todos;
    this.filter = todos.filter;
    
    let self = this;
    this.$scope.$on("change:list", function (evt, list) {
      let length = list.length;
      let doneCount = self.todos.getDone().length;
      console.log(list);

      self.allCount = length;
      self.doneCount = doneCount;
      self.remainingCount = length - doneCount;
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
};
app.component("toolbar", {
  controller: ToolbarController
});

class TodoListController {
  constructor($scope, todos){
    console.log("TodoListController");
    this.$scope = $scope;
    this.todos = todos;
    this.originalTitle = null;
    this.editing = null;
    this.todoList = null;
    
    let self = this;
    this.$scope.$on("change:list", function (evt, list) {
      self.todoList = list;
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
};
app.component("todoList", {
  controller: TodoListController
});

class MainController {
  constructor($scope){
    console.log("MainController");
    this.$scope = $scope;
    this.currentFilter = null;

    let self = this;
    this.$scope.$on("change:filter", function (evt, filter) {
      self.currentFilter = filter;
    });
    
    MainController.$inject = ["$scope"];
  }
};
app.component("main", {
  controller: MainController
});

class MySelectController {
  constructor($scope, $el, attrs){
    console.log("MySelectController");
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
};
app.component("mySelect", {
  controller: MySelectController
});
