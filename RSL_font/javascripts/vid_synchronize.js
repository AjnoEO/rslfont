var aud = document.getElementById('video');
aud.addEventListener("timeupdate", myFunction);
var test_p = document.getElementById('test');

function myFunction(){
  if(aud.currentTime >= 5){
    test_p.innerText = aud.currentTime
  }
}