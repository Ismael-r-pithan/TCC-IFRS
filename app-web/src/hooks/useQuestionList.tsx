import api from "@/lib/api";
import { useEffect, useState } from "react";

const INITIAL_PAGE = 1;

type ListQuestResponse = {
    questions: Object[];
    total: number;
}

type QuestionProps = {
    alternativeOne: string;
    alternativeTwo: string;
    alternativeThree: string;
    alternativeFour: string;
    alternativeFive: string;
    description: string;
}

export function useQuestionList() {
    const [questions, setQuestions] = useState<QuestionProps>({} as QuestionProps);
    const [codigoQuizz, setCodigoQuizz] = useState('');
    const [page, setPage] = useState(INITIAL_PAGE);
    const [totalPages, setTotalPages] = useState(0);

    function handlePage(numPage: number) {
        setPage(numPage);
    }

    function handleCodigoQuizz(codigo: string) {
        setCodigoQuizz(codigo);
    }

    useEffect(() => {
        async function listQuestion() {
            try {
                if (codigoQuizz.length > 0) {
                const { data } = await api.get(`/quizzes/${codigoQuizz}/questions?page=${page}`);
                const response = data as ListQuestResponse;
                setQuestions(response.questions[0] as QuestionProps);
                setTotalPages(response.total);
                }
            } catch (error) {
                throw error;
            }
        }
        listQuestion();
    }, [page, codigoQuizz]);

    return { questions, handlePage, handleCodigoQuizz, totalPages }

}