'use client'

import Image from 'next/image'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import logo from '../../../assets/logo.png'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'

const createRoomFormSchema = z.object({
  name: z.string().nonempty({message: 'O campo não pode estar vazio'}),
})

type CreateRoomFormInputs = z.infer<typeof createRoomFormSchema>

export default function CreateRoom() {

  // const [room, setRoom] = useState({
  //   name: "",
  // })

  const router = useRouter()

  // function handleChange(event: ChangeEvent<HTMLInputElement>) {

  //   setRoom({name: event.target.value})
  // }

  const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm<CreateRoomFormInputs>({
    resolver: zodResolver(createRoomFormSchema),
  })

  async function handleRegister(data: CreateRoomFormInputs) {
    // await api.post('/rooms', room)
    
    // reset()
    router.push('/rooms')
  }
  
  return (
    <div className='flex flex-col items-center mt-20'>
      <h1 className='text-white text-4xl'>Crie uma sala</h1>
      <Image
        src={logo}
        alt=''
        width={200}
        height={200}
        className="mt-8"
        priority={true}
      />

      <form className='flex flex-col mt-10 gap-4 h-30' onSubmit={handleSubmit(handleRegister)}>
        <input
          className='w-96 p-2 flex-1 bg-gray-400 rounded-md text-white placeholder:text-gray-100'
          type="text"
          placeholder='Informe o nome da sala'
          // value={room.name}
          {...register('name')}
          // onChange={handleChange}
        />
        {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
        
        <button className='w-96 p-2 flex-1 bg-green-900 rounded-md text-white hover:bg-green-800'>Criar</button>
      </form>

      <Link className='flex justify-center w-96 p-2 flex-1 bg-gray-400 rounded-md mt-80 text-white hover:bg-gray-300' href='/rooms'>Voltar</Link>
      
    </div>
  )
}