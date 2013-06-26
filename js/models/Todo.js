define(['underscore', 'backbone.firebase'], function(_, Backbone) {
  
//  var store = new Backbone.LocalStorage(window.store || "Todos"); // for testing purposes

  var Todo = Backbone.Model.extend({
//    firebase: new Backbone.Firebase("https://izymes.firebaseio.com/todos"),

    defaults: {
      title: "",
      timestamp: 0,
      completed: false
    },
    validate: function(attrs) {
      if ( _.isEmpty(attrs.title) ) {
        return "Missing Title";
      }
    }
  });
 
  var Todos = Backbone.Firebase.Collection.extend({
//    localStorage: store,
      firebase: new Firebase("https://izymes.firebaseio.com/todos"),
    model: Todo,
    completed: function() {
      return this.where({completed: true});
    },
    remaining: function() {
      return this.where({completed: false});
    },
    comparator: function(model){
      return model.get('timestamp');
    }
  });


  return {
    Model: Todo,
    Collection: Todos
  };
 
});