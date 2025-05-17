const aud = document.getElementById('video');
aud.addEventListener("timeupdate", myFunction);
const text = document.getElementById('text');

function isVisible(element) {
  const rect = element.getBoundingClientRect();
  const boxRect = text.parentElement.getBoundingClientRect();
  console.log(rect)
  return (
    rect.top >= boxRect.top &&
    rect.bottom <= boxRect.bottom - 10
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
