import axios from 'axios';
const BASE_URL = "https://brivity-react-exercise.herokuapp.com"


export function signUp(payload, setUserInfo, navigate) {
    setUserInfo({ isLoading: true })
    const URL = `${BASE_URL}/users`
    axios.post(URL, payload)
        .then((res) => {
            setUserInfo({ isLoading: false, error:null, ...res })
            navigate('/signin')
        })
        .catch((err) => {
            console.log('----signup error', err.response.data.errors)
            setUserInfo({ isLoading: false, error: err })
        })

}


export function  signIn (payload,setUserInfo,navigate) {
    setUserInfo({ isLoading: true })

    const URL = `${BASE_URL}/users/sign_in`

    axios.post(URL, payload)
        .then((res) => {
            localStorage.setItem('Authorization', res.headers.authorization)
            setUserInfo({ isLoading: false, isAuthenticated:true, error:null, ...res.data, ...res.headers})
            navigate('/dashboard')
        })
        .catch((err) => {
            console.log('----signin error', err.response.data.error)
            setUserInfo({ isLoading: false, error: err })
        })

}
