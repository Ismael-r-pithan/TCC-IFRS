import * as yup from "yup";

export const createQuizValidator = yup.object({
    name: yup.string().required('O nome do quiz é obrigatório')
});