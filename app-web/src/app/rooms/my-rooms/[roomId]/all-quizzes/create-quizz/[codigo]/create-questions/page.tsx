'use client'

import Link from "next/link";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import Image from "next/image";

import logo from '../../../../../../../../assets/logo.png'
import { Header } from "@/components/Header";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import toast, { Toaster } from 'react-hot-toast';

const createQuestionFormSchema = z.object({
  description: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
  alternativeOne: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
  alternativeTwo: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
  alternativeThree: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
  alternativeFour: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
  alternativeFive: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
  questionAnswer: z.string().nonempty({message: 'Este campo não pode ser vazio'}),
})

type CreateQuestionFormInputs = z.infer<typeof createQuestionFormSchema>

export default function CreateQuestions({ params }: any) {
  const [questions, setQuestions] = useState<CreateQuestionFormInputs[] | []>([])

  const [question, setQuestion] = useState({
    description: "",
    alternativeOne: "",
    alternativeTwo: "",
    alternativeThree: "",
    alternativeFour: "",
    alternativeFive: "",
    questionAnswer: "",
  })

  const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm<CreateQuestionFormInputs>({
    resolver: zodResolver(createQuestionFormSchema),
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setQuestion(prevValue => {
      return {
        ...prevValue,
        [name] : value
      }
    })
  }

  function handleChangeDescription(event: ChangeEvent<HTMLTextAreaElement>) {
    setQuestion(prevValue => {
      return {
        ...prevValue,
        description: event.target.value
      }
    })
  }

  async function handleCreateQuestion(data: CreateQuestionFormInputs) {
    setQuestions(prevValue => {
      return [
        ...prevValue,
        question
      ]
    })

    // await api.post(`/quizzes/${params.codigo}/questions`, question)
    toast('toast funcionando')
    resetAsyncForm() 
  }

  const resetAsyncForm = useCallback(async () => {
    setQuestion({
      description: "",
      alternativeOne: "",
      alternativeTwo: "",
      alternativeThree: "",
      alternativeFour: "",
      alternativeFive: "",
      questionAnswer: "",
    })
    reset(question)
  }, [reset]);
  
  useEffect(() => {
    resetAsyncForm()
  }, [resetAsyncForm])

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
      <main className="flex flex-col mt-10 gap-2">
          <p className="text-white">Questão {questions.length + 1}</p>
          <form className="flex gap-4" onSubmit={handleSubmit(handleCreateQuestion)}>
            <label htmlFor="question" className="">
              <textarea
                className="h-full w-96 p-2 flex-1 bg-gray-500 rounded-md text-white resize-none placeholder:text-white"
                id="question"
                placeholder="Informe a questão"
                value={question.description}
                {...register('description')}
                onChange={handleChangeDescription}
              />
              {errors.description && <p className='text-sm text-red-500'>{errors.description.message}</p>}
            </label>
            <div className="flex flex-col gap-4">
              <label htmlFor="alternativeOne" className="text-white">
              1. {' '}
                <input
                  type="text"
                  className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="alternativeOne"
                  placeholder="1. Informe a primeira alternativa"
                  value={question.alternativeOne}
                  {...register('alternativeOne')}
                  onChange={handleChange}
                />
              {errors.alternativeOne && <p className='text-sm text-red-500'>{errors.alternativeOne.message}</p>}
              </label>
              <label htmlFor="alternativeTwo" className="text-white">
              2. {' '}
                <input
                  type="text"
                  className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="alternativeTwo"
                  placeholder="2. Informe a segunda alternativa"
                  value={question.alternativeTwo}
                  {...register('alternativeTwo')}
                  onChange={handleChange}
                />
                {errors.alternativeTwo && <p className='text-sm text-red-500'>{errors.alternativeTwo.message}</p>}
              </label>
              <label htmlFor="alternativeThree" className="text-white">
              3. {' '}
                <input
                  type="text"
                  className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="alternativeThree"
                  placeholder="3. Informe a terceira alternativa"
                  value={question.alternativeThree}
                  {...register('alternativeThree')}
                  onChange={handleChange}
                />
                {errors.alternativeThree && <p className='text-sm text-red-500'>{errors.alternativeThree.message}</p>}
              </label>
              <label htmlFor="alternativeFour" className="text-white">
              4. {' '}
                <input
                  type="text"
                  className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="alternativeFour"
                  placeholder="4. Informe a quarta alternativa"
                  value={question.alternativeFour}
                  {...register('alternativeFour')}
                  onChange={handleChange} 
                />
                {errors.alternativeFour && <p className='text-sm text-red-500'>{errors.alternativeFour.message}</p>}
              </label>
              <label htmlFor="alternativeFive" className="text-white">
              5. {' '}
                <input
                  type="text"
                  className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="alternativeFive"
                  placeholder="5. Informe a quinta alternativa"
                  value={question.alternativeFive}
                  {...register('alternativeFive')}
                  onChange={handleChange}
                />
                {errors.alternativeFive && <p className='text-sm text-red-500'>{errors.alternativeFive.message}</p>}
              </label>
              <label htmlFor="questionAnswer" className="text-white">
                n. {' '}
                <input
                  type="text"
                  className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="questionAnswer"
                  placeholder="Informe o número da alternativa correta"
                  value={question.questionAnswer}
                  {...register('questionAnswer')}
                  onChange={handleChange}
                />
                {errors.questionAnswer && <p className='text-sm text-red-500'>{errors.questionAnswer.message}</p>}
              </label>
              <button className='ml-5 w-96 p-2 flex-1 bg-green-900 rounded-md text-white hover:bg-green-800'>
                Criar Questão
              </button>
              <Link className=' ml-5 text-center w-96 p-2 flex-1 bg-gray-500 rounded-md text-white hover:bg-gray-400' href=''>Criar Quizz</Link>
            </div>
            
          </form>
      </main>
      </div>
      <Toaster />
    </div>
  )
}