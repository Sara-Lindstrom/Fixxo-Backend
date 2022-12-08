import React, { useState } from 'react'

const Register = () => {
    // useStates for validation
    const [registerForm, setRegisterForm] = useState ({name: '', email: '', password: ''})
    const [canSubmit, setCanSubmit] = useState (false)  

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [failedSubmit, setFailedSubmit] = useState (false);
    
    // validate name and set errors
    const ValidateName = () => {
        let error = '';
        const regExName = /^[a-zA-ZäöåÄÖÅ ]+$/;

        if (registerForm.name === ''){
            error = "You need to enter a name"
        }
        else if (registerForm.name.length < 2){
            error ="your name must be at least two characters long"
        }
        else if (!regExName.test(registerForm.name)){
            error = "your name can only contain letters"
        }

        setNameError(error);

        return error === '' ? true : false;
    }

    // validate email and set errors
    const ValidateEmail = () => {
        let error = '';
        const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
        if (registerForm.email === ''){
            error = "You need to enter an email adress"
        }
        else if (!regExEmail.test(registerForm.email)) {
            error = "You need to enter a valid email (eg. exempel@domain.com)"
        }

        setEmailError(error);
        return error === '' ? true : false;
    }


    // validate password and set errors
    const ValidatePassword = () => {
        let error = '';
        const regExLowerCase = /[a-zåäö]+/
        const regExUpperCase = /[A-ZÅÄÖ]+/;
        const regExNumber = /[0-9]+/;
        const regExSpecialCharacter = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;

        if (registerForm.password === ''){
            error = "You need to enter a password"
        }
        else if (registerForm.password.length < 8){
            error = "Your Password Need at least eight charracters"
        }
        else if (!regExLowerCase.test(registerForm.password)){
            error = "Your Password Need at least one lowercase letter"
        }
        else if (!regExUpperCase.test(registerForm.password)){
            error = "Your Password Need at least one uppercase letter"
        }
        else if (!regExNumber.test(registerForm.password)){
            error = "Your Password Need at least one number"
        }
        else if (!regExSpecialCharacter.test(registerForm.password)){
            error = "Your Password Need at least one Special character"
        }

        setPasswordError(error);
        return error === '' ? true : false;
    }
    
    // handle change for writing out inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.currentTarget
        setRegisterForm ({...registerForm, [id]: value})
    }   
    
    // validate if input is error free
    const ValidateOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        let validName = ValidateName();
        let validEmail = ValidateEmail();
        let validPassword =  ValidatePassword();

        setFailedSubmit (false)
        
        e.preventDefault()

        if(validName === true && validEmail === true && validPassword === true){

            // submit to api init
            let json = JSON.stringify({"name":registerForm.name, "email":registerForm.email, "password":registerForm.password})

            setRegisterForm ({name: '', email: '', password: ''})
            setNameError ('')
            setEmailError ('')
            setPasswordError ('')

            const result = await fetch ('http://localhost:5000/api/athentication/signup', {
                method: 'post', 
                headers: {
                    'Content-Type':'application/json'
                },
                body: json
            })

            // if submit success/failed
            if (await result.status === 201) {
                setCanSubmit (true)
                setFailedSubmit (false)
            }
            else {
                setCanSubmit (false)
                setFailedSubmit (true)
            }

        }
        else{
            setCanSubmit (false)
        }
    };

  return (
    <div className='form-container'>
            {
            // message when submittion success
            canSubmit &&
                <div className="alert alert-success text-center submitted-comment" role="alert">
                    <h2>Welcome!</h2>
                    <p>You are now registered.<br/> Log in to se your orders.</p>
                </div>
        }

        {
            // message when submittion failed
            failedSubmit &&
                <div className="alert alert-danger text-center submitted-comment-fail" role="alert">
                    <h2>Oops!</h2>
                    <p>Something went Wrong. We couldn't register you right now.</p>
                </div>
        }

        <form onSubmit={ValidateOnSubmit} noValidate className="form">
            <h2 className="title">Register</h2>

            <input className={`${nameError === "" ? "" : "error"}`} id="name" type="text" placeholder='Your First Name' value={registerForm.name} onKeyUp={ValidateName} onChange={handleChange}/>
            <div className="error-message centered-error">{nameError}</div>

            <input className={`${emailError === "" ? "" : "error"}`} id="email" type="email" placeholder='Your Mail' value={registerForm.email} onKeyUp={ValidateEmail} onChange={handleChange}/>
            <div className="error-message centered-error">{emailError}</div>

            <input className={`${passwordError === "" ? "" : "error"}`} type='password' id="password" placeholder='password' value={registerForm.password} onKeyUp={ValidatePassword} onChange={handleChange}></input>
            <div className="error-message centered-error">{passwordError}</div>

            <button type="submit" className="button theme-button mt-3">Register</button>

        </form>
    </div>
  )
}

export default Register