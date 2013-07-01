define(['underscore', 'backbone.firebase'], function (_, Backbone) {

    var Todo = Backbone.Model.extend({

        defaults: {
            title: "",
            timestamp: 0,
            completed: false
        },
        validate: function (attrs) {
            if (_.isEmpty(attrs.title)) {
                return "Missing Title";
            }
        } ,
        save: function( completed ){
            this.set(completed);
        },
        destroy: function(){
            console.log('destroy ' + this);
            this.collection.remove(this);
        }

    });

    var Todos = Backbone.Firebase.Collection.extend({
        firebase: new Firebase("https://izymes.firebaseio.com/todos"),
        model: Todo,
        completed: function () {
            return this.where({completed: true});
        },
        remaining: function () {
            return this.where({completed: false});
        },
        comparator: function (model) {
            return model.get('timestamp');
        }
    });


    return {
        Model: Todo,
        Collection: Todos
    };

});