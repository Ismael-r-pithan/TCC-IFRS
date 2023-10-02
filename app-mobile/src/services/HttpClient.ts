import axios from "axios";
import { AppError } from '@shared/AppError';

const httpClient = axios.create({
    baseURL: "http://192.168.2.102:3001/api/v1",
    timeout: 5000
});

httpClient.interceptors.response.use(response => response, errors => {
    if (errors.response && errors.response.data) {
        return Promise.reject(new AppError(errors.response.data.message))
    }
    return Promise.reject(new AppError("Erro no servidor, tente novamente mais tarde"));
});



export { httpClient }