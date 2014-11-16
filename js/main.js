var LINEUP_GENERATOR = LINEUP_GENERATOR || (function () {
  var players = [],
      filteredPlayers = [],
      selectedPlayers = [],
      riskValue = 1;
      risk = ["floor", "ppg", "ceiling"];

  var generateList = function () {
    $('#lineup').html('');
    filteredPlayers.forEach(function (player) {
      var columns = ["position", "name", "ppg", "dollars", "floor", "ceiling"]
      var playerHTML = "";
      columns.forEach(function (item) {
        playerHTML += "<li>" + player.player[item] + "</li>";
      });
      $('#lineup').append("<li class='list-group-item'><ul class='player-list'>" + playerHTML + "</ul></li>");
    });
  };


  var clearSelected = function () {
    $('.closed').removeClass('closed').addClass('open');
    $('span:nth-child(2)').html('');
    $('.glyphicon-remove-sign').hide();
    selectedPlayers = [];
  };

  var j;
  var risk_array = ["Floor", "Average", "Ceiling"];

  $('#risk-slider').slider({
    value: 1,
    min: 0,
    max: 2,
    step: 1,
    stop: function (event, ui) {
      riskValue = ui.value;
    }
  });

  for (j = 0; j < 3; j++) {
    var label = $('<label>' + risk_array[j] + '</label>').css('left', j/2*100 + "%");
    $('#risk-slider').append(label);
  }

  $.ajax("http://localhost:3000/players")
    .done(function (data) {
      players = filteredPlayers = data;
      players.sort(function (a,b) {
        return b.player.dollars - a.player.dollars;
      });
      generateList();
    });

  $('#generate-lineup').on('click', function () {
    clearSelected();
    $.ajax("http://localhost:3000/lineup?risk=" + risk[riskValue])
      .done(function (data) {
        data.forEach(function (player) {
          var name = player.player.name;
          var position = player.player.position.toLowerCase();
          var clickedPlayer = $('.' + position + '.open').first()
          $('#available-players .list-group-item:contains(' + name + ')').hide();
          selectedPlayers.push(name);
          clickedPlayer.removeClass('open').addClass('closed');
          clickedPlayer.find('span:nth-child(2)').html(name);
          clickedPlayer.find('.glyphicon-remove-sign').show();
        });
        dollarsLeft = 60000 - data.map(function (i) {
          return i.player.dollars;
        }).reduce(function (a,b) {
          return a + b;
        });

        ceilingTotal = data.map(function (i) {
          return i.player.ceiling;
        }).reduce(function (a,b) {
          return a + b;
        });

        $('#ceiling').text(ceilingTotal);

        averageTotal = data.map(function (i) {
          return i.player.ppg;
        }).reduce(function (a,b) {
          return a + b;
        });

        $('#average').text(averageTotal);

        floorTotal = data.map(function (i) {
          return i.player.floor;
        }).reduce(function (a,b) {
          return a + b;
        });

        $('#floor').text(floorTotal);

        console.log("Ceiling:" + ceilingTotal);
        console.log("Average:" + averageTotal);
        console.log("Floor:" + floorTotal);


        $('#dollars-left').html("$" + dollarsLeft);
      });
  });

  $('#selected-players').on('click', '.glyphicon-remove-sign', function () {
    $(this).hide();
    var nameElement = $(this).closest('.list-group-item').removeClass('closed').addClass('open').find('span:nth-child(2)');
    $('.list-group-item:contains(' + nameElement.text() + ')').show();
    selectedPlayers.splice(selectedPlayers.indexOf(nameElement.text()), 1);
    nameElement.html("");
  });

  $('#lineup').on('click', '.list-group-item', function () {
    var name = $(this).find('.player-list li:nth-child(2)').text();
    var position = $(this).find('.player-list li:nth-child(1)').text().toLowerCase();

    if (selectedPlayers.indexOf(name) === - 1) {
      var clickedPlayer = $('.' + position + '.open').first()
      if (clickedPlayer.length != 0) { 
        $(this).hide();
        selectedPlayers.push(name);
        clickedPlayer.removeClass('open').addClass('closed');
        clickedPlayer.find('span:nth-child(2)').html(name);
        clickedPlayer.find('.glyphicon-remove-sign').show();
      }
    }
  });

  $('.filter-tabs').on('click', 'a', function () {
    var position = $(this).text();
    if (position == "All") {
      filteredPlayers = players;
    }
    else {
      filteredPlayers = players.filter(function (p) {
        return p.player.position == position; 
      });
    }
    generateList();
  });
})();
