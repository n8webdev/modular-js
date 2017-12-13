var people = (function(){
  "use strict";
  console.log(this);
  // properties 
  var people = ['Nathan', 'Lari'],
    $module  = $("#peopleModule"),
    $button  = $module.find("button"),
    $input   = $module.find("input"),
    $ul      = $module.find("ul"),
    template = $module.find("#people-template").html();

  // bindEvents
  $button.on('click', addPerson);
  $ul.delegate('i.del', 'click', deletePerson);

  // use MustacheJS template engine
  var render = function() {
    $ul.html(Mustache.render(template, { peopleTemplate: people }));
  };

  render();

  // business logic methods
  function addPerson(value) {
    // makes the function an API endpoint - in this case it can receive the value from:
    // - an input element || people.addPerson('John Doe');
    var name = (typeof value === 'string') ? value : $input.val();
    people.push(name);
    render();
    $input.val('');
  };

  function deletePerson(event) {
    var i;
    if (typeof event === 'number') {
      i = event;
    } else {
      var $remove = $(event.target).closest('li');
      i = $ul.find('li').index($remove);
    }
    people.splice(i, 1);
    render();
  };

  // makes the module work as an API
  return {
    addPerson: addPerson,
    deletePerson: deletePerson
  };

})();
