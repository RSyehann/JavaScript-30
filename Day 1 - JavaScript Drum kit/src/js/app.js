const keys = Array.from(document.querySelectorAll('.key'));

keys.forEach(key => key.addEventListener('transitionend', removeTransition));

keys.forEach(key => key.addEventListener('click', playSound));
window.addEventListener('keydown', playSound);

function playSound(e) {
    //依據不同的事件來取得對應的key_code(e.type可以看得到，以下是簡寫版)
    let keyCode = e.keyCode || this.getAttribute('data-key');

    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

    if (!audio) return; // stop the function from running all 

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}

function removeTransition(e) {
    // skip it if it's not a transform
    if (e.propertyName !== 'transform') return; 
    this.classList.remove('playing');
}





