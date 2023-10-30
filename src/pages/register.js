import { useState } from 'react'
import Layout from "../components/layout";
import { onRegistration } from '../api/auth';

const Register = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try{
      const {data}= await onRegistration(values)

      setError('')
      setSuccess(data.message)
      setValues({ email: '', password: ''})
    } catch (error) {
      console.log(error.response.data.error[0].msg)
      setError(error.response.data.error[0].msg)
      setSuccess('')
    }
  }


// console.log(values)
    return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
        <h1>Register</h1>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input 
            onChange={(e) => onChange(e)}
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={values.email}
            placeholder='test@gmail.com'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='from-label'>
            Password
          </label>
          <input 
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            className='form-control'
            id='password'
            name='password'
            placeholder='password'
            required
          />
        </div>

        <div style={{ color: 'red', margin: '10px 0'}}>{error}</div>
        <div style={{ color: 'green', margin: '10px 0'}}>{success}</div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </Layout>
    )
  }
  
  export default Register;