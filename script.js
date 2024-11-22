let songName = document.querySelector('#song_name');
let songSinger= document.querySelector('#song_singer');
let songImg= document.querySelector('.song_img');
let playPauseImg = document.querySelector('#play_img');
let volumeRange = document.querySelector('#volume_range');
let songRange = document.querySelector('#song_duration');
let volSvg = document.querySelector('#vol_svg')
let musicAnimation = document.querySelector('#musicanimation')
let playlistImg = document.querySelector('#playlist_img')
let playlist = document.querySelector('.playlist')
let playlistSong = document.querySelectorAll('.playlist_song')
let index = 0;
let playingSong =false;
let track = document.createElement('audio')


let songs = [
    {
        name:"Goat",
        path:"./music/goat.mp3",
        image:"./img/goat.jpg",
        singer:"Diljit Dosanjh"
    },

    {
        name:"52bar",
        path:"./music/52bar.mp3",
        image:"./img/52bar.jpg",
        singer:"Karan Aujla"
    },
    {
        name:"Born To Shine",
        path:"./music/born to shine.mp3",
        image:"./img/borntoshine.jpg",
        singer:"Diljit Dosanjh"
    },
    {
        name:"Winning Speech",
        path:"./music/winning speech.mp3",
        image:"./img/winning.jpg",
        singer:"Karan Aujla"
    },
    {
        name:"Jee Nahi Lagda",
        path:"./music/jee nahi lagda.mp3",
        image:"./img/jeenahi.jpg",
        singer:"Karan Aujla"
    },
]



function loadTrack(index){
    track.src = songs[index].path;
    songName.innerHTML = songs[index].name;
    songSinger.innerHTML = songs[index].singer;
    songImg.style = `background-image: url('${songs[index].image}');`
    volume();
    duration();
    setInterval(()=>{
        songRange.max = track.duration
        songRange.value = track.currentTime
    },1000)
    track.loop=true;
    track.load(0);
    
}

    loadTrack(index);


    function playPause(){
        if(playingSong== false){
            playSong();
            musicAnimation.style.display='block';
        }
        else{
            pauseSong();
            musicAnimation.style.display='';
        }
    }

   function playSong(){
         track.play();
        playingSong=true;
        playPauseImg.src ="pause.svg"
    }

    function pauseSong(){
         track.pause();
        playingSong=false;
        playPauseImg.src ="play.svg"
    }


    function nextSong(){
        if(index<songs.length-1){
            index++;
            loadTrack(index);
            playSong();
        }
     else{index=0;
         loadTrack(index);
         playSong();
}}

function previousSong(){
        if(index>0){
            index--;
            loadTrack(index);
            playSong();
        }
     else{index=songs.length-1;
         loadTrack(index);
         playSong();

     }}

  function volume(){
    track.volume = volumeRange.value/100;
    if(volumeRange.value==0){
        volSvg.src='mute.svg'
    }
    else{
        volSvg.src='volume.svg'
    }}   

   function duration(){
    track.currentTime = songRange.value;
   } 


   playlistImg.addEventListener("click", ()=>{
    playlist.classList.toggle("playlist-active")
    if(
    playlist.classList.contains("playlist-active")){
        playlistImg.src="cross.svg"
    }
    else{
        playlistImg.src="playlist.svg"

    }
  })

  playlistSong.forEach((song,index)=>{
    song.addEventListener("click" ,()=>{
    loadTrack(index)
    playSong()
    playlist.classList.remove("playlist-active");
    playlistImg.src="playlist.svg"
    })
  })

  