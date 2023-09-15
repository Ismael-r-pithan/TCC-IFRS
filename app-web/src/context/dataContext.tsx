'use client'

import api from '@/lib/api';
import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation';


interface usersProps {
  username: string;
  email: string;
  avatar: string | null;
}

type SignInCredentials = {
  email: string;
  password: string;
}

interface UsersProviderProps {
  children: ReactNode
}

interface UsersContextType {
  signIn(credentials: SignInCredentials): Promise<boolean>;
  userProfile: usersProps | null;
}

export const DataContext = createContext({} as UsersContextType)

export function DataProvider({children}: UsersProviderProps) {
  const router = useRouter()

  const [userProfile, setUserProfile] = useState<usersProps | null>(null)
  // async function registerUser(data: usersProps) {
  //   const { name, user, birthDate, email, password } = data
  //   const newUser = {
  //     name,
  //     username: user,
  //     birthDate,
  //     email,
  //     password,
  //     profilePhoto: "",
  //   }
  //   await api.post('/users', newUser)
  // }

  // PRECISA FAZER UM USE EFFECT PARA TRAZER OS DADOS DE UMA ROTA /ME DO BACK-END
  // async function fetchData() {
  //   await api.get('/me')
  // }
  // useEffect(() => {
  //   // exemplo
  //   fetchData()
  // }, [])

  async function signIn({ email, password}: SignInCredentials) {
    
    try {
      const response = await api.post('/login', {email, password})
      const data = response.data
      Cookie.set("Quizzify.authToken", data.token, {expires: 1})

      setUserProfile({
        username: data.user.username,
        email: data.user.email,
        avatar: data.user.avatar,
      })
      router.push('/rooms')
      return true
    } catch (error) {
      return false
    }
  }


  return (
    <DataContext.Provider value={{ signIn, userProfile }}>
      {children}
    </DataContext.Provider>
  )
}