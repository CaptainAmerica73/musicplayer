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
let loop=document.querySelector(".loop");
let shuffle=document.querySelector(".shuffle");

let track_index = 0;
let is_playing = false;
let update_timer;

let current_track = document.createElement("audio");

let song_list = [
    {
        name: "Chellamma Chellamma",
        artist: "Anirudh Ravichandran,Jonita Gandhi",
        img: "https://pbs.twimg.com/media/FCTABPtVkAYAQnf.jpg:large",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688303336/songs/chellamma.mp3"
    },
    {
        name: "Samajavaragamana",
        artist: "S Thaman,Sid Sriram",
        img: "https://wallpapercave.com/dwp1x/wp6123059.jpg  ",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688303278/songs/samajavaragamana.mp3"
    },
    {
        name: "Dopamine Addict",
        artist: "Alec Benjamin",
        img: "https://i.ytimg.com/vi/4LJQ8Ui_8_w/maxresdefault.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688303274/songs/dopamineaddict.mp3"
    },
    {
        name: "Unakkul Naanae",
        artist: "Pritt",
        img: "https://i1.sndcdn.com/artworks-zOSOFzy6DOaeAD5A-LrwtUw-t500x500.png",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688303294/songs/unakkulnaanae.mp3"
    },
    {
        name: "Tum Hi Ho",
        artist: "Arijit Singh",
        img: "https://wallpapercave.com/wp/wp7717914.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688303324/songs/tumhiho.mp3"
    },
    {
        name: "Believer",
        artist: "Imagine Dragons",
        img: "https://e1.pxfuel.com/desktop-wallpaper/634/46/desktop-wallpaper-imagine-dragons-believer-believer-song.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688412543/songs/believer.mp3"
    },
    {
        name: "Paadatha Pattellam",
        artist: "Viswanathan-Ramamoorthy,Dharan Kumar,Sathyaprakash,Nithyashree,Emcee D",
        img: "https://pagalnew.com/coverimages/paadatha-pattellam-rudhran-500-500.jpg",
        path:"https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306649/songs/paadathapaattellam.mp3"
    },
    {
        name: "Kaattumalli",
        artist: "Ilaiyaraaja,Ananya Bhat",
        img: "https://c.saavncdn.com/615/Kaattumalli-Trending-Version-Tamil-2023-20230424193336-500x500.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306542/songs/kaattumalli.mp3"
    },
    {
        name: "Ennodu Nee Irundhal",
        artist: "A.R.Rahman,Sid Sriram,Sunitha Sarathy",
        img: "https://i1.sndcdn.com/artworks-000092468035-uzbm3k-t500x500.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306635/songs/ennoduneeirundhal.mp3"
    },
    {
        name: "Nira",
        artist: "Nivas K Prasanna,Sid Sriram,Gautham Vasudev Menon,Malvi Sundaresan",
        img: "https://c.saavncdn.com/790/Takkar-Tamil-2020-20230627165008-500x500.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306657/songs/nira.mp3"
    },
    {
        name: "Vilambara Idaiveli",
        artist: "Hiphop Tamizha,Christopher Stanley,Sudharshan Ashok,Srinisha Jayaseelan",
        img: "https://i.scdn.co/image/ab67616d0000b2733790f4a6ab5674708b8fa36f",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306711/songs/vilambaraidaiveli.mp3"
    },
    {
        name: "Kadhal Kappal",
        artist: "Santhosh Narayanan",
        img: "https://i.scdn.co/image/ab67616d0000b273b78f9ef256d5e815f35d158b",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306550/songs/kadhalkappal.mp3"
    },
    {
        name: "Vaa Vaathi",
        artist: "G.V.Prakash,Dhanush",
        img: "https://i.scdn.co/image/ab67616d0000b2738bda34105de5623bae6bf02e",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306691/songs/vaavaathi.mp3"
    },
    {
        name: "Aval",
        artist: "Santhosh Narayanan,Pradeep,Priya Hemesh",
        img: "https://i.scdn.co/image/ab67616d0000b273803e99ee30bb2d8169a3fa57",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306727/songs/aval.mp3"
    },
    {
        name: "Let Me Down Slowly",
        artist: "Alec Benjamin",
        img: "https://wallpapercave.com/dwp2x/wp5453963.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306586/songs/letmedownslowly.mp3"
    },
    {
        name: "Shape of You",
        artist: "Ed Sheeran",
        img: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306691/songs/shapeofyou.mp3"
    },
    {
        name: "Cheap Thrills",
        artist: "Sia,Sean Paul",
        img: "https://i.scdn.co/image/ab67616d0000b273fc36b265066a58e205ecbd5c",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306477/songs/cheapthrills.mp3"
    },
    {
        name: "Levitating",
        artist: "Dua Lipa,DaBaby",
        img: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306598/songs/levitating.mp3"
    },
    {
        name: "Bad Guy",
        artist: "Billie Eilish",
        img: "https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306453/songs/badguy.mp3"
    },
    {
        name: "Say My Name",
        artist: "David Guetta,Bebe Rexha,J Balvin",
        img: "https://i.scdn.co/image/ab67616d0000b27367e400c9be79e6b0b0086880",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306662/songs/saymyname.mp3"
    },
    {
        name: "Hey Mama",
        artist: "David Guetta,AFROJACK,Bebe Rexha,Nicki Minaj",
        img: "https://i.scdn.co/image/ab67616d0000b2733862d62a50dc6b928651bdeb",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306513/songs/heymama.mp3"
    },
    {
        name: "Into Your Arms",
        artist: "Witt Lowry,Ava Max",
        img: "https://i.scdn.co/image/ab67616d0000b2733953ec40ca0a28a622c4a50f",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306533/songs/intoyourarms.mp3"
    },
    {
        name: "FLOWER",
        artist: "JISOO",
        img: "https://i.scdn.co/image/ab67616d0000b2735a42123d217f8c248ec1a92d",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306501/songs/flower.mp3"
    },
    {
        name: "Shut Down",
        artist: "BLACKPINK",
        img: "https://www.songmeaningsandfacts.com/wp-content/uploads/2022/09/Shut-Down-by-BLACKPINK.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306692/songs/shutdown.mp3"
    },
    {
        name: "Pink Venom",
        artist: "BLACKPINK",
        img: "https://upload.wikimedia.org/wikipedia/en/c/cb/Pink_Venom_Cover.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306674/songs/pinkvenom.mp3"
    },
    {
        name: "Typa Girl",
        artist: "BLACKPINK",
        img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0fc9ded4-899e-408f-8b33-c893599d0397/dffqoi4-296bbf64-801b-4e5a-b76e-df93937c1402.png/v1/fill/w_894,h_894,q_70,strp/blackpink___typa_girl_by_neonflowerdesigns_dffqoi4-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBmYzlkZWQ0LTg5OWUtNDA4Zi04YjMzLWM4OTM1OTlkMDM5N1wvZGZmcW9pNC0yOTZiYmY2NC04MDFiLTRlNWEtYjc2ZS1kZjkzOTM3YzE0MDIucG5nIiwiaGVpZ2h0IjoiPD0xMDI0Iiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMGZjOWRlZDQtODk5ZS00MDhmLThiMzMtYzg5MzU5OWQwMzk3XC9uZW9uZmxvd2VyZGVzaWducy00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.twe6nPv7VJV2UtlZk-d2GgQM4WlUuPSMtAQNF6XP4Ag",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306713/songs/typagirl.mp3"
    },
    {
        name: "How You Like That",
        artist: "BLACKPINK",
        img: "https://i.scdn.co/image/ab67616d0000b27357f5bb0f7a90c35a4bcbb727",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306521/songs/howyoulikethat.mp3"
    },
    {
        name: "Lovesick Girls",
        artist: "BLACKPINK",
        img: "https://i.scdn.co/image/ab67616d0000b2731895052324f123becdd0d53d",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306608/songs/lovesickgirls.mp3"
    },
    {
        name: "DDU-DU DDU-DU",
        artist: "BLACKPINK",
        img: "https://i.scdn.co/image/ab67616d0000b273bfd46639322b597331d9ecef",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306712/songs/ddududdudu.mp3"
    },
    {
        name: "Kill This Love",
        artist: "BLACKPINK",
        img: "https://i.scdn.co/image/ab67616d00001e022d602ab2d4acff0c2cf57683",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306569/songs/killthislove.mp3"
    },
    {
        name: "SOLO",
        artist: "JENNIE",
        img: "https://i.scdn.co/image/ab67616d0000b273d0b43791d31a569726a34064",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306674/songs/solo.mp3"
    },
    {
        name: "Euphoria",
        artist: "BTS",
        img: "https://i1.sndcdn.com/artworks-000330527937-0wtwyt-t500x500.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306491/songs/euphoria.mp3"
    },
    {
        name: "Magic Shop",
        artist: "BTS",
        img: "https://i0.wp.com/www.btsgtheories.com/wp-content/uploads/2021/03/magic-shop.jpg?fit=1280%2C720&ssl=1",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306634/songs/magicshop.mp3"
    },
    {
        name: "Boy With Luv",
        artist: "BTS,Halsey",
        img: "https://i1.sndcdn.com/artworks-cJhzdvRT8aUQ3fY1-yglEKg-t500x500.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306630/songs/boywithluv.mp3"
    },
    {
        name: "FAKE LOVE",
        artist: "BTS",
        img: "https://upload.wikimedia.org/wikipedia/en/8/84/Fake_Love_%28Rocking_Vibe_Mix%29_Cover_Art.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306650/songs/fakelove.mp3"
    },
    {
        name: "Run BTS",
        artist: "BTS",
        img: "https://i1.sndcdn.com/artworks-000463311402-yvemc9-t500x500.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306716/songs/run.mp3"
    },
    {
        name: "Dreamers",
        artist: "Jung Kook,BTS,FIFA Sound",
        img: "https://i.scdn.co/image/ab67616d0000b273ef57183066d6cac0cabb85c6",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306467/songs/dreamers.mp3"
    },
    {
        name: "Dynamite",
        artist: "BTS",
        img: "https://i.scdn.co/image/ab67616d0000b273668914e625d75e5fe3f1da51",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306475/songs/dynamite.mp3"
    },
    {
        name: "DNA",
        artist: "BTS",
        img: "https://wallpaperaccess.com/full/403480.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688308905/songs/dna.mp3"
    },
    {
        name: "Yet To Come",
        artist: "BTS",
        img: "https://assets-in.bmscdn.com/discovery-catalog/events/et00351004-rptsqtzhhf-landscape.jpg",
        path: "https://res.cloudinary.com/dclvfa2vt/video/upload/v1688306713/songs/yettocome.mp3"
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

let image = 0;
function next_track() {
    if (track_index < song_list.length - 1) track_index += 1;
    else track_index = 0;

    document.querySelector(".track-art").style.animationName = "none";
    if (image == 1) {
        document.querySelector(".track-art").style.animationName = "rotate1";
        image--;}
    else {
        document.querySelector(".track-art").style.animationName = "rotate2";
        image++;}

    load_track(track_index);
    play_track();
}

function previous_track() {
    if (track_index > 0) track_index -= 1;
    else track_index = song_list.length - 1;

    document.querySelector(".track-art").style.animationName = "none";
    
    if (image == 1) {
        document.querySelector(".track-art").style.animationName = "rotate1";
        image--;}
    else {
        document.querySelector(".track-art").style.animationName = "rotate2";
        image++;}

    load_track(track_index);
    play_track();
}

let is_looping=false;
function looping(){
    if(is_looping==false){
        is_looping=true;
        current_track.loop=true;
        loop.style.color="blue"}
    else{
        is_looping=false;
        current_track.loop=false;
        loop.style.color="white"}
}

let is_shuffling=false;
function shuffling(){
    if(is_shuffling==false){
        current_track.addEventListener("ended",function(){
            track_index=Math.floor(Math.random()*(song_list.length-1));
            load_track(track_index);
            play_track();
        })
        is_shuffling=true;
        shuffle.style.color="blue";
    }
    else{
        current_track.addEventListener("ended",next_track);
        is_shuffling=false;
        shuffle.style.color="white";
    }
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
