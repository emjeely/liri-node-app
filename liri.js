require("dotenv").config();
const keys = require("./keys.js");
const axios = require ("axios");
const fs = require("fs");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

function doWant() {
fs.readFile('random.txt', 'utf8', (err, res) => {
  if (err) {
      console.log(err);
  }
  const wantIt = (res.split(","));
  const userIn = wantIt[1];
  spotify.search({ type: 'track', query: userIn }, function(err, data) {
      if (err) {
          console.log(err)
      }
      const msg = "\nHUH? \n Here you go: " + data.tracks.items[0].album.name + " by " + data.tracks.items[0].album.artists[0].name + "\nListen here: " + data.tracks.items[0].album.href + "\n-----------------------------\n"
      console.log(msg);
      // fs.appendFile("log.txt", msg, "utf8", (err) => {
      //     if (err) {
      //         console.log(err);
      //     }
      })
  });
};

function song() {
  const wholeArgv = process.argv;
  const argvSlice = wholeArgv.slice(3);
  let userIn = argvSlice.join(' ');

    if (process.argv[3] === undefined) {
      userIn = "Ace of Base";
      spotify.search({type: "track", query: userIn}, function(err, data){
        if (err) {
          return console.log("Error occured: " + err);
        }

        const aob = "No song? ... here LISTEN TO THIS: " + data.tracks.items[0].album.name + " by " + data.tracks.items[0].album.artists[0].name + "\nGo here to listen: " + data.tracks.items[0].album.href + "\n-------------------------\n"

        console.log(aob);

        // fs.appendFile(aob, "utf8", (err) => {
        //   if(err) {
        //     console.log(err);
        //   }
        // })
      });

    } else{
          spotify.search({type: "track", query: userIn}, function(err, data) {
            
            if (err) {
              return console.log("ERORR: " + err);
            }

      for (let i = 0; i < data.tracks.items.length; i++) {
        let songM = "Artist: " + data.tracks.items[i].album.artists[0].name + "\nTrack name: " + data.tracks.items[i].name + "\nSpotify link: " + data.tracks.items[i].album.href + "\nAlbum Name: " + data.tracks.items[i].album.name + "\n-------------------------\n"

        console.log(songM);

        // fs.appendFile(songM, "utf8", (err) => {
        //   if (err) {
        //     console.log(err);
        //   }
        // })
      }
            });
    }
}


function concert() {
  const wholeArgv = process.argv;
  const argvSlice = wholeArgv.slice(3);
  const userIn = argvSlice.join("+");
  
  fs.appendFile(argvSlice.join(" ") + "\n-------------------------\n", "utf8", (err) => {
    return null;

    // if(err) {
    //   console.log(err);
    // }
  });

  const url = "https://rest.bandsintown.com/artists/" + userIn + "/events?app_id=codingbootcamp"
  axios

      .get(url)
      .then(function (response){
            for (let i = 0; i < response.data.length; i++) {
              
                
              let concertD = moment(response.data[i].datetime).format("MM / DD / YYYY");
                  // console.log(concertD);
              
              let concertM = "Venue Name: " + response.data[i].venue.name + "\nCity: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\n" + concertD + "\n-------------------------\n"
                  // console.log("this from console");
                  console.log(concertM);
                  // console.log("end of coming")
              // fs.appendFile(concertM, "utf8", (err) => {
                  
              //     if (err) {
              //       console.log(err);
              //     }
              // })
              

            }
      })
}

function movie() {
  const wholeArgv = process.argv
  const argvSlice = wholeArgv.slice(3)
  const userIn = argvSlice.join('+');
  const url = "http://www.omdbapi.com/?t=" + userIn + "&apikey=81086473"
  axios
      
      .get(url)
      .then(function (response) {

        console.log("Title: " + response.data.Title);

        console.log("Year: " + response.data.Year);
        
        console.log(response.data.Ratings[0].Source + " " + response.data.Ratings[0].Value);
        
        console.log(response.data.Ratings[1].Source + " " + response.data.Ratings[1].Value);
        
        console.log("Country: " + response.data.Country);
        
        console.log("Language: " + response.data.Language);
        
        console.log("Plot: " + response.data.Plot);
        
        console.log("Actors: " + response.data.Actors);


          let movieM = "Title: " + response.data.Title + "\nYear: " + response.data.Year + "\n" + response.data.Ratings[0].Source + " " + response.data.Ratings[0].Value + "\n" + response.data.Ratings[1].Source + " " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n-------------------------\n"

          // fs.appendFile(movieM, "utf8", (err) => {
          //     if (err) {
          //       console.log(err)
          //     }
          // })
      })
}


switch (process.argv[2]) {
  case "concert-this":
  console.log("concert-this");
  concert();
  break;
  case "spotify-this-song":
      console.log("spotify-this-song");
      song();
      break;
  case "movie-this":
      movie()
      break;
  case "do-what-it-says":
      console.log("do-what-it-says");
      doWant();

}
