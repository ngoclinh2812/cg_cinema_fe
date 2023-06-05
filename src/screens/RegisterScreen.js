import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from '../components/Error'
import Spinner from '../components/Spinner'
import { registerUser } from '../features/auth/authActions'

const RegisterScreen = () => {
  const [customError, setCustomError] = useState(null)

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/user-profile')
    // redirect user to login page if registration was successful
    if (success) navigate('/login')
  }, [navigate, userInfo, success])

    const submitForm = (data) => {
        // check if passwords match
        if (data.password !== data.confirmPassword) {
            setCustomError('Password mismatch')
            return
        }

        const accountData = {
            id: null,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            username: data.username, // Not available in the form
            password: data.password,
        }

        dispatch(registerUser(accountData))
    }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
        <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input
                  type='text'
                  className='form-input'
                  {...register('username')}
                  required
              />
          </div>
        <div className='form-group'>
            <label htmlFor='firstName'>First Name</label>
            <input
                type='text'
                className='form-input'
                {...register('firstName')}
                required
            />
        </div>
        <div className='form-group'>
            <label htmlFor='lastName'>Last Name</label>
            <input
                type='text'
                className='form-input'
                {...register('lastName')}
                required
            />
        </div>
        <div className='form-group'>
            <label htmlFor='phone'>Phone</label>
            <input
                type='text'
                className='form-input'
                {...register('phone')}
                required
            />
        </div>
        <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
                type='email'
                className='form-input'
                {...register('email')}
                required
            />
        </div>
        <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                className='form-input'
                {...register('password')}
                required
            />
        </div>
        <div className='form-group'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
                type='password'
                className='form-input'
                {...register('confirmPassword')}
                required
            />
        </div>

      <button type='submit' className='button' disabled={loading}>
        {loading ? <Spinner /> : 'Register'}
      </button>
    </form>
  )
}

export default RegisterScreen
