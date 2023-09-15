import Image from "next/image";
import avatarDefault from '../assets/avatarDefault.png'
import { LogOut } from 'lucide-react'
import Link from "next/link";
import { useContext } from "react";
import { DataContext } from "@/context/dataContext";

export function Header() {
  const { userProfile } = useContext(DataContext)
  return(
    <div className="items-center p-2 flex bg-green-900 justify-between">
      <div className="flex items-center gap-2">
        <Image height={40} width={40} src={userProfile?.avatar ?? avatarDefault} alt="" className="rounded-full"/>
        <span className="text-white">Olá, {userProfile?.username}</span>
      </div>
      <a
          href="/api/auth/logout"
          className="text-white cursor-pointer hover:text-red-500 flex gap-2"
        >
          Sair
          <LogOut />
        </a>
    </div>
  )
}