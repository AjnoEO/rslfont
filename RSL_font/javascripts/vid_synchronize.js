const aud = document.getElementById('video');
aud.addEventListener("timeupdate", myFunction);
const text = document.getElementById('text');

function isVisible(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function scrollToElement(element) {
  if (!isVisible(element)) {
    text.parentElement.scrollTo({
      top: element.offsetTop - text.offsetTop,
      behavior: 'smooth'
    });
  }
}

function myFunction(){
  for (let i = 0; i < text.children.length; i++) {
    const word = text.children[i];
    start = parseFloat(word.dataset.start);
    end = parseFloat(word.dataset.end);
    if (start <= aud.currentTime & aud.currentTime < end) {
      word.classList.add("blue");
      scrollToElement(word);
    } else {
      word.classList.remove("blue");
    }
  }
}
