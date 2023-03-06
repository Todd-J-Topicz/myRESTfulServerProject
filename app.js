const $studioSearch = $('#studioSearch');
const $gameSearch = $('#gameSearch');

$studioSearch.click(function(){
    console.log("studio click works");
    studioSearch();
  });

  $gameSearch.click(function(){
    console.log("game click works");
    studioSearch();
  });

function studioSearch(){
    let userInput = $("#userInput").val();
    
    $.get("https://no-hope-web-services.onrender.com/api/studio/", (data) =>{
        console.log(data);

    });
};

function gameSearch(){
        
    $.get("https://no-hope-web-services.onrender.com/api/games", (data) =>{
      console.log(data);

    });
};