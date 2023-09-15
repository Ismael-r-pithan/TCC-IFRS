'use client'

import Image from 'next/image'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import logo from '../assets/logo.png'
import Link from 'next/link';

const signUpFormSchema = z.object({
  email: z.string().email({message: 'Email inválido'}).nonempty({message: 'O campo email não pode estar vazio'}),
  password: z.string().nonempty({message: 'O campo senha não pode estar vazio'}),
  confirmPassword: z.string().nonempty({message: 'O campo senha não pode estar vazio'}),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      path: ['confirmPassword'],
      message: 'As senhas não correspondem',
    })
  }
})

type SignInFormInputs = z.infer<typeof signUpFormSchema>

export default function SignUp() {

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<SignInFormInputs>({
    resolver: zodResolver(signUpFormSchema),
  })

  async function handleRegister(data: SignInFormInputs) {
    // await signIn(data)

  }

  return (
    <div className='flex flex-col items-center mt-20'>
      <h1 className='text-white text-4xl'>Crie sua conta QuizzIFy</h1>
      <Image
        src={logo}
        alt=''
        width={200}
        height={200}
        className="mt-8"
        priority={true}
      />

      <form className='flex flex-col mt-10 gap-4 h-40' onSubmit={handleSubmit(handleRegister)}>
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
        <input
          className='w-96 p-2 flex-1 bg-gray-400 rounded-md text-white placeholder:text-gray-100'
          type="password"
          placeholder='Confirme sua Senha'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>}
        <button className='w-96 p-2 flex-1 bg-green-900 rounded-md text-white hover:bg-green-800'>Entrar</button>
      </form>

      <Link className='flex justify-center w-96 p-2 flex-1 bg-gray-400 rounded-md mt-80 text-white hover:bg-gray-300' href='/'>Voltar para o login</Link>
      
    </div>
  )
}