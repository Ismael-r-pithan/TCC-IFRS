'use client'

import Link from "next/link";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Header } from "./Header";
import Image from "next/image";

import logo from '../assets/logo.png'

const createQuizzFormSchema = z.object({
  name: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
  time: z.number().min(1, {message: 'O valor mínimo é de 1 minuto'})
})

type CreateQuizzFormInputs = z.infer<typeof createQuizzFormSchema>

export function CreateQuizz() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<CreateQuizzFormInputs>({
    resolver: zodResolver(createQuizzFormSchema),
  })

  async function handleLogin(data: CreateQuizzFormInputs) {
    // await signIn(data)

  }
  return (
    <div className='flex flex-col'>
      <Header />
      <main className="flex flex-col items-center mt-40 gap-10">
        <h1 className='text-white text-4xl'>Crie aqui seu QuizzIFy</h1>
        <Image
          src={logo}
          alt=''
          width={200}
          height={200}
          className="mt-8"
          priority={true}
        />
        <form className="flex flex-col gap-4">
        <input
          className='w-96 p-2 flex-1 bg-gray-400 rounded-md text-white placeholder:text-gray-100'
          type="text"
          placeholder='Informe um nome para o quizz'
          {...register('name')}
        />
        <input
          className='w-96 p-2 flex-1 bg-gray-400 rounded-md text-white placeholder:text-gray-100'
          type="number"
          placeholder='Informe a duração em minutos'
          {...register('time')}
        />
        <button className='w-96 p-2 flex-1 bg-green-900 rounded-md text-white hover:bg-green-800'>
          Ir para a criação de questões
        </button>

        </form>
      </main>
    </div>
  )
}