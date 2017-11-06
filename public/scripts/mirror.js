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
        mydiv.innerHTML=temp.city + "," + temp.region;
        function weather(temp) {
            var req2 = request("https://api.darksky.net/forecast/"+"a5e319be3b436c691f6b413334f2099f"+"/24.9206,67.0703"+"?units=si",
                function (){
                    var temp2=JSON.parse(this.responseText);
                    var tempH= document.getElementById("Temperature");
                    tempH.innerHTML=Math.floor(temp2.currently.temperature)+"°C";
                    var summaryH= document.getElementById("Summary");
                    summaryH.innerHTML=temp2.currently.summary;
                    var icon = temp2.currently.icon;
                    var skycons = new Skycons({"color": "white", "resizeClear": true});
                    skycons.set(document.getElementById("icon"),icon);
                    skycons.play();
                    console.log(temp2)
                });
        }
        weather();

    });
    function time() {
        var d = new Date();
        var payload = d.toString("hh:mm");
        var mydiv = document.getElementById("time");
        var mydiv2= document.getElementById("clock");
        mydiv.innerHTML= payload;
        var date = new Date();
        mydiv2.innerHTML= date.getHours() >= 12 ? 'PM':'AM'
    }
    time()
    setInterval(() => {
        time()
    }, 1000);
}