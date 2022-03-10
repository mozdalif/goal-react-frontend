import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { registerThunk, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading,
    isSuccess,
    isError,
    errMsg } = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const onSubmit = (e) => {
    e.preventDefault()
    if (formData.password === formData.password2) {
      dispatch(registerThunk({ name: formData.name, email: formData.email, password: formData.password }))
    } else {
      toast.error('Password dont match')
    }

  }
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  useEffect(() => {
    if (isError) {
      toast.error(errMsg)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())

  }, [isError, isSuccess, navigate, dispatch, reset, errMsg])
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>

      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text"
              className="form-control"
              name='name'
              value={formData.name}
              onChange={onChange}
              placeholder='Enter Name'
            />
            <input type="email"
              className="form-control"
              name='email'
              value={formData.email}
              onChange={onChange}
              placeholder='Enter email'
            />
            <input type="password"
              className="form-control"
              name='password'
              value={formData.password}
              onChange={onChange}
              placeholder='Enter password'
            />
            <input type="password"
              className="form-control"
              name='password2'
              value={formData.password2}
              onChange={onChange}
              placeholder='Confirm password'
            />

            <button type='submit' className='btn btn-block'>
              Submit
            </button>


          </div>

        </form>
      </section>
    </>
  )
}

export default Register
