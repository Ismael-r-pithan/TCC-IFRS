import * as yup from "yup";

export const createQuestionValidator = yup.object({
    alternative_one: yup.string().required('Todas alternativas são obrigatórias'),
    alternative_two: yup.string().required('Todas alternativas são obrigatórias'),
    alternative_three: yup.string().required('Todas alternativas são obrigatórias'),
    alternative_four: yup.string().required('Todas alternativas são obrigatórias'),
    alternative_five: yup.string().required('Todas alternativas são obrigatórias'),
    question_answer: yup.string().required('A resposta é obrigatória')
});