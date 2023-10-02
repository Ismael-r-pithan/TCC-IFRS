import { HeaderScreen } from '@components/HeaderScreen';
import { UserPhoto } from '@components/UserPhoto';
import { VStack, ScrollView, Center, Skeleton, Text, Heading, useToast, AlertDialog, Button as Btn } from 'native-base';
import { useState } from 'react';
import { TouchableOpacity} from 'react-native';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAuth } from '@hooks/useAuth';
import { httpClient } from '@services/HttpClient';import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { resetPasswordValidator } from '@validators/ResetPasswordValidator';
import { AppError } from '@shared/AppError';
import { useNavigation } from '@react-navigation/native';
import { PublicNavigatorRoutesProps } from '@routes/public.routes';
import React from 'react';


type ResetPasswordProps = {
    password: string;
    confirmPassword: string;
    currentPassword: string;
}


export function Profile() {

    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const [screenResetPassword, setScreenResetPassword] = useState(false);
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
    const cancelRef = React.useRef(null);
    const [username, setUsername] = useState('');
    const [errorInvalidUsername, setErrorInvalidUsername] = useState('');
    const PHOTO_SIZE = 32;
    const BYTE_TO_MEGABYTE = 1000000000000;

    const { control, handleSubmit, formState: { errors }, reset } = useForm<ResetPasswordProps>({
        resolver: yupResolver(resetPasswordValidator)
    });


    const { user, updateUserProfile, signOut } = useAuth();

    function handleScreenUpdateProfile() {
        setScreenResetPassword(!screenResetPassword);
    }

    async function handleRemoveUser() {
        try {
            await httpClient.delete("/users");
            toast.show({
                title: 'Espero te ver em breve',
                backgroundColor: "green.500",
                placement: "top"
            })
            signOut(); 
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível desativar sua conta no momento, Tente novamente mais tarde";
            toast.show({
                title,
                backgroundColor: "red.500",
                placement: "top"
            })
        }
    }

    async function handleUpdateProfile() {
        if (username.length <= 0) {
            setErrorInvalidUsername('O campo nome é obrigatório');
            return;
        }

        try {
            await httpClient.patch("/users", { username });
            toast.show({
                title: 'Username alterado com sucesso',
                backgroundColor: "green.500",
                placement: "top"
            })
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível alterar o username no momento, Tente novamente mais tarde";
            toast.show({
                title,
                backgroundColor: "red.500",
                placement: "top"
            })
        } finally {
            setUsername('');
            setErrorInvalidUsername('');
            const userUpdated = {
                ...user,
                username,
            }
            updateUserProfile(userUpdated);
        }

    }

    async function handleResetPassword({ password, confirmPassword, currentPassword }: ResetPasswordProps) {
        try {
            await httpClient.patch("/users/reset-password", { password, confirmPassword, currentPassword });
            toast.show({
                title: 'Senha alterada com sucesso',
                backgroundColor: "green.500",
                placement: "top"
            })
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível alterar a senha no momento, Tente novamente mais tarde";
            toast.show({
                title,
                backgroundColor: "red.500",
                placement: "top"
            })
        } finally {
            reset();
        }
    }


    async function handleLoadUserPhoto() {
        try {    
            const photo = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4],
                quality: 1,
                allowsEditing: true
            });

            if (photo.canceled) return;

            if (photo.assets[0].uri) {

                const photoInfos = await FileSystem.getInfoAsync(photo.assets[0].uri);

                if (photoInfos.exists && (photoInfos.size / BYTE_TO_MEGABYTE) > 1) {
                    return toast.show({
                        title: "Escolha uma imagem de até 1MB",
                        backgroundColor: "red.500"
                    })
                }

                const extension = photo.assets[0].uri.split('.').pop();

                const avatarFile = {
                    name: `${user.username}.${extension}`.toLowerCase(),
                    uri: photo.assets[0].uri,
                    type: `${photo.assets[0].type}/${extension}`
                } as any;

                const avatarForm = new FormData();
                avatarForm.append('avatar', avatarFile);

              

                const response =  await httpClient.patch('/users/avatar', avatarForm, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const userUpdated = user;

                userUpdated.avatar = response.data.avatar;

                await updateUserProfile(userUpdated);
                
                toast.show({
                    title: 'foto atualizada',
                    placement: 'top',
                    bgColor: 'green.500'
                });
            }

        } catch (error) {
            console.error({ error });
        } finally {
            setPhotoIsLoading(false);
        }

    }

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 16}} >
        <HeaderScreen title="Perfil" />
        <VStack flex={1} px={8} mt={12}> 
            {!screenResetPassword ?
                (

                    <VStack>
                        <Center>
                            {
                                photoIsLoading ?
                                    <Skeleton  
                                    startColor="green.900"
                                    endColor="green.800"
                                    width={PHOTO_SIZE} 
                                    height={PHOTO_SIZE} 
                                    rounded="full"
                                    />
                                :
                                    <UserPhoto
                                        source={{ uri: user.avatar }}
                                        alt="Foto do usuário"
                                        size={PHOTO_SIZE}
                                    />

                            }
                    <TouchableOpacity onPress={handleLoadUserPhoto}>
                        <Text 
                            color="green.700" 
                            fontWeight="bold" 
                            fontSize="md"
                            mt={2}
                            mb={8}
                        >
                            Alterar foto
                        </Text>
                    </TouchableOpacity>
                    </Center> 
                        <Input
                            placeholder={"Nome"}
                            backgroundColor="gray.400"
                            placeholderTextColor="gray.200"
                            defaultValue={user.username}
                            onChangeText={setUsername}
                        />
                        {errorInvalidUsername && 
                        <Text color={"red.500"} mb={2}>{errorInvalidUsername}</Text>}
                        <Input
                            placeholder="E-mail"
                            backgroundColor="gray.400"
                            placeholderTextColor="gray.200"
                            value={user.email}
                            isDisabled
                            isReadOnly
                        />
                        <Button
                            title="Atualizar"
                            mt={4}
                            onPress={handleUpdateProfile}
                        />
                        <Center color="gray.100" fontSize="sm" mt={16}>
                            <Text color="gray.100" mb={2}> Deseja alterar a senha ?</Text>
                            <Button 
                                title="Atualizar senha" 
                                variant="outline"
                                onPress={handleScreenUpdateProfile}
                            />
                        </Center>
                    </VStack>        
                ) :
                <VStack>
                    <Heading color="gray.200" fontSize="md" mb={2}>Alterar Senha</Heading>
                    <Controller
                        control={control}
                        name="currentPassword"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                            placeholder="Informe sua senha atual"
                            placeholderTextColor="gray.200"
                            backgroundColor="gray.400"
                            secureTextEntry   
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.currentPassword?.message}                            
                            />                            
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                            placeholder="Informe a nova senha"
                            placeholderTextColor="gray.200"
                            backgroundColor="gray.400"
                            secureTextEntry   
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.password?.message}                            
                            />                            
                        )}
                    />
                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                            placeholder="Confirme a nova senha"
                            placeholderTextColor="gray.200"
                            backgroundColor="gray.400"
                            secureTextEntry   
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.confirmPassword?.message}                            
                            />                            
                        )}
                    />
                    <Button onPress={handleSubmit(handleResetPassword)} title="Atualizar Senha" mt={4}/>
        
                     <Center color="gray.100" fontSize="sm" mt={16}>
                        <Text color="gray.100" mb={6}> Deseja alterar as informações de perfil ?</Text>
                        <Button 
                            title="Atualizar Perfil" 
                            variant="outline"
                            onPress={handleScreenUpdateProfile}
                        />
                        <Button 
                                title="Desativar Conta" 
                                background="red.800"
                                mt={2}
                                onPress={onOpen}
                                _pressed={{
                                    background: "red.600"
                                }}
                            />
                    </Center>
                    {isOpen && (
                        <AlertDialog
                        leastDestructiveRef={cancelRef}
                        isOpen={isOpen}
                        onClose={onClose}
                        
                        >
                        <AlertDialog.Content backgroundColor={"gray.500"}>
                            <AlertDialog.CloseButton />
                            <AlertDialog.Body backgroundColor={"gray.500"}>
                                <Heading color={"gray.200"} fontSize={"md"}>{user.username}</Heading> 
                            </AlertDialog.Body>
                            <AlertDialog.Content ml={4} mb={4} backgroundColor={"gray.500"}>
                                <Text color={"gray.200"} fontSize={"md"}>Você tem certeza que deseja desativar sua conta ?</Text>
                            </AlertDialog.Content>
                            <AlertDialog.Footer backgroundColor={"gray.500"}>
                            <Btn.Group space={2} >
                                <Btn colorScheme="info" onPress={handleRemoveUser}>
                                Sim
                                </Btn>
                                <Btn colorScheme="danger" onPress={onClose}>
                                Cancelar
                                </Btn>
                            </Btn.Group>
                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                        </AlertDialog>
                    )}
                </VStack>}
        </VStack>
        </ScrollView>
    );
}