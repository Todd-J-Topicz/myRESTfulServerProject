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

$studioAdd.click(function(){
  console.log("studio add button worked");
  studioAdd();
})

$gameDelete.click(function(){
  console.log("game delete button worked");
  gameDelete();
})

$studioDelete.click(function(){
  console.log("studio delete button worked");
  studioDelete();
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

            let $h2 = $('<h3 class="game-name" style="font-size: 35px"></h3>');
            $($h2).text(data[x].name);
            $span.append($h2);

            let $h3 = $('<h4 class="game-year" style="font-size: 20px"></h4');
            $($h3).text(data[x].year);
            $h2.append($h3);

            let $h4 = $('<h4 class="game-studio" style="font-size: 20px"></h4>');
            $($h4).text(data[x].studio_name);
            $h2.append($h4);

            $span.appendTo($("#results"));
        }

        //Place Game data into a toolbar, using DATA from above

    });
};


function gameAdd(){
  let gameName = prompt("Enter the title of the game.");
  let gameYear = Number.parseInt(prompt(`Title: ${gameName} [Enter the year the game was released.]`));
  let gameStudio = Number.parseInt(prompt(`Title: ${gameName}, Year: ${gameYear} [Enter the name of the studio.]`));
  alert(`Game has been added! Title: ${gameName}, Year: ${gameYear}, Studio: ${gameStudio}`)
  let gameTotal = {
    "name":gameName, 
    "year": gameYear, 
    "studio_id": gameStudio
  };
  console.log("gameTotal:" , gameTotal)


  var gameAdded = new XMLHttpRequest();
  gameAdded.open('POST', "https://no-hope-web-services.onrender.com/api/games");
  gameAdded.setRequestHeader('Content-Type', 'application/json');
  gameAdded.onload = function() {
    if (gameAdded.status === 200) {
      // Handle the server's response here
      console.log(gameAdded.responseText);
    } else {
      // Handle errors here
      console.error(gameAdded.statusText);
    }
  };
  gameAdded.onerror = function() {
    // Handle network errors here
    console.error(gameAdded.statusText);
  };
  gameAdded.send(JSON.stringify(gameTotal));
  };


function studioAdd(){
  let studioName = prompt("Enter the name of the studio.");
  if (studioName === ""){
    alert("Has not been added")
  } else{
    alert(`Studio has been added! Title: ${studioName}`);
  let studioTotal = {
    "name":studioName, 
  };
  console.log("studioTotal:" , studioTotal)


  var studioAdded = new XMLHttpRequest();
  studioAdded.open('POST', "https://no-hope-web-services.onrender.com/api/studio");
  studioAdded.setRequestHeader('Content-Type', 'application/json');
  studioAdded.onload = function() {
    if (studioAdded.status === 200) {
      // Handle the server's response here
      console.log(studioAdded.responseText);
    } else {
      // Handle errors here
      console.error(studioAdded.statusText);
    }
  };
  studioAdded.onerror = function() {
  };
  studioAdded.send(JSON.stringify(studioTotal));
  }
}


function gameDelete(){
  //Have to do an AJAX GET to games table, get data and map selected game to proper game_id to run delete below:

  let userInput = $("#gameInput").val();
  console.log(userInput);

    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', `https://no-hope-web-services.onrender.com/api/games/${userInput}`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Handle the server's response here
        console.log(xhr.responseText);
      } else {
        // Handle errors here
        console.error(xhr.statusText);
      }
    };
    xhr.onerror = function() {
    // Handle network errors here
    console.error(xhr.statusText);
    };
    xhr.send();
}

function studioDelete(){
  let userInput = $("#studioInput").val();
  console.log(userInput);

    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', `https://no-hope-web-services.onrender.com/api/studio/${userInput}`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Handle the server's response here
        console.log(xhr.responseText);
      } else {
        // Handle errors here
        console.error(xhr.statusText);
      }
    };
    xhr.onerror = function() {
    // Handle network errors here
    console.error(xhr.statusText);
    };
    xhr.send();

}