import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import styles from '../css/login.module.css'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/home');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles['login-page-container']}>
      <div className={styles['login-container']}>
      <section className={styles['login-heading']}>
        <div className={styles['heading-icon']}></div>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please enter your login information</p>
      </section>
      <section className={styles['form']}>
        <form onSubmit={onSubmit}>
          <div className={styles['form-group']}>
            <p className='text-box'>
              <input
                type="email"
                className={styles['form-control']}
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </p>
          </div>
          <div className={styles['form-group']}>
            <p>
              <input
                type="password"
                className={styles['form-control']}
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </p>
          </div>
          <div className={styles['form-group']}>
            <button type="submit" className={styles['btn']}>
              <p>Submit</p>
            </button>
          </div>
        </form>
      </section>
    </div>
    </div>
  );
}

export default Login;
