import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "./UserPhoto";
import { useAuth } from "@hooks/useAuth";

import avatarDefault from "@assets/avatarDefault.png";


export function HomeHeader() {
    const { user, signOut } = useAuth();
    return (
        <HStack background="green.900" pt={16} pb={5} px={8} alignItems="center">
            <UserPhoto
                source={ user.avatar ? { uri: user.avatar } : avatarDefault }
                size={16}
                alt="Imagem de Perfil do usuário"
                mr={4}
            />
            <VStack flex={1}>
                <Text color="gray.100" fontSize="md">Olá, </Text>
                <Heading color="gray.100" fontSize="md"> { user.username }</Heading>
            </VStack>
            <TouchableOpacity onPress={signOut}>
                <Icon 
                    as={MaterialIcons}
                    name="logout"
                    color="gray.200"
                    size={7}
                />
            </TouchableOpacity>
        </HStack>
    );
}