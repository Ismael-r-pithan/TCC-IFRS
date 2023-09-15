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


export type CreateRoomProps = {
    name: string;
}

export function CreateRoom() {
    const navigation = useNavigation<PrivateNavigatorRoutesProps>();
    const [ isLoading, setIsLoading ] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateRoomProps>({
        resolver: yupResolver(createQuizValidator)
    });


    const toast = useToast();

    async function handleCreateRoom({ name }: CreateRoomProps) {
        try {
            setIsLoading(true);
            await httpClient.post('/rooms', { name });
            reset();
            navigation.navigate('list_room');
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível criar a turma, Tente novamente mais tarde";
            setIsLoading(false);
            toast.show({
                title,
                backgroundColor: "red.500",
                placement: "top"
            })
        } finally {
            setIsLoading(false);
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
                            placeholder="Informe um nome para a turma"
                            placeholderTextColor="gray.100"  
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.name?.message}
                            />                            
                        )}
                    />
                    <Button 
                        title="Criar Turma"
                        onPress={handleSubmit(handleCreateRoom)}
                        isLoading={isLoading}
                    />   
                </Center>
            </VStack>
        </ScrollView>
    );
}