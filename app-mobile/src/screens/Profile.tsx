import { HeaderScreen } from '@components/HeaderScreen';
import { UserPhoto } from '@components/UserPhoto';
import { VStack, ScrollView, Center, Skeleton, Text, Heading, useToast } from 'native-base';
import { useState } from 'react';
import { TouchableOpacity} from 'react-native';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAuth } from '@hooks/useAuth';

const PHOTO_SIZE = 32;
const BYTE_TO_MEGABYTE = 1000000;

export function Profile() {

    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState("https://github.com/Ismael-r-pithan.png");
    const [resetPassword, setResetPassword] = useState(false);
    const toast = useToast();

    const { user } = useAuth();

    function handleResetPassword() {
        setResetPassword(!resetPassword);
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

                const file = {
                    name: `${user.username}.${extension}`.toLowerCase(),
                    uri: photo.assets[0].uri,
                    type: `${photo.assets[0].type}/${extension}`
                };

                setProfilePhoto(photo.assets[0].uri);
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
            {!resetPassword ?
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
                                        source={{ uri: profilePhoto }}
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
                            placeholder="Nome"
                            backgroundColor="gray.400"
                            placeholderTextColor="gray.200"
                        />
                        <Input
                            placeholder="E-mail"
                            backgroundColor="gray.400"
                            placeholderTextColor="gray.200"
                            isDisabled
                            isReadOnly
                        />
                        <Button
                            title="Atualizar"
                            mt={4}
                        />
                        <Center color="gray.100" fontSize="sm" mt={16}>
                            <Text color="gray.100" mb={2}> Deseja alterar a senha ?</Text>
                            <Button 
                                title="Atualizar senha" 
                                variant="outline"
                                onPress={handleResetPassword}
                            />
                        </Center>
                    </VStack>        
                ) :
                <VStack>
                    <Heading color="gray.200" fontSize="md" mb={2}>Alterar Senha</Heading>
                    <Input
                        placeholder="Senha antiga"
                        backgroundColor="gray.400"
                        placeholderTextColor="gray.200"
                        secureTextEntry
                    />
                    <Input
                        placeholder="Nova Senha"
                        backgroundColor="gray.400"
                        placeholderTextColor="gray.200"
                        secureTextEntry
                    />
                    <Input
                        placeholder="Confirme a nova Senha"
                        backgroundColor="gray.400"
                        placeholderTextColor="gray.200"
                        secureTextEntry
                    />
                    <Button
                        title="Atualizar Senha"
                         mt={4}
                    />
                     <Center color="gray.100" fontSize="sm" mt={32}>
                        <Text color="gray.100" mb={6}> Deseja alterar as informações de perfil ?</Text>
                        <Button 
                            title="Atualizar Perfil" 
                            variant="outline"
                            onPress={handleResetPassword}
                        />
                    </Center>
                </VStack>}
        </VStack>
        </ScrollView>
    );
}