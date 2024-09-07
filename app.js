console.log("Welcome to Spotify");

// initialize the variables

let songIndex = 0;
let audioelement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItem = Array.from(document.getElementsByClassName("songItem"));
let forwardBtn = document.querySelector('.fa-forward-fast');
let backwardBtn = document.querySelector('.fa-backward-fast');

const playSong = () => {
    audioelement.src = songs[songIndex].filepath;
    audioelement.currentTime = 0;
    audioelement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
};

forwardBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;  // Move to next song in the list, loop back to first if at the end
    playSong();  // Play the next song
    updateSongDetails();  // Update UI with the current song details
});

backwardBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;  // Move to previous song, loop back to last song if at the beginning
    playSong();  // Play the previous song
    updateSongDetails();  // Update UI with the current song details
});

const updateSongDetails = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
        if (i === songIndex) {
            element.classList.remove('fa-play');
            element.classList.add('fa-pause');
        } else {
            element.classList.remove('fa-pause');
            element.classList.add('fa-play');
        }
    });
};

// Create an Audio object with the path to the MP3 file


// Play the audio
// audioelement.play();

let songs = [
    {  songName : "Be Mine",filepath : "1.mp3", coverPath : "1.jpeg"},
    {  songName : "Offshore",filepath : "2.mp3", coverPath : "2.jpeg"},
    {  songName : "Dior",filepath : "3.mp3", coverPath : "3.jpg"},
    {  songName : "52 Bars",filepath : "4.mp3", coverPath : "4.jpg"},
    {  songName : "Wining speech",filepath : "5.mp3", coverPath : "5.jpeg"},
];

songItem.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
});

masterPlay.addEventListener('click', ()=>{
    if (audioelement.paused || audioelement<=0) {
        audioelement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause')
    }
    else{
        audioelement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play')
    }
})

audioelement.addEventListener('timeupdate', ()=>{
    // Update Seekbar

     let progress = parseInt((audioelement.currentTime/audioelement.duration)*100);
    myProgressBar.value = progress;
    
});

myProgressBar.addEventListener('change', ()=>{
    audioelement.currentTime = (myProgressBar.value / 100) * audioelement.duration;
});

const makeAllPlays = ()=>{
   Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.classList.remove('fa-pause');
    element.classList.add('fa-play');
   })
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) =>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = index;
        e.target.classList.remove('fa-play');   
        e.target.classList.add('fa-pause');
         audioelement.src = songs[songIndex].filepath;
         audioelement.currentTime = 0;
         audioelement.play();

         masterPlay.classList.remove('fa-play'); 
         masterPlay.classList.add('fa-pause');
    })
})
