import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../features/auth/authActions'
import { useEffect } from 'react'
import Spinner from '../../components/Spinner'
import Error from '../../components/Error'

function AdminLogin() {
      const { loading, userInfo, error } = useSelector((state) => state.auth)
      const dispatch = useDispatch()
    
      const { register, handleSubmit } = useForm()
    
      const navigate = useNavigate()
    
      // redirect authenticated user to profile screen
      useEffect(() => {
        if (userInfo) {
          navigate('/dashboard')
        }
      }, [navigate, userInfo])
    
      const submitForm = (data) => {
        dispatch(userLogin(data))
      }
    
      return (
        <form onSubmit={handleSubmit(submitForm)}>
          {error && <Error>{error}</Error>}
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
          <button type='submit' className='button' disabled={loading}>
            {loading ? <Spinner /> : 'Login'}
          </button>
        </form>
      )
}

export default AdminLogin