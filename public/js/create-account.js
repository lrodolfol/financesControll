console.log('ola mundo')

const formCreateAccount = document.querySelector('[data-formCreateAccount]')
const message = formCreateAccount.querySelector('[data-message-submit]')

formCreateAccount.addEventListener('submit', function (event) {
    event.preventDefault()
    const user = validateForm(formCreateAccount)
    if (!user) {
        messageFormErro('Oops, you need to fill all form... :) ')
        return
    }

    loginApi({
        "username": user.username,
        "email": user.email,
        "password": user.password,
        "terms": "on"
    })

    return
})

/*REMOVE MESSAGE FORM*/
formCreateAccount.addEventListener('click', (event) => {
    message.innerHTML = ''
    message.classList.add('sr-only')
    message.classList.remove('error')
    message.classList.remove('success')
})

/*VALIDATE LOGIN FORM*/
function validateForm(form) {
    const inputs = form.querySelectorAll('input')
    
    let i = 0;
    let user = {}
    let success = true;
    while (i < inputs.length) {
        user[inputs[i].name] = inputs[i].value
        if (inputs[i].value.length <= 0) {
            inputs[i].classList.add('invalid')
            success = false
        }
        i++
    }

    if(user.password !== user.repassword) {
        inputs[2].classList.add('invalid')
        inputs[3].classList.add('invalid')
        success = false
    }

    return success ? user : false
}

/*CONSULTER API FOR LOGIN*/
let result;
async function loginApi(user) {
    console.log(user)

    /* ====QUICK FIX===== 
    API BACK DONT WORK TO CREATE DATABASE FOR THEN CREATE THE TABLES. 
    MESSAGE: TABLES NOT FOUND*/
    for(let i = 0; i <= 1; i ++) {
        result = await fetch('http://localhost:8080/account/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    
        const { status } = result;
        console.log(status)
    
        if (status === 201) {
            console.log('Account has been created')
            messageFormSuccess('Yeap! your account has been created successfully!')
        } else if (status === 500) {
            messageFormErro('Sorry, we have an error =( Try again later')
        } else {
            messageFormErro('Oops, your data was not valid. Try again ;)')
        }
    }
    
}

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