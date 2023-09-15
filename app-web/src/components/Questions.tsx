'use client'

import Link from "next/link";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Header } from "./Header";
import Image from "next/image";

import logo from '../assets/logo.png'
import { useState } from "react";

const createQuestionFormSchema = z.object({
  optionValue: z.string({invalid_type_error: 'Você deve escolher uma das alternativas'}).nonempty({message: 'Você deve escolher uma das alternativas'}),
})

type CreateQuestionFormInputs = z.infer<typeof createQuestionFormSchema>

export function Questions({ question, onNextQuestion }: any) {
  const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm<CreateQuestionFormInputs>({
    resolver: zodResolver(createQuestionFormSchema),
  })

  async function handleNextQuestion(data: CreateQuestionFormInputs) {
    onNextQuestion(Number(data.optionValue))
    reset()
    setIsDisabled(true)
  }

  const [isDisabled, setIsDisabled] = useState(true)

  
  return (
    <div className='flex flex-col'>
      <Header />
      <div className="flex flex-col items-center">
      <h1 className='text-white text-4xl w-72 text-center mt-4'>Questão X</h1>

      <main className="flex mt-10 gap-10">
          <form className="flex gap-4" onSubmit={handleSubmit(handleNextQuestion)}>
            <label htmlFor="question" className="">
              <p className="h-full w-96 p-2 flex-1 bg-gray-500 rounded-md text-white">{question.description}</p>
            </label>
            <div className="flex flex-col gap-4">
              <label htmlFor="option1" className="text-white flex gap-2">
                <input
                  type="radio"
                  // className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="option1"
                  // placeholder="1. Informe a primeira alternativa"
                  onClick={() => {
                    return setIsDisabled(false)
                  }}
                  value={1}
                  {...register('optionValue')}
                />
                <span className="inline-block w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white">{question.alternativeOne}</span>
              </label>
              <label htmlFor="option2" className="text-white flex gap-2">
                <input
                  type="radio"
                  // className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="option2"
                  // placeholder="1. Informe a primeira alternativa"
                  onClick={() => {
                    return setIsDisabled(false)
                  }}
                  {...register('optionValue')}
                  value={2}
                />
                <span className="inline-block w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white">{question.alternativeTwo}</span>
              </label>
              <label htmlFor="option3" className="text-white flex gap-2">
                <input
                  type="radio"
                  // className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="option3"
                  // placeholder="1. Informe a primeira alternativa"
                  onClick={() => {
                    return setIsDisabled(false)
                  }}
                  {...register('optionValue')}
                  value={3}
                />
                <span className="inline-block w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white">{question.alternativeThree}</span>
              </label>
              <label htmlFor="option4" className="text-white flex gap-2">
                <input
                  type="radio"
                  // className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="option4"
                  // placeholder="1. Informe a primeira alternativa"
                  onClick={() => {
                    return setIsDisabled(false)
                  }}
                  {...register('optionValue')}
                  value={4}
                />
                <span className="inline-block w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white">{question.alternativeFour}</span>
              </label>
              <label htmlFor="option5" className="text-white flex gap-2">
                <input
                  type="radio"
                  // className="w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white"
                  id="option5"
                  // placeholder="1. Informe a primeira alternativa"
                  onClick={() => {
                    return setIsDisabled(false)
                  }}
                  {...register('optionValue')}
                  value={5}
                />
                <span className="inline-block w-96 p-2 flex-1 bg-gray-500 rounded-md text-white h-10 placeholder:text-white">{question.alternativeFive}</span>
              </label>
              {errors.optionValue && <p className='text-sm text-red-500'>{errors.optionValue.message}</p>}
              <button className='w-96 p-2 flex-1 bg-green-900 rounded-md text-white hover:bg-green-800 disabled:bg-green-950 disabled:cursor-not-allowed' disabled={isDisabled}>
                Responder
              </button>
            </div>
            
          </form>
      </main>
      </div>
      
    </div>
  )
}