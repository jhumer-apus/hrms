'use client';

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import api from '@/utils/axios-config'
import axios from 'axios';

interface Props {
    middleware: 'auth' | 'guest'
    redirectIfAuthenticated?: string
}
const useAuth = (props: Props) => {

    const {middleware, redirectIfAuthenticated} = props
    const router = useRouter()
    const params = useParams()

    const [user , setUser] = useState<any>(null)
    const [error, setError] = useState<any>(null)

    const csrf = () => axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/sanctum/csrf-cookie')

    const fetchUser = async() => {

        await api.get('user')
            .then(res => setUser((curr:any) => res.data))
            .catch(error => setError((curr:any) => error))
    }

    const login = async (username:string, password:string) => {
        await csrf()

        const payload = {
            username: username,
            password: password
        }

        await api.post('login', payload)
            .then(() => fetchUser())
            .catch(error => {
                console.error(error)
                setError(error.response.data.errors)
            })

    }

    const logout = async () => {
        if (!error) {
            await api.post('logout').then(() => fetchUser)
        }
        window.location.pathname = '/login'
    }

    useEffect(() => {

        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)

        if (middleware === 'auth' && error) logout()

    }, [user, error])
    
    useEffect(() => {

        fetchUser()

    }, [])

    return {
        user,
        login,
        logout,
        error
    }
}

export default useAuth