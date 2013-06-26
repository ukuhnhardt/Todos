require.config({
  baseUrl: "./js/",
  paths: {
    jquery: 'lib/jquery-1.8.2',
    underscore: 'lib/underscore-1.4.4',
    backbone: 'lib/backbone-1.0.0',
//    'backbone.localStorage': 'lib/backbone.localStorage'
    'backbone.firebase': 'lib/backbone-firebase'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.firebase': {
      deps: ['underscore','backbone'],
      exports: 'Backbone'
    }
  }
});

require([
    'jquery',
    'backbone',
    'models/Todo',
    'views/MasterView'
  ], function($, Backbone, Todo, MasterView ) {

    var TodoList = Backbone.Firebase.Collection.extend({

        // Reference to this collection's model.
        model: Todo.Model,

        // Save all of the todo items in a Firebase.
        firebase: new Firebase("https://izymes.firebaseio.com/test")
        } );

    var Router = Backbone.Router.extend({
    routes: {
      "": "main"
    },

    main: function(){
      var tasks = new Todo.Collection();
        tasks.testItsFirebase();
      var view = new MasterView({collection: tasks});
      tasks.on('change', function(){
          console.log('got tasks : ' + JSON.stringify(tasks));
          $("#container").html(view.render().el).show();
      });

        $("#container").html(view.render().el).show();

//      tasks.fetch({
//        success: function(tasks){
//          $("#container").html(view.render().el).show();
//        },
//        error: function(model, error) {
//          // TODO: handle errors nicer
//          alert(error);
//        }
//      });
    }
  });

  // Preload CSS Sprite
  $('<img/>').attr('src', "./css/glyphicons.png");

  var router = new Router();
  Backbone.history.start();
 
});
