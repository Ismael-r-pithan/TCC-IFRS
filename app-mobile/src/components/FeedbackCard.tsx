import { HStack, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { FeedbackDTO } from "@dtos/FeedbackDto";

type Props = TouchableOpacityProps & {
    data: FeedbackDTO
};

export function FeedbackCard({data, ...props}: Props) {
    return (
        <TouchableOpacity {...props} >
            <HStack flexDirection={"column"}  width={80} bg={data.questionAnswer == data.studentAnswer ? "green.800" : "red.800"} alignItems="center" justifyContent="space-between" p={2} pr={4} rounded="md" mb={8}>

            <Text color="white" mb={4} fontSize="md" fontWeight="extrabold">
            {data.description}
            </Text>

            {data.questionAnswer == data.studentAnswer ?
                <Text fontSize="md" color="gray.100" numberOfLines={2}>
                    Acertou!! Resposta: {data.questionAnswer}
                </Text> : 
                <VStack>
                <Text fontSize="md" color="gray.100" numberOfLines={2}>
                    Errou!! Resposta: {data.questionAnswer}
                </Text>
                <Text fontSize="md" color="gray.100" numberOfLines={2}>
                    Sua Resposta: {data.studentAnswer}
                </Text>  
                </VStack>
            }

            </HStack>
        </TouchableOpacity>
    );
}