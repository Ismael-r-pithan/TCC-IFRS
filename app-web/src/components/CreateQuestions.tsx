'use client'

import Link from "next/link";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Header } from "./Header";
import Image from "next/image";

import logo from '../assets/logo.png'

const createQuestionFormSchema = z.object({
  question: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
  option1: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
  option2: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
  option3: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
  option4: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
  option5: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
  optionTrue: z.number().min(1,{message: 'Este campo tem um intervalo entre 1 e 5'}).max(5, {message: 'Este campo tem um intervalo entre 1 e 5'}),
})

type CreateQuestionFormInputs = z.infer<typeof createQuestionFormSchema>

export function CreateQuestions() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<CreateQuestionFormInputs>({
    resolver: zodResolver(createQuestionFormSchema),
  })

  async function handleLogin(data: CreateQuestionFormInputs) {
    // await signIn(data)

  }

  return (
    <div className='flex flex-col'>
      <Header />
      <div className="flex flex-col items-center">
      <h1 className='text-white text-4xl w-72 text-center mt-4'>Crie uma questão</h1>
      <Image
        src={logo}
        alt=''
        width={200}
        height={200}
        className="mt-4"
        priority={true}
      />
      <main className="flex mt-10 gap-10">
          <form className="flex gap-4" onSubmit={handleSubmit(handleLogin)}>
            <label htmlFor="question" className="">
              <textarea
                className="h-full w-96 p-2 flex-1 bg-gray-500 rounded-md text-white resize-none placeholder:text-white"
                id="question"
                placeholder="Informe a questão"
                {...register('question')}
              />
              {errors.question && <p className='text-sm text-red-500'>{errors.question.message}</p>}
            </label>
            <div className="flex flex-col gap-4">
              <label htmlFor="option1" className="text-white">
              1. {' '}
                <input
                  type="text"
                  className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="option1"
                  placeholder="1. Informe a primeira alternativa"
                  {...register('option1')}
                />
              {errors.option1 && <p className='text-sm text-red-500'>{errors.option1.message}</p>}
              </label>
              <label htmlFor="option2" className="text-white">
              2. {' '}
                <input
                  type="text"
                  className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="option2"
                  placeholder="2. Informe a segunda alternativa"
                  {...register('option2')}
                />
                {errors.option2 && <p className='text-sm text-red-500'>{errors.option2.message}</p>}
              </label>
              <label htmlFor="option3" className="text-white">
              3. {' '}
                <input
                  type="text"
                  className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="option3"
                  placeholder="3. Informe a terceira alternativa"
                  {...register('option3')}
                />
                {errors.option3 && <p className='text-sm text-red-500'>{errors.option3.message}</p>}
              </label>
              <label htmlFor="option4" className="text-white">
              4. {' '}
                <input
                  type="text"
                  className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="option4"
                  placeholder="4. Informe a quarta alternativa"
                  {...register('option4')} 
                />
                {errors.option4 && <p className='text-sm text-red-500'>{errors.option4.message}</p>}
              </label>
              <label htmlFor="option5" className="text-white">
              5. {' '}
                <input
                  type="text"
                  className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="option5"
                  placeholder="5. Informe a quinta alternativa"
                  {...register('option5')}
                />
                {errors.option5 && <p className='text-sm text-red-500'>{errors.option5.message}</p>}
              </label>
              <label htmlFor="optionTrue" className="text-white">
                n. {' '}
                <input
                  type="number"
                  className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="optionTrue"
                  placeholder="Informe o número da alternativa correta"
                  {...register('optionTrue')}
                />
                {errors.optionTrue && <p className='text-sm text-red-500'>{errors.optionTrue.message}</p>}
              </label>
              <button className='w-96 p-2 flex-1 bg-green-900 rounded-md text-white hover:bg-green-800'>
                Criar Questão
              </button>
              <Link className='text-center w-96 p-2 flex-1 bg-gray-500 rounded-md text-white hover:bg-gray-400' href=''>Criar Quizz</Link>
            </div>
            
          </form>
      </main>
      </div>
      
    </div>
  )
}