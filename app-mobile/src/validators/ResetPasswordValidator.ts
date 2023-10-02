import * as yup from "yup";

export const resetPasswordValidator = yup.object({
  password: yup.string().required('Informe a senha'),
  confirmPassword: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas não coincidem'),
  currentPassword: yup.string().required('A sua senha atual é obrigatória')
});
