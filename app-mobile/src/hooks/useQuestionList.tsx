import { useEffect, useState } from "react";
import { httpClient } from '@services/HttpClient';

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
    const [codigoQuiz, setCodigoQuiz] = useState('');
    const [roomId, setRoomId] = useState('');
    const [page, setPage] = useState(INITIAL_PAGE);
    const [totalPages, setTotalPages] = useState(0);

    function handlePage(numPage: number) {
        setPage(numPage);
    }

    function handleCodigoQuiz(codigo: string) {
        setCodigoQuiz(codigo);
    }

    useEffect(() => {
        async function listQuestion() {
            try {
                if (codigoQuiz.length > 0) {
                const { data } = await httpClient.get(`quizzes/${codigoQuiz}/questions?page=${page}`);
                const response = data as ListQuestResponse;
                setQuestions(response.questions[0] as QuestionProps);
                setTotalPages(response.total);
                }
            } catch (error) {
                throw error;
            }
        }
        listQuestion();
    }, [page, roomId, codigoQuiz]);

    return { questions, handlePage, handleCodigoQuiz, totalPages }

}