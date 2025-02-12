import React from 'react'
import { Login as LoginComponent , Container} from '../components'

const Login = () => {
  return (
    <div className='py-8'>
        <Container>
            <LoginComponent />
        </Container>
    </div>
  )
}

export default Login