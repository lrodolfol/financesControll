console.log('ola mundo')
const form = document.querySelector('[data-formDebit]')
const message = form.querySelector('[data-message-submit]')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const debit = validateForm(form)
    if (! debit) {
        messageFormErro('Oops, you need to fill all form... :) ')
        return
    }

    loginApi(debit)
})

function validateForm(form) {
    const inputs = form.querySelectorAll('input')
    let success = true;
    let debit = {}
    for (let i = 0; i < inputs.length; i++) {
        debit[inputs[i].name] = inputs[i].value
        if (inputs[i].value.length <= 0) {
            inputs[i].classList.add('invalid')
            success = false
        }
    }

    return success ? debit : false
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

/*CONSULTER API FOR NEW debit*/
let result;
async function loginApi(debit) {

    result = await fetch('http://localhost:8080/debit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(debit)
    })

    const { status } = result;
    console.log(status)

    if (status === 201) {
        messageFormSuccess('All richet, the money flew!')
    } else if (status === 500) {
        messageFormErro('Sorry, we have an error =( Try again later')
    } else {
        messageFormErro('Oops, your data was not valid. Try again ;)')
    }


}