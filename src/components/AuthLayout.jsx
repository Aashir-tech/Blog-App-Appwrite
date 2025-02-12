import React , {useState , useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const Protected = ({children , authentication = true}) => {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const [loader , setLoader] = useState(true);

    useEffect(() => {
        console.log(loader);
        // setLoader(true)

        // Todo :  make it more easy to understand

        // if(authStatus === true) {
        //     navigate('/')
        // } else if(authStatus === false) {
        //     navigate('/login')
        // }
        // false && false
        if(authentication && authStatus !== authentication) {
            navigate('/login')
        } else if(!authentication && authStatus !== authentication) {
            navigate('/')
        } else {
            setLoader(false);
        }

    } , [authentication , authStatus , navigate])

  return loader ? <h1>...loading</h1> : <>{children}</>
}

export default Protected