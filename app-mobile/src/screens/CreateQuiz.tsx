import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { PrivateNavigatorRoutesProps, PrivateRoutes } from '@routes/private.routes';
import { Center, ScrollView, TextArea, VStack, useToast } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { createQuizValidator } from '@validators/CreateQuizValidator';
import { Input } from '@components/Input';
import { httpClient } from '@services/HttpClient';
import { AppError } from '@shared/AppError';
import { useState } from 'react';
import { HomeHeader } from "@components/HomeHeader";

type CreateQuizRouteProp = RouteProp<PrivateRoutes, 'create_quiz'> & {
    params: {
      roomId: string;
    };
};


export type CreateQuizProps = {
    name: string;
}

type QuizResponseProps = {
    codigo: string;
    name: string;
}


export function CreateQuiz() {
    const navigation = useNavigation<PrivateNavigatorRoutesProps>();
    const [ isLoading, setIsLoading ] = useState(false);
    const route = useRoute<CreateQuizRouteProp>();
    const { roomId } = route.params;

    const { control, handleSubmit, formState: { errors } } = useForm<CreateQuizProps>({
        resolver: yupResolver(createQuizValidator)
    });


    const toast = useToast();

    async function handleCreateQuiz({ name }: CreateQuizProps) {
        try {
            // setIsLoading(true);
            const response = await httpClient.post(`/rooms/${roomId}/quizzes`, { name });
            const data: QuizResponseProps = response.data;
            navigation.navigate('create_question', { codigoQuiz: data.codigo, roomId: roomId})
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível criar a questão, Tente novamente mais tarde";
            setIsLoading(false);
            toast.show({
                title,
                backgroundColor: "red.500",
                placement: "top"
            })
        }
    }

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1}}
            showsVerticalScrollIndicator={false}
        >
        <HomeHeader /> 
            <VStack flex={1} px={10} justifyContent={'center'} >
                <Center my={8}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                            placeholder="Informe um nome para o quiz"
                            placeholderTextColor="gray.100"  
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.name?.message}
                            />                            
                        )}
                    />
                    <Button 
                        title="Criar"
                        onPress={handleSubmit(handleCreateQuiz)}
                        isLoading={isLoading}
                    />   
                </Center>
            </VStack>
        </ScrollView>
    );
}