const form = document.querySelector('[data-formCredit]')
const message = form.querySelector('[data-message-submit]')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const credit = validateForm(form)
    if (! credit) {
        messageFormErro('Oops, you need to fill all form... :) ')
        return
    }

    loginApi(credit)
})

function validateForm(form) {
    const inputs = form.querySelectorAll('input')
    let success = true;
    let credit = {}
    for (let i = 0; i < inputs.length; i++) {
        credit[inputs[i].name] = inputs[i].value
        if (inputs[i].value.length <= 0) {
            inputs[i].classList.add('invalid')
            success = false
        }
    }

    return success ? credit : false
}

/*REMOVE MESSAGE FORM*/
form.addEventListener('click', (event) => {
    message.innerHTML = ''
    message.classList.add('sr-only')
    message.classList.remove('error')
    message.classList.remove('success')
})

/*SET MESSAGE FORM ERROR*/
function messageFormErro(stringMessage) {
    message.innerHTML = stringMessage
    message.classList.remove('sr-only')
    message.classList.add('error')
}
/*SET MESSAGE FORM SUCCESS*/
function messageFormSuccess(stringMessage) {
    message.innerHTML = stringMessage
    message.classList.remove('sr-only')
    message.classList.add('success')
}

/*CONSULTER API FOR NEW CREDIT*/
let result;
async function loginApi(credit) {

    result = await fetch('http://localhost:8080/credit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credit)
    })

    const { status } = result;
    console.log(status)

    if (status === 201) {
        messageFormSuccess('uhul, money in the account!')
    } else if (status === 500) {
        messageFormErro('Sorry, we have an error =( Try again later')
    } else {
        messageFormErro('Oops, your data was not valid. Try again ;)')
    }


}