import { HStack, Text, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { AntDesign  } from "@expo/vector-icons";
import { RoomDTO } from "@dtos/RoomDto";

type Props = TouchableOpacityProps & {
    data: RoomDTO,
    onDelete: () => void,
    onEdit: () => void
};

export function RoomCard({data, onDelete, onEdit, ...props}: Props) {
    return (
        <TouchableOpacity {...props} >
            <HStack height={16} width={80} bg="gray.500" alignItems="center" justifyContent="space-between" p={2} pr={4} rounded="md" mb={3}>
                <Text fontSize="md" color="gray.100" numberOfLines={2}>
                    {data.name}
                </Text>
                <HStack>
                    <Icon as={AntDesign} name="edit" onPress={onEdit} size={5} color="gray.300" mr={3} />
                    <Icon as={AntDesign} name="delete" onPress={onDelete} size={5} color="gray.300" mr={2} />
                </HStack>
            </HStack>
        </TouchableOpacity>
    );
}