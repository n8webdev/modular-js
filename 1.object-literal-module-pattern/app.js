// IIFE - Immediately Invoked Function Expression - check readme #1
(function(){
  "use strict";
  // object literal module
  var people = {
    people: ['Nathan', 'Lari'],
    // starts the module
    init: function() {
      this.cacheDom();
      this.bindEvents();
      this.render();
    },
    // caches the Dom and optimizes its use
    cacheDom: function() {
      this.$module  = $("#peopleModule");
      this.$button  = this.$module.find("button");
      this.$input   = this.$module.find("input");
      this.$ul      = this.$module.find("ul");
      this.template = this.$module.find("#people-template").html();
    },
    bindEvents: function() {
      // .bind(this) makes it possible to run a function in the module's scope
      this.$button.on("click", this.addPerson.bind(this));
      this.$ul.delegate('i.del', 'click', this.deletePerson.bind(this));
    },
    // use MustacheJS template engine
    render: function() {
      // data for Mustache template
      var data = {
        people: this.people
      };
      // runs template engine
      this.$ul.html(Mustache.render(this.template, data));
    },
    // business logic methods
    addPerson: function() {
      this.people.push(this.$input.val());
      this.render();
      this.$input.val('');
    },
    deletePerson: function(event) {
      var $remove = $(event.target).closest('li');
      var i = this.$ul.find('li').index($remove);
      this.people.splice(i, 1);
      this.render();
    }
  };

  people.init();

})();
