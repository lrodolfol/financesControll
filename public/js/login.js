const formLogin = document.querySelector('[data-formLogin]')
const message = formLogin.querySelector('[data-message-submit]')

formLogin.addEventListener('submit', function (event) {
    if (!validateForm(formLogin)) {
        messageFormErro('Oops, you need to fill the form')       

        event.preventDefault()
    } 


    /*
    const username = formLogin.querySelector('[data-username]').value
    const password = formLogin.querySelector('[data-password]').value

    loginApi({username, password})
    */
})

/*REMOVE MESSAGE FORM*/
formLogin.addEventListener('click', (event) => {
    message.innerHTML = ''
    message.classList.add('sr-only')
    message.classList.remove('error')
    message.classList.remove('success')
})

/*VALIDATE LOGIN FORM*/
function validateForm(form) {
    //MAKE NODELIST TO ARRAY. THEN.. FOREACH
    const inputsNode = form.querySelectorAll('input')
    const inputsArray = Array.prototype.slice.call(inputsNode, 0);

    let userName = ''
    let passWord = ''

    inputsArray.forEach(function (input) {
        userName = form.querySelector('[data-username]').value
        passWord = form.querySelector('[data-username]').value
    });

    if (typeof userName === 'string' && userName.length > 0) {
        return true
    }
    return false


}

/*CONSULTER API FOR LOGIN*/
let result;
async function loginApi(user) {
    result = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    const { status } = result; 
    if(status === 200) {
        console.log('Login success')
        window.location.href = "/dashboard"
    }else if(status === 500) {
        messageFormErro('Sorry, we have an error =( Try again later')        
    }else{
        messageFormErro('Oops, your data was not valid. Try again ;)')
    }
}

/*SET MESSAGE FORM ERROR*/
function messageFormErro(stringMessage) {
    message.innerHTML = stringMessage
    message.classList.remove('sr-only')
    message.classList.add('error')
}