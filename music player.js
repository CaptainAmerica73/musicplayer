let playlist_name = document.querySelector(".playlist");
let song_image = document.querySelector(".track-art");
let song_name = document.querySelector(".songname");
let artist_name = document.querySelector(".artist");
let previous_button = document.querySelector(".previous");
let pauseplay_button = document.querySelector(".pauseplay");
let next_button = document.querySelector(".next");
let current_time = document.querySelector(".current-time");
let time_slider = document.querySelector(".slider-position");
let total_time = document.querySelector(".total-time");
let volume_change = document.querySelector(".volumechange");
let volume_slider = document.querySelector(".volumeslider");
let max_volume = document.querySelector(".maxvolume");

let track_index = 0;
let is_playing = false;
let update_timer;

let current_track = document.createElement("audio");

let song_list = [
    {
        name: "Chellamma Chellamma",
        artist: "Anirudh Ravichandran,Jonita Gandhi",
        img: "https://pbs.twimg.com/media/FCTABPtVkAYAQnf.jpg:large",
        path: ""
    },
    {
        name: "Samajavaragamana",
        artist: "S Thaman,Sid Sriram",
        img: "https://wallpapercave.com/dwp1x/wp6123059.jpg  ",
        path: ""
    },
    {
        name: "Dopamine Addict",
        artist: "Alec Benjamin",
        img: "https://i.ytimg.com/vi/4LJQ8Ui_8_w/maxresdefault.jpg",
        path: ""
    },
    {
        name: "Unakkul Naanae",
        artist: "Pritt",
        img: "https://i1.sndcdn.com/artworks-zOSOFzy6DOaeAD5A-LrwtUw-t500x500.png",
        path: ""
    },
    {
        name: "Tum Hi Ho",
        artist: "Arijit Singh",
        img: "https://wallpapercave.com/wp/wp7717914.jpg",
        path: ""
    }
];

function load_track(track_index) {
    set_volume();
    clearInterval(update_timer);
    reset_values();

    current_track.src = song_list[track_index].path;
    current_track.load();
    playlist_name.textContent = "My Playlist";
    song_image.src = song_list[track_index].img;
    song_name.textContent = song_list[track_index].name;
    artist_name.textContent = song_list[track_index].artist;

    update_timer = setInterval(slider_update, 1000);

    current_track.addEventListener("ended", next_track);

    random_color();

}
function random_color() {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);

    let bg_colour1 = "rgb(" + red + "," + green + "," + blue + ")";

    red = Math.floor(Math.random() * 255);
    green = Math.floor(Math.random() * 255);
    blue = Math.floor(Math.random() * 255);

    let bg_colour2 = "rgb(" + red + "," + green + "," + blue + ")";

    document.body.style.background  = "linear-gradient(to right," + bg_colour1 + "," + bg_colour2 + ")";
}
function reset_values() {
    current_time.textContent = "00:00";
    total_time.textContent = "00:00";
    time_slider.value = 0;
}
function playpause_track() {
    is_playing ? pause_track() : play_track();
}
function play_track() {
    current_track.play();
    is_playing = true;
    pauseplay_button.innerHTML = "<i class='fa-solid fa-circle-pause'></i>";
}
function pause_track() {
    current_track.pause();
    is_playing = false;
    pauseplay_button.innerHTML = "<i class='fa-solid fa-circle-play'></i>";
}
let a = 0;
function next_track() {
    if (track_index < song_list.length - 1) track_index += 1;
    else track_index = 0;

    document.querySelector(".track-art").style.animationName = "none";
    a++;
    if (a % 2 == 0) document.querySelector(".track-art").style.animationName = "example";
    else document.querySelector(".track-art").style.animationName = "rotate";

    load_track(track_index);
    play_track();
}

function previous_track() {
    if (track_index > 0) track_index -= 1;
    else track_index = song_list.length - 1;

    document.querySelector(".track-art").style.animationName = "none";
    a++;
    if (a % 2 == 0) document.querySelector(".track-art").style.animationName = "example";
    else document.querySelector(".track-art").style.animationName = "rotate";
    load_track(track_index);
    play_track();
}
function slider_change() {
    let song_duration = current_track.duration * (time_slider.value / 100);
    current_track.currentTime = song_duration;
}
function set_volume() {
    volume_change.innerHTML=volume_slider.value; 
    current_track.volume = volume_slider.value / 100;
    console.log(volume_slider.value); 
}
function slider_update() {
    let slider_position = 0;
    if (!isNaN(current_track.duration)) {
        current_time.textContent = ("0" + Math.floor(current_track.currentTime / 60)).slice(-2) + ":" + ("0" + Math.floor(current_track.currentTime % 60)).slice(-2);
        
        total_time.textContent = ("0" + Math.floor(current_track.duration / 60)).slice(-2) + ":" + ("0" + Math.floor(current_track.duration % 60)).slice(-2);
        
        slider_position = current_track.currentTime * (100 / current_track.duration);
        time_slider.value = slider_position;
    }
}
load_track(track_index);