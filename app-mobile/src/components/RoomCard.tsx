import { HStack, Text, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { RoomDTO } from "@dtos/RoomDto";

type Props = TouchableOpacityProps & {
    data: RoomDTO
};

export function RoomCard({data, ...props}: Props) {
    return (
        <TouchableOpacity {...props} >
            <HStack height={16} width={80} bg="gray.500" alignItems="center" justifyContent="space-between" p={2} pr={4} rounded="md" mb={3}>
                <Text fontSize="md" color="gray.100" numberOfLines={2}>
                    {data.name}
                </Text>
                <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
            </HStack>
        </TouchableOpacity>
    );
}