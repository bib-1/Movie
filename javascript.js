//variables that stores html elements (search keyword, search button, main and poster section)
const button = document.querySelector('button');
const main = document.querySelector('main');
const ol = document.querySelector('ol');
const poster = document.querySelector('.poster');
var movies = []; //stores the movies returned

//hide the movie list block in the beginning
ol.style.display = "none";
poster.style.display = "block";


//api keys for imdb(from where we get the movie list) and omdb (from wher we get the corresponding movie details)
//please change the api key if one is not working (from 1 api key we can only query out 100 results a day)
// const ImdbApiKey = "k_nl737op1";
// const ImdbApiKey = "k_9mssf4jv";
const ImdbApiKey = "k_60aertwm";
const OmdbApiKey = "2444a40d";


//event that triggers after the search button is clicked
button.addEventListener('click', function(){
    //search keyword
    const searchItem = document.querySelector('input').value;
    //fetching the result
    if(searchItem!==""){
        //showing the movieList block
        ol.style.display = "block";
        poster.style.display = "none";
        const imdbUrl = "https://imdb-api.com/en/API/SearchMovie/" + ImdbApiKey + "/" + searchItem.trim();
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };          
        fetch(imdbUrl, requestOptions)
            .then(response => response.json())
            .then(result => displayResults(result))
            .catch(error => alert(`Error fetching data: ${error.message}`));
            
    }
   // in case of no keyword prompt to enter the keyword in search
    else{
        alert("Provide the name of movie you want to search.");
    }
});

//articles stores the api response from imdb
var articles;

//this methods used to grab the details from imdb api and display them in page
function displayResults(json){

    //every time new request is placed, it removes the previous results form the page
    var child = ol.lastElementChild; 
    while (child) {
        ol.removeChild(child);
        child = ol.lastElementChild;
    }
    //api result    
    articles = json.results;   
  
    //in case of no result hide the movieList button and add the aleart nessage
    if (articles.length === 0) {
        ol.style.display = "none";
        poster.style.display = "block";
        alert("No Reult found");
    } 
    else                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    {
        //for every movie it fetches it creates the new acordion list
      for (const current of articles) 
      {
          var li = document.createElement('li');
          panel = document.createElement('div')
          var button = document.createElement('button');
          button.setAttribute("id", current.id);
          panel.setAttribute("id", current.id);
          button.setAttribute("class", "accordion");
          panel.setAttribute("class", "panel");
          panel.setAttribute("style", "display: none;");
          li.textContent = current.title;         
          ol.appendChild(button);
          button.appendChild(li);
          ol.appendChild(panel);
          
      }
      //event listener which provide the details of movies
      accordion();
    }
}

  //provides movie details
function accordion(){
    //gathers the list of the movies
    var acc = document.getElementsByClassName("accordion");
    var panel;

    //loop through every movies
    for (i = 0; i < acc.length; i++) {
        //if a movie is clicked it triggers this event which
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            //1> Shows the block and hides the default poster
            if (panel.style.display === "block") {
            panel.style.display = "none";
            } else 
            {
                panel.style.display = "block";
            }

            //shows the details of movie
            if(panel.lastElementChild == null) {
                showDetails(this.id, panel);
            }
    });
}
}

//based on the movie id it fetches the movie details from omdb
function showDetails(id, panel){
    const url = "http://www.omdbapi.com/?apikey=2444a40d&i=" + id.trim();
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };         
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => appendResult(result, panel))
        .catch(error => console.error(`Error fetching data: ${error.message}`));
}

//this functions parses the result into the page
function appendResult(result, panel){
    const div = document.createElement('div');
    div.setAttribute("class", "detail");

    const para = document.createElement('div');

    const title = document.createElement('p');
    title.textContent = 'Title: ' + result.Title;
    const genre = document.createElement('p');
    genre.textContent = 'Genre: ' +  result.Genre;
    const actors = document.createElement('p');
    actors.textContent = 'Actors: ' +  result.Actors;
    const released = document.createElement('p');
    released.textContent = 'Released Date: ' + result.Released
    const plot = document.createElement('p');
    plot.textContent = 'Plot: ' + result.Plot;

    const img = document.createElement('img');
    img.src = result.Poster;
    img.alt = "No poster available";

    para.appendChild(title);
    para.appendChild(genre);
    para.appendChild(actors);
    para.appendChild(released);
    para.appendChild(plot);

    div.appendChild(para);
    div.appendChild(img);

    panel.appendChild(div);    
}
  