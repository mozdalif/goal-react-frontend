import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { loginThunk, reset } from '../features/auth/authSlice'


function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading,
    isSuccess,
    isError,
    errMsg } = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginThunk(formData))
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
  }, [isError, errMsg, isSuccess, navigate, dispatch, reset])

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
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
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

            <button type='submit' className='btn btn-block'>
              Submit
            </button>


          </div>

        </form>
      </section>
    </>
  )
}

export default Login
