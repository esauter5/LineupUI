var LINEUP_GENERATOR = LINEUP_GENERATOR || (function () {
  $.ajax("http://localhost:3000/lineup")
    .done(function (data) {
      data.forEach(function (player) {
        $('#lineup').append("<li class='list-group-item'>" + player.player.name + "</li>");
      });
      console.log(data);
    });
})();
