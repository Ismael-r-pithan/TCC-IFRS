'use client'

import Image from 'next/image'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from 'next/link';

import logo from '../assets/logo.png'

const signInFormSchema = z.object({
  email: z.string().email({message: 'Email inválido'}).nonempty({message: 'O campo email não pode estar vazio'}),
  password: z.string().nonempty({message: 'O campo senha não pode estar vazio'}),
})

type SignInFormInputs = z.infer<typeof signInFormSchema>

export default function SignIn() {

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInFormSchema),
  })

  async function handleLogin(data: SignInFormInputs) {
    // await signIn(data)

  }

  return (
    <div className='flex flex-col items-center mt-20'>
      <h1 className='text-white text-4xl'>Bem vindo ao QuizzIFy</h1>
      <Image
        src={logo}
        alt=''
        width={200}
        height={200}
        className="mt-8"
        priority={true}
      />

      <h2 className='text-white text-2xl mt-10'>Acesse sua conta</h2>
      <form className='flex flex-col gap-4 mt-4 h-40' onSubmit={handleSubmit(handleLogin)}>
        <input
          className='w-96 p-2 flex-1 bg-gray-400 rounded-md text-white placeholder:text-gray-100'
          type="text"
          placeholder='Informe seu Email'
          {...register('email')}
        />
        {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        <input
          className='w-96 p-2 flex-1 bg-gray-400 rounded-md text-white placeholder:text-gray-100'
          type="password"
          placeholder='Informe sua Senha'
          {...register('password')}
        />
        {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
        <button className='w-96 p-2 flex-1 bg-green-900 rounded-md text-white hover:bg-green-800'>Entrar</button>
      </form>
      
      <div className='flex flex-col flex-1 w-96 mt-60 gap-2'>
        <h3 className='text-white text-center'>Ainda não possui conta?</h3>
        <Link className='flex justify-center w-96 p-2 flex-1 bg-gray-400 rounded-md text-white hover:bg-gray-300' href='/'>Criar conta</Link>
      </div>

    </div>
  )
}