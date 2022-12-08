import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const Login = () => {

  const [loginForm, setLoginForm] = useState ({email: '', password: ''})
  const [failedSubmit, setFailedSubmit] = useState (false);
  const [canSubmit, setCanSubmit] = useState (false) 
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(''); 

  // handle change for writing out inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.currentTarget
    setLoginForm ({...loginForm, [id]: value})
  } 

      // validate email and set errors
      const ValidateEmail = () => {
        let error = '';
        const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
        if (loginForm.email === ''){
            error = "You need to enter an email adress"
        }
        else if (!regExEmail.test(loginForm.email)) {
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

        if (loginForm.password === ''){
            error = "You need to enter a password"
        }
        else if (loginForm.password.length < 8){
            error = "Your Password Need at least eight charracters"
        }
        else if (!regExLowerCase.test(loginForm.password)){
            error = "Your Password Need at least one lowercase letter"
        }
        else if (!regExUpperCase.test(loginForm.password)){
            error = "Your Password Need at least one uppercase letter"
        }
        else if (!regExNumber.test(loginForm.password)){
            error = "Your Password Need at least one number"
        }
        else if (!regExSpecialCharacter.test(loginForm.password)){
            error = "Your Password Need at least one Special character"
        }

        setPasswordError(error);
        return error === '' ? true : false;
    }


  const ValidateOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let validEmail = ValidateEmail();
    let validPassword =  ValidatePassword();

    setFailedSubmit (false)
    
    e.preventDefault()

    if(validEmail === true && validPassword === true){

        // submit to api init
        let json = JSON.stringify({ "email":loginForm.email, "password":loginForm.password})

        setLoginForm ({email: '', password: ''})
        setEmailError ('')
        setPasswordError ('')

        const result = await fetch ('http://localhost:5000/api/athentication/signin', {
            method: 'post', 
            headers: {
              'Content-Type':'application/json'
            },
            body: json
        })

        const data = await result.json()

        // if submit success/failed
        if (await result.status === 200) {
          console.log(data.accessToken)
            localStorage.setItem('accessToken', data.accessToken)

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
                <p>You are now logged in.</p>
            </div>
      }

      {
        // message when submittion failed
        failedSubmit &&
            <div className="alert alert-danger text-center submitted-comment-fail" role="alert">
                <h2>Oops!</h2>
                <p>Something went Wrong. We couldn't log you in right now.</p>
            </div>
      }

      <form onSubmit={ValidateOnSubmit} noValidate className="form">
        <h2 className="title">Log In</h2>
 
        <input className={`${emailError === "" ? "" : "error"}`} id="email" type="email" placeholder='Your Mail' value={loginForm.email} onKeyUp={ValidateEmail} onChange={handleChange}/>
        <div className="error-message centered-error">{emailError}</div>

        <input className={`${passwordError === "" ? "" : "error"}`} type='password' id="password" placeholder='password' value={loginForm.password} onKeyUp={ValidatePassword} onChange={handleChange}></input>
        <div className="error-message centered-error">{passwordError}</div>

        <button type="submit" className="button theme-button mt-3">Log In</button>
      </form>

      <div className="form mt-5">
        <h5 className="title">Not Registered?</h5>
        <p className='mt-2'> Click Here To Register And join Us Today!</p>
        <NavLink to="/signup" className="button theme-button mt-3">Join</NavLink>
      </div>
    </div>
  )
}

export default Login