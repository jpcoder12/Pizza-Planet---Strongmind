const changeLabel = () => {
    document.querySelector("#js-test").innerHTML = document.querySelector("#js-input").value
}

const adminControlKey = () => {
    let option_val = document.querySelector("#select-type").value
    if (option_val == 'Owner'){
        document.querySelector('#admin-key').style.display = "inline"
        document.querySelector('#admin-key').required = true;
    }
    else {
        document.querySelector('#admin-key').style.display = "none"
        document.querySelector('#admin-key').removeAttribute('required')

    }
}