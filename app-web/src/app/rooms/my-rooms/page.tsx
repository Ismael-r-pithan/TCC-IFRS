'use client'

import Image from "next/image";
import Link from "next/link";

import logo from '../../../assets/logo.png'
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface roomProps {
  id: string;
  name: string;
}

export default function MyRooms() {

  const [rooms, setRooms] = useState<roomProps[] | null>()

  async function fetchData() {
    const response = await api.get('/rooms')
    const rooms: roomProps[] = response.data
    setRooms(rooms)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='flex flex-col'>
      <Header />
      <main className="flex flex-col items-center mt-40 gap-10">
        <h1 className='text-white text-4xl w-72 text-center'>Minhas turmas</h1>
        <Image
          src={logo}
          alt=''
          width={200}
          height={200}
          // className="mt-8"
          priority={true}
        />
        <div className="flex flex-col gap-4">
          {rooms && rooms.map((room) => {
            return(
              <Link key={room.id} className='text-center w-96 p-2 flex-1 bg-gray-500 rounded-md text-white hover:bg-gray-400' href={`/rooms/my-rooms/${room.id}/all-quizzes`}>
                {room.name}
              </Link>
          )})}
        </div>
      </main>
    </div>
  )
}