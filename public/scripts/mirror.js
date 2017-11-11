function request(link,callback){
    var xhttp = new XMLHttpRequest();
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var interlink= proxy +link;
    xhttp.open('GET',interlink,true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (typeof callback == "function"){
                callback.apply(xhttp);
            }
        }
    };

    xhttp.send();
}
window.onload = () => {


    var req1 = request("//ipinfo.io/json",function () {
        var temp=JSON.parse(this.responseText);
        console.log(temp);
        mydiv=document.getElementById("Location");
        mydiv.innerHTML=temp.city + ", " + temp.region;
        function weather(temp) {
            var req2 = request("https://api.darksky.net/forecast/"+"a5e319be3b436c691f6b413334f2099f"+"/24.9206,67.0703"+"?units=si",
                function (){
                    try {
                    var temp2=JSON.parse(this.responseText);
                    var tempH= document.getElementById("Temperature");
                    tempH.innerHTML=Math.floor(temp2.currently.temperature)+"°C";
                    var summaryH= document.getElementById("Summary");
                    summaryH.innerHTML=temp2.currently.summary;
                    var icon = temp2.currently.icon;
                    var skycons = new Skycons({"color": "white", "resizeClear": true});
                    skycons.set(document.getElementById("icon"),icon);
                    skycons.play();
                    console.log(temp2);
                }
                catch (e) {
                    console.log(e);
                }
                });
        }
        weather();
    });
    function time() {
        var d = new Date();
        var payload = d.toString("hh:mm");
        var mydiv = document.getElementById("time");
        var mydiv2= document.getElementById("clock");
        var mydiv3= document.getElementById("date");
        mydiv.innerHTML= payload;        
        var date = new Date();
        var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        mydiv3.innerHTML= days[date.getDay()] + ", " + monthNames[date.getMonth()] +" "+ date.getDate();
        mydiv2.innerHTML= date.getHours() >= 12 ? 'PM':'AM'

    }
    time()
    setInterval(() => {
        time()
    }, 1000);
    function music() {
        var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=amb1tion&api_key=1e86169b32891afcbb0180749423e8d8&format=json&limit=1'
        request(url,function () {
            var info = JSON.parse(this.responseText);
            var titleid= document.getElementById("track");
            var artid=document.getElementById("art");
            var albumid=document.getElementById("album");
            var artistid=document.getElementById("artist");
            var track = info.recenttracks.track[0].name;
            var artist = info.recenttracks.track[0].artist["#text"];
            var image = info.recenttracks.track[0].image[3]["#text"];
            var album = info.recenttracks.track[0].album["#text"];
            titleid.innerHTML=track;
            artid.innerHTML="<img src="+image+">";
            artistid.innerHTML=artist;
            albumid.innerHTML=album;
            console.log(info);
            
        })
    }
    music();
}