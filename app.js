const $studioSearch = $('#studioSearch');
const $gameSearch = $('#gameSearch');

$studioSearch.click(function(){
    console.log("studio click works");
    studioSearch();
  });

  $gameSearch.click(function(){
    console.log("game click works");
    gameSearch();
  });

function studioSearch(){
    let userInput = $("#userInput").val();
    
    $.get("https://no-hope-web-services.onrender.com/api/studio/", (data) =>{
        console.log(data);

        $('#results').replaceWith('<div id="results"></div>');

        for (let x = 0; x < data.length; x++){
            let $span = $('<span class="studio-card"></span>');

            let $h2 = $('<h2 class="game-name"></h2>');
            $($h2).text(data[x].name);
            $span.append($h2);

            $span.appendTo($('#results'));
            
        }  
    });
};

function gameSearch(){
        
    $.get("https://no-hope-web-services.onrender.com/api/games", (data) =>{
      console.log(data);

      $('#results').replaceWith('<div id="results"></div>');

        for (let x = 0; x < data.length; x++){
            let $span = $('<span class="game-card"></span>');

            let $h2 = $('<h2 class="game-name"></h2>');
            $($h2).text(data[x].name);
            $span.append($h2);

            let $h3 = $('<h3 class="game-year"></h3');
            $($h3).text(data[x].year);
            $h2.append($h3);

            let $h4 = $('<h4 class="game-studio"></h4>');
            $($h4).text(data[x].studio_id);
            $h2.append($h4);

            $span.appendTo($("#results"));
        }

    });
};

