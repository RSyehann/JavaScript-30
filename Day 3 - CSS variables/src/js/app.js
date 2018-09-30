const inputs = document.querySelectorAll('.controls input');


function HandleUpdate() {
    const suffix = this.dataset.sizing || '';
    console.log(this.name);
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

}

inputs.forEach(input => input.addEventListener('change', HandleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', HandleUpdate));
