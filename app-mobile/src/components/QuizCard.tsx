import { HStack, Text, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { QuizzDTO } from "@dtos/QuizzDto";


type Props = TouchableOpacityProps & {
    data: QuizzDTO,
    variant?: 'EDUCATOR' | 'STUDENT';
    onDelete: () => void,
    onEdit: () => void
};

export function QuizCard({data, variant, onDelete, onEdit, ...props}: Props) {
    return (
        <TouchableOpacity {...props} >
            <HStack height={16} width={80} bg="gray.500" alignItems="center" justifyContent="space-between" p={2} pr={4} rounded="md" mb={3}>
                <Text fontSize="md" color="gray.100" numberOfLines={2}>
                    {data.name}
                </Text>
               
                {variant === 'STUDENT' ? (<Icon as={AntDesign} name="infocirlceo" color="gray.300" mr={2} size={5} />) : (
                     <HStack>
                     <Icon as={AntDesign} name="edit" onPress={onEdit} size={5} color="gray.300" mr={3} />
                     <Icon as={AntDesign} name="delete" onPress={onDelete} size={5} color="gray.300" mr={2} />
                    </HStack>
                )}
            </HStack>
        </TouchableOpacity>
    );
}

/*

            
                } : {
                    
                }}
*/