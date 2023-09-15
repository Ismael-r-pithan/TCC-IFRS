import { HStack, Text, Icon, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { UserDto } from "@dtos/UserDto";

type Props = TouchableOpacityProps & {
    data: UserDto
};

export function StudentCard({data, ...props}: Props) {
    return (
        <TouchableOpacity {...props} >
            <HStack width={80} bg="gray.500" alignItems="center" justifyContent="space-between" p={2} pr={4} rounded="md" mb={3}>
                <VStack>
                    <Text fontSize="md" color="gray.100" numberOfLines={2}>
                        {data.username}
                    </Text>
                    <Text fontSize="md" color="gray.100" numberOfLines={2}>
                        {data.email}
                    </Text>
                </VStack>
                
                
            <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
            </HStack>       
        </TouchableOpacity>
    );
}