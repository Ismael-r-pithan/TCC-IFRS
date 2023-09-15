import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { PublicNavigatorRoutesProps } from '@routes/public.routes';
import { VStack, Center, Heading, Image, ScrollView, useToast } from 'native-base';
import LogoIF from '@assets/logo.png';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { signUpValidator } from "@validators/SignUpValidator";
import { httpClient } from '@services/HttpClient';
import { AppError } from '@shared/AppError';
import { useState } from 'react';


export type SignUpProps = {
    email: string;
    username: string;
    password: string;
    password_confirm: string;
}

export function SignUp() {

    const [ isLoading, setIsLoading ] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpProps>({
        resolver: yupResolver(signUpValidator)
    });

    const navigation = useNavigation<PublicNavigatorRoutesProps>();

    function handleGoBackSignIn() {
        navigation.navigate('signIn');
    }

    const toast = useToast();

    async function handleSignUp({ username, email, password }: SignUpProps) {
        try {
            setIsLoading(true);
            await httpClient.post("/users", { username, email, password });
            handleGoBackSignIn();
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível criar a conta, Tente novamente mais tarde";
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
            <VStack flex={1} px={10} >
                <Center my={8}>
                    <Heading color="gray.100"> Crie sua conta QuizIFy </Heading>
                    <Image 
                    source={LogoIF}
                    alt="Logo da Instituição de Ensino"
                    mt={6}
                    height={140}
                    width={140}
                    />
                </Center>
                <Center >

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                            placeholder="Informe seu E-mail"
                            placeholderTextColor="gray.100"
                            keyboardType="email-address"   
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.email?.message}
                            />                            
                        )}
                    />

                    <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                            placeholder="Informe seu nome de usuario"
                            placeholderTextColor="gray.100" 
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.username?.message}
                            />                            
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                            placeholder="Informe sua Senha"
                            placeholderTextColor="gray.100"
                            secureTextEntry   
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.password?.message}
                            />                            
                        )}
                    />

                    <Controller
                        control={control}
                        name="password_confirm"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                            placeholder="Confirme sua Senha"
                            placeholderTextColor="gray.100"
                            secureTextEntry   
                            value={value}
                            onChangeText={onChange}
                            onSubmitEditing={handleSubmit(handleSignUp)}
                            returnKeyType="send"
                            errorMessage={errors.password_confirm?.message}
                            />                            
                        )}
                    />

                    <Button 
                        title="Criar conta"
                        onPress={handleSubmit(handleSignUp)}
                        isLoading={isLoading}
                    />
                    
                </Center>

                <Button 
                    mt={2}
                    title="Voltar para o login" 
                    variant="outline"
                    onPress={handleGoBackSignIn}
                />
            </VStack>
        </ScrollView>
    );
}