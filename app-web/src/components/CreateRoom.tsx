'use client'

import Link from "next/link";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Header } from "./Header";
import Image from "next/image";

import logo from '../assets/logo.png'

const createRoomFormSchema = z.object({
  roomId: z.string().nonempty({message: 'Este campo não pode ser vazio'})
})

type CreateRoomFormInputs = z.infer<typeof createRoomFormSchema>

export function CreateRoom() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<CreateRoomFormInputs>({
    resolver: zodResolver(createRoomFormSchema),
  })

  async function handleLogin(data: CreateRoomFormInputs) {
    // await signIn(data)

  }
  return (
    <div className='flex flex-col'>
      <Header />
      <main className="flex flex-col items-center mt-40 gap-10">
      <h1 className='text-white text-4xl w-72 text-center'>Crie ou selecione uma turma</h1>
        <Image
          src={logo}
          alt=''
          width={200}
          height={200}
          className="mt-8"
          priority={true}
        />
        <div className="flex flex-col gap-4">
          <Link className='text-center w-96 p-2 flex-1 bg-green-900 rounded-md text-white hover:bg-green-800' href=''>Criar Turma</Link>
          <Link className='text-center w-96 p-2 flex-1 bg-green-900 rounded-md text-white hover:bg-green-800' href=''>Selecionar Turma</Link>
        </div>

        <form className="flex flex-col gap-4">
        <input
          className='w-96 p-2 flex-1 bg-gray-400 rounded-md text-white placeholder:text-gray-100'
          type="text"
          placeholder='Informe o código da sala'
          {...register('roomId')}
        />
        <button className='w-96 p-2 flex-1 bg-green-900 rounded-md text-white hover:bg-green-800'>Entrar</button>

        </form>
      </main>
    </div>
  )
}