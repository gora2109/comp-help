//"show password" function
function showHidePassword() {
    let inputPassword = document.querySelector('.password-input'),
        span;
    if (inputPassword){
        let btnPassword = inputPassword.querySelector('.password-btn');
        btnPassword.addEventListener("mousedown", function (e) {
            let inputValue = inputPassword.querySelector('input[type="password"]').value;
            if (inputValue !== ''){
                inputPassword.insertAdjacentHTML('beforeend',`<span class="password-text">${inputValue}</span>`);
                btnPassword.querySelector('.fa').classList.remove('fa-eye-slash');
                btnPassword.querySelector('.fa').classList.add('fa-eye');
                mouseUpSpan(inputPassword.querySelector('.password-text'));
            }

        });
        btnPassword.addEventListener("mouseup", function (e){
            let inputValue = inputPassword.querySelector('input[type="password"]').value;
            span = inputPassword.querySelector('.password-text');
            if (span != null){
                span.remove();
            }
            if (inputValue !== ''){
                btnPassword.querySelector('.fa').classList.remove('fa-eye');
                btnPassword.querySelector('.fa').classList.add('fa-eye-slash');
            }
        });

    }
}
function mouseUpSpan(div) {
    let inputPassword = document.querySelector('.password-input'),
        btnPassword = inputPassword.querySelector('.password-btn');
    div.addEventListener("mouseup", function (e){
        div.remove();
        btnPassword.querySelector('.fa').classList.remove('fa-eye');
        btnPassword.querySelector('.fa').classList.add('fa-eye-slash');
    });
}

document.addEventListener("DOMContentLoaded", function () {
    showHidePassword();
});