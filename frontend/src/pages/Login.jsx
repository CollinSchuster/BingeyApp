import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import styled from 'styled-components'
// import '../css/login.css'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password} = formData

  const navigate = useNavigate() 
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector
  (
    (state) => state.auth
  )
  console.log(user)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    if(isSuccess || user) {
      navigate('/home')
    }
    dispatch(reset())
  }, [user,isError,isSuccess,message,navigate,dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // whatever you type in for the name gets put to your name
    })) // wrap the curly braces in the parenthesis because we want the form to be an object
  }
  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <LoginStyled>
      <div className='login-container'>
            <section className='login-heading'>
              <div className='heading-icon'></div>
                <h1> <FaSignInAlt />Login</h1>
              <p>Please enter your login information</p>
            </section>
            <section className='form'>
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <p>
                  <input 
                    type="email" 
                    className="form-control" 
                    id='email' 
                    name='email' 
                    value={email} 
                    placeholder='Enter your email' 
                    onChange={onChange} />
                  </p>
                </div>
                <div className='form-group'>
                  <p>
                    <input 
                      type="password" 
                      className="form-control" 
                      id='password' 
                      name='password' 
                      value={password} 
                      placeholder='Enter password' 
                      onChange={onChange} />
                  </p>
                </div>
                <div className="form-group">
                  <button type='submit' className='btn btn-block'>
                    <p>Submit</p>
                  </button>
                </div>
              </form>
            </section>
      </div>
    </LoginStyled>
  )
}

const LoginStyled = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.App {
  text-align: center;
}


.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
.login-container {
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensure the container takes up at least the full viewport height */
  margin-top:-25%;
}

.login-heading {
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
}
.login-heading h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
}

.form {
  max-width: 400px; /* Adjust the max-width as needed */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 20px; /* Add some spacing between the login-heading and the form */
}


.login-heading p {
  color: #828282;
}

.form,
.content {
  width: 70%;
  margin: 1vh auto;
}


.form-group {
  margin-bottom: 10px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin-bottom: 10px;
  font-family: inherit;
}

.form-group label {
  text-align: left;
  display: block;
  margin: 0 0 5px 3px;
}

h1,
h2,
h3 {
  font-family: 'Poppins', sans-serif;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-content: center;
  font-weight: 600;
}

.heading-icon {
  font-size: large;
}
p, .form-control{
  font-family: 'Poppins', sans-serif;
}


@media (max-width: 600px) {
  .form {
    width: 90%;
  }

  .login-heading h1 {
    font-size: 1rem;
  }

  .login-heading p {
    font-size: 1.5rem;
  }
}


`

export default Login