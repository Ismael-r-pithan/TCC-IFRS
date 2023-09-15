'use client'

import Link from "next/link";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Header } from "./Header";
import Image from "next/image";

import logo from '../assets/logo.png'


export function MyRooms() {

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
          <Link className='text-center w-96 p-2 flex-1 bg-gray-500 rounded-md text-white hover:bg-gray-400' href=''>Turma de lógica de programação</Link>
          <Link className='text-center w-96 p-2 flex-1 bg-gray-500 rounded-md text-white hover:bg-gray-400' href=''>Turma de WEB2</Link>
        </div>
      </main>
    </div>
  )
}