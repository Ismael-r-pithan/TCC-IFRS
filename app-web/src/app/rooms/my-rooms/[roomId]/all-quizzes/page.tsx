'use client'

import Image from "next/image";
import Link from "next/link";

import logo from '../../../../../assets/logo.png'
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/router";

interface quizzProps {
  codigo: string;
  name: string;
}

export default function AllQuizzes({ params }: any) {

  const [quizzes, setQuizzes] = useState<quizzProps[] | null>()

  async function fetchData() {
    const response = await api.get(`/rooms/${params.roomId}/quizzes`)
    const quizzes: quizzProps[] = response.data
    setQuizzes(quizzes)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='flex flex-col'>
      <Header />
      <main className="flex flex-col items-center mt-40 gap-10">
        <h1 className='text-white text-4xl w-72 text-center'>Quizzes da Turma</h1>

        {/* TODO: Trazer dados da turma */}
        {/* <h1 className='text-white text-4xl w-72 text-center'></h1> */}
        <Image
          src={logo}
          alt=''
          width={200}
          height={200}
          // className="mt-8"
          priority={true}
        />
        <div className="flex flex-col gap-4">
          {quizzes && quizzes.map((quizz) => {
            return <Link key={quizz.codigo} className='text-center w-96 p-2 flex-1 bg-gray-500 rounded-md text-white hover:bg-gray-400' href=''>{quizz.name}</Link>
          })}
          {/* <Link className='text-center w-96 p-2 flex-1 bg-gray-500 rounded-md text-white hover:bg-gray-400' href=''>Turma de lógica de programação</Link> */}
          <Link className='text-center w-96 p-2 flex-1 bg-transparent border-green-900 border-2 rounded-md text-white hover:bg-green-900' href={`/rooms/my-rooms/${params.roomId}/all-quizzes/create-quizz`}>+ New Quizz</Link>
        </div>
      </main>
    </div>
  )
}