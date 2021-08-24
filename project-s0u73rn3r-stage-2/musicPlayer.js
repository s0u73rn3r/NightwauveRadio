
const EXAMPLE_SEARCH_RESULTS = {
  results: [{
    artistName: "Queen",
    trackName: "Bohemian Rhapsody",
    previewUrl: "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music3/v4/41/cc/ae/41ccae59-697a-414c-43b5-51bd4d88d535/mzaf_3150742134610995145.plus.aac.p.m4a",
    artworkUrl100: "http://is3.mzstatic.com/image/thumb/Music1/v4/94/92/a3/9492a374-e6e3-8e92-0630-a5761070b0f7/source/100x100bb.jpg",
  }, {
    artistName: "David Bowie",
    trackName: "Starman (2012 Remastered Version)",
    previewUrl: "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview71/v4/d2/68/ea/d268ea6a-9e8b-fc0b-f519-0e8b59fd9a18/mzaf_6387986799378989474.plus.aac.p.m4a",
    artworkUrl100: "http://is3.mzstatic.com/image/thumb/Music6/v4/ab/4e/d9/ab4ed977-4b96-4791-bcec-e02c94283332/source/100x100bb.jpg",
  }, {
    artistName: "Beyoncé",
    trackName: "Formation",
    previewUrl: "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview122/v4/5f/d7/5f/5fd75fd8-d0a5-ccb2-7822-bcaedee070fc/mzaf_3356445145838692600.plus.aac.p.m4a",
    artworkUrl100: "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
  }]
};

function renderTrack(song) {

  $('#records').append(`<img src="${song.artworkUrl100}" alt="${song.trackName}" Title="${song.trackName}">`)
  $('img:last').on("click",function(){
    console.log($(this).attr('alt'))
    playTrackPreview($(this).attr('alt'));
  });
}





function renderSearchResults(playlist) {
  $('#records').html("");
  for (let i = 0; i < playlist.results.length; i++) {
    renderTrack(playlist.results[i]);
  }
}

const URL_TEMPLATE = "https://itunes.apple.com/search?entity=song&limit=25&term=";
let err;

function fetchTrackList(search) {
  return fetch(URL_TEMPLATE+search)
  .then(function (res) {
    return res.json();
  })
    .then(function (res) {
      if(res && res.results && res.results.length)
      {
      renderSearchResults(res)
      }
      else{
        renderError("No results found");
      }
    })
    .catch(error =>{
      renderError(error);
    });
}

document.getElementById('button').addEventListener("click",function(event){
  let searchFor=$(`#searchbar`).val();
  event.preventDefault();
  fetchTrackList(searchFor);
})
function renderError(error)
{
  $('#records').append('<p class="alert-danger"></p>')
  $('p').text(error)
}

const state = { previewAudio: new Audio() };

function playTrackPreview(track) {
  state.previewAudio = new Audio(track.previewUrl);
  if (state.previewAudio.src !== track.previewUrl) {

    state.previewAudio.pause();
    state.previewAudio = new Audio(track.previewUrl);
    state.previewAudio.play();
  }
  else {
    if (state.previewAudio.paused) {
      state.previewAudio.play();
    } else {
      state.previewAudio.pause();
    }
  }
}