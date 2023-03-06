const $submitButton = $("#submit");


$submitButton.click(function(){
  search();
});

$(document).keypress(function(e) {
  if(e.which == 13) {
    search();
  }
});



function search(){
  let userInput = $("#userInput").val();
  
  $.get("https://api.tvmaze.com/search/shows?q=" + userInput, (data) =>{
    console.log(data);

    $('#results').replaceWith('<div id="results"></div>');

    for (let i = 0; i < data.length; i++){
      
      // let $span = $('<span class="result-card"></span>');
      let $span = $("<span></span>");
      $($span).addClass("result-card");
            
      // let $h3 = $(`<h3 class="card-title">${data[i].show.name}</h3>`);
      let $h3 = $("<h3></h3>");
      $($h3).addClass("card-title");
      $($h3).text(data[i].show.name);
      
      if(data[i].show.image){
        // $img = $('<img class="card-image"/>');
        // $img.attr("src", data[i].show.image.medium);
        let $img = $("<img>")
        $($img).addClass("card-image");
        $($img).attr("src", data[i].show.image.medium)
        $span.append($img);
      }else {
        let $img = $("<img>")
        $($img).addClass("card-image");
        let image = "https://images.unsplash.com/photo-1614469723922-c043ad9fd036?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbWluZyUyMHNvb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
        $($img).attr("src", image);
        $span.append($img);
      }

      // let $h2 = $(`<h2 class="card-genres">${(data[i].show.genres).join()}</h2>`);
      let $h2 = $("<h2></h2>");
      $($h2).addClass("card-genres");
      $($h2).text(data[i].show.genres.join(","));   //".join() is used here because this is an array, and we need to return the list of strings."

      // let $div = $(`<div class="card-summary"></div>`);
      let $div = $("<div></div>");
      $($div).addClass("card-summary");
      
      let $em = $(`<em>Summary:</em>`);
      //let $em = $("<em>Summary:</em>");  //Would remain the same
      
      let paragraph = data[i].show.summary;
      //let paragraph = data[i].show.summary; //Would remain the same.
      
      // let $link = $('<a>View Show</a>')
      // $link.attr("href", data[i].show.url)
      let $link = $("<a>View Show</a>")
      $($link).attr("href", data[i].show.url)
            
      
      //ALL APPENDS WOULD REMIAN THE SAME:
      $span.appendTo($("#results"));
      $span.append($h3);
      $span.append($h2);
      $span.append($div);
      $div.append($em);
      $div.append(paragraph);
      $span.append($link)


    }
  });
};




