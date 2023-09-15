'use client'

import Link from "next/link";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Image from "next/image";

import logo from '../../../../../../assets/logo.png'
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const createQuizzFormSchema = z.object({
  name: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
})

type CreateQuizzFormInputs = z.infer<typeof createQuizzFormSchema>

export default function CreateQuizz({ params }:any) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<CreateQuizzFormInputs>({
    resolver: zodResolver(createQuizzFormSchema),
  })

  const router = useRouter()

  async function handleCreateQuizz(data: CreateQuizzFormInputs) {
    const response = await api.post(`/rooms/${params.roomId}/quizzes/`, data)
    router.push(`/rooms/my-rooms/${params.roomId}/all-quizzes/create-quizz/${response.data.codigo}/create-questions`)
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateQuizz)}>
        <input
          className='w-96 p-2 flex-1 bg-gray-400 rounded-md text-white placeholder:text-gray-100'
          type="text"
          placeholder='Informe um nome para o quizz'
          {...register('name')}
        />

        <button className='w-96 p-2 flex-1 bg-green-900 rounded-md text-white hover:bg-green-800'>
          Ir para a criação de questões
        </button>

        </form>
      </main>
    </div>
  )
}