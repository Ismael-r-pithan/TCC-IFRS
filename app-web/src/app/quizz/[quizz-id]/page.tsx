'use client'

import { Questions } from "@/components/Questions";
import { useQuestionList } from "@/hooks/useQuestionList";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import logo from '../../../assets/logo.png'

interface QuestionProps {
  alternativeOne: string;
  alternativeTwo: string;
  alternativeThree: string;
  alternativeFour: string;
  alternativeFive: string;
  description: string;
}

export default function Quizz({params}:any) {
  const [quizzStarted, setQuizzStarted] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<number>()
  const { handleCodigoQuizz, handlePage, questions, totalPages } = useQuestionList();
  const [page, setPage] = useState(1);
  const [score, setScore] = useState(0);
  const quizzId = params['quizz-id']

  useEffect(() => {
    handlePage(page)
    handleCodigoQuizz(quizzId)
  }, [page, quizzId])

  function handleStartQuizz() {
    setQuizzStarted(true)
  }

  function nextQuestion(alternativeTrue: number) {
    setPage((page) => page < totalPages ? page + 1 : page)

    if(page === totalPages) {
      console.log("Finalizou o quizz!!!");
      toast('Parabéns você finalizou o quizz.', {
        style: {
          border: '1px solid green',
        },
      });
    }
  }

  return (
    <>
      {quizzStarted ? 
        <div>
          <hr />
          <Questions question={questions} onNextQuestion={nextQuestion}/>
        </div> :
        <div className='flex flex-col items-center mt-20 text-white'>
          
          <Image
            src={logo}
            alt=''
            width={200}
            height={200}
            className="mt-8"
            priority={true}
          />
          <p className="text-3xl mt-4">Turma -</p>
          <p className="text-2xl mt-4">Quizz -</p>
          <hr />
          <button className='mt-4 w-96 p-2 flex-1 bg-green-900 rounded-md text-white hover:bg-green-800' onClick={handleStartQuizz}>Iniciar Quizz</button>
        </div>
      }
    </>
  )
}