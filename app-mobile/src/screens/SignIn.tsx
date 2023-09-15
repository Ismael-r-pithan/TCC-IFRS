import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { PublicNavigatorRoutesProps } from '@routes/public.routes';
import { VStack, Center, Heading, Text, ScrollView, Image, useToast } from 'native-base';
import LogoIF from '@assets/logo.png';
import { useAuth } from '@hooks/useAuth';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { signInValidator } from '@validators/SignInValidator';
import { AppError } from '@shared/AppError';
import { useState } from 'react';

type SignInProps = {
    email: string;
    password: string;
}


export function SignIn() {

    const { signIn } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm<SignInProps>({
        resolver: yupResolver(signInValidator)
    });

    const [ isLoading, setIsLoading ] = useState(false);

    const navigation = useNavigation<PublicNavigatorRoutesProps>();

    const toast = useToast();

    async function handleSignIn({ email, password }: SignInProps) {
        try {
            setIsLoading(true);
            await signIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;

            setIsLoading(false);

            const title = isAppError ? error.message : "Não foi possivel entrar no momento, tente novamente mais tarde";
            toast.show({
                title,
                backgroundColor: "red.500",
                placement: "top"
            })
        }

    }

    function handleCreateAccount() {
        navigation.navigate('signUp');
    }

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1}}
            showsVerticalScrollIndicator={false}
        >
            <VStack flex={1} px={10} >
                <Center my={16}>
                    <Heading color="gray.100"> Bem Vindo ao QuizIFy </Heading>
                    <Image 
                    source={LogoIF}
                    alt='Logo da Instituição de Ensino'
                    mt={8}
                    height={140}
                    width={140}
                    />
                </Center>
                <Center my={8} mb={16}>
                    <Heading color="gray.100" fontSize={'xl'} mb={6}> Acesse sua conta </Heading>
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
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                            placeholder="Informe sua Senha"
                            placeholderTextColor="gray.100"
                            secureTextEntry   
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.password?.message}
                            onSubmitEditing={handleSubmit(handleSignIn)}
                            
                            />                            
                        )}
                    />
                    <Button onPress={handleSubmit(handleSignIn)} title="Entrar" isLoading={isLoading} />
                    
                </Center>

                <Center color="gray.100" fontSize="sm">
                    <Text color="gray.100" mb={4}> Ainda não possui conta ?</Text>
                    <Button 
                        title="Criar Conta" 
                        variant="outline"
                        onPress={handleCreateAccount}
                        mb={4}
                    />
                </Center>
            </VStack>
        </ScrollView>
    );
}