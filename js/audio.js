var isBusy = false;
const evento = new Event("end");
var audio = new Audio();
const iconImg = document.querySelectorAll('.icon');



for (var i = 0; i < iconImg.length; i++) {
  /* console.log(iconImg[i]); */
  var iconType = iconImg[i].getAttribute('data-type');
  var iconSrc = "assets/icons/" + iconType + ".svg";
  iconImg[i].classList.remove('image');

  console.log(iconType);
  console.log(iconSrc);

  iconImg[i].style.backgroundImage = 'url(' + iconSrc + ')';

  iconImg[i].addEventListener("click", function () {
    removeClass();
    var imgName = event.target.getAttribute("content");
    var imgSrc = "assets/images/" + imgName + ".jpg";
    console.log('cliked');
    this.style.backgroundImage = 'url(' + imgSrc + ')';
    this.classList.remove('icon');
    this.classList.add('image');
  });

};



function removeClass() {
  for (var i = 0; i < iconImg.length; i++) {
    var iconType = iconImg[i].getAttribute('data-type');
    var iconSrc = "assets/icons/" + iconType + ".svg";
    iconImg[i].style.backgroundImage = 'url(' + iconSrc + ')';
    iconImg[i].classList.remove('image');
    iconImg[i].classList.add('icon');
  }
}


$(".btnAudio").on("click", function () {
  var src =
    "./assets/sounds/" +
    this.id +
    ".mp3"; /* AUDIO FILE NAME SAME INTO THE HTML AUDIO LOAD */
  audio.src = src;
  audio.dispatchEvent(evento);

  isBusy = true;

  var items = document.getElementsByClassName("audioControl");
  for (var i = 0; i < items.length; i++) {
    items[i].style.opacity = 1;
  }

  audio.play();

  audio.addEventListener("timeupdate", () => {
    var seconds = audio.currentTime;
    minutes = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : "0" + seconds;
    document.getElementById(
      "progressAudioTime"
    ).innerHTML = `${minutes}:${seconds}`;
    document.getElementById("progressAudioBar").value =
      (audio.currentTime / audio.duration) * 100;
  });

  audio.addEventListener("ended", () => {
    isBusy = false;
    for (var i = 0; i < iconImg.length; i++) {
      iconImg[i].style.backgroundImage = 'url(' + iconSrc + ')';
      iconImg[i].classList.remove('image');
      iconImg[i].classList.add('icon');
    }

  });

  audio.addEventListener("end", () => {
    audio.pause();

  });
});
