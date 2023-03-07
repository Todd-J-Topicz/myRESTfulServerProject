const $studioSearch = $('#studioSearch');
const $gameSearch = $('#gameSearch');
const $gameAdd = $('#addGame');
const $studioAdd = $('#addStudio');
const $gameDelete = $('#deleteGame');
const $studioDelete = $('#deleteStudio');

$studioSearch.click(function(){
    console.log("studio click works");
    studioSearch();
  });

  $gameSearch.click(function(){
    console.log("game click works");
    gameSearch();
  });

$gameAdd.click(function(){
  console.log("add game click works")
  gameAdd();
})

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


function gameAdd(){
  let gameName = prompt("Enter the title of the game.");
  let gameYear = prompt(`Title: ${gameName} [Enter the year the game was released.]`);
  let gameStudio = prompt(`Title: ${gameName}, Year: ${gameYear} [Enter the name of the studio.]`);
  let gameInfo = alert(`Game has been added! Title: ${gameName}, Year: ${gameYear}, Studio: ${gameStudio}`)
  let gameTotal = JSON.stringify({
    "name":gameName, 
    "year": gameYear, 
    "studio_id": gameStudio
  });


  $.post("https://no-hope-web-services.onrender.com/api/games", gameTotal , function(res){
    $("#results").html(res)
  }, "json")
};
