
import { useEffect, useState } from 'react'
import './App.css'
// import configData from './config/config'
import { login , logout } from './store/authSlice'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import { Footer, Header } from './components'
import {Outlet} from 'react-router-dom'
import WebFont from 'webfontloader'
import {RotatingLines} from 'react-loader-spinner'



function App() {
      const [loading , setLoading ] = useState(true)
      const dispatch = useDispatch()
    
      useEffect(() => {
          WebFont.load({
            google: {
              families: ["Roboto", "Droid Sans", "Chilanka", "Open Sans", "Poppins"],
            },
          });

        authService.getCurrentUser()
          .then((userData) => {
            if(userData) {
              dispatch(login({userData}))
            } else {
              dispatch(logout())
            }
          })
          .finally(() => setLoading(false) )
      } ,[])

      return !loading ? (
        <div className='min-h-screen flex flex-wrap content-between bg-gray-400 font-customFont'>
            <div className='w-full block'>
              <Header />

                <main>
                  <Outlet />
                </main>

              <Footer />

            </div>
          </div>
      ) : <div className='flex justify-center items-center h-screen'>
            <RotatingLines 
              visible = {true}
              height= "90"
              width='50'
              color='blue'
              strokeWidth='5'
              strokeColor='blue'
              animationDuration='0.75'
              ariaLabel='rotating-lines-loading'
            />
      </div>
}

export default App
