import { FeedbackCard } from "@components/FeedbackCard";
import { HomeHeader } from "@components/HomeHeader";
import { FeedbackDTO } from "@dtos/FeedbackDto";
import { PrivateNavigatorRoutesProps, PrivateRoutes } from "@routes/private.routes";
import { httpClient } from "@services/HttpClient";
import { AppError } from "@shared/AppError";
import { Center, FlatList, VStack, useToast, Text, Heading } from "native-base";
import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "@components/Button";

type FeedbackQuizRouteProp = RouteProp<PrivateRoutes, "feedback_quiz"> & {
  params: {
    codigoQuiz: string;
    studentId: string;
    roomId: string;
  };
};


export function FeedbackQuiz() {
  const route = useRoute<FeedbackQuizRouteProp>();
  const [feedbacks, setFeedbacks] = useState<FeedbackDTO>([]);
  const toast = useToast();
  const { codigoQuiz, studentId, roomId } = route.params;
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();
  // TODO: CONTABILIZAR ACERTOS E ERROS

  async function listFeedbacks() {
    try {
      const { data } = await httpClient.get(`/users/${studentId}/quizzes/${codigoQuiz}`);
      setFeedbacks(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os feedbacks";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }
  useEffect(() => {
    listFeedbacks();
  }, [codigoQuiz]);

  function handleGoBack() {
    if (!roomId) {
      return navigation.navigate("feedback_students");
    }
    return navigation.navigate("list_students", { codigoQuiz: codigoQuiz, roomId: roomId });
  }
  
    return (
        <VStack flex={1} alignItems="center">
        <HomeHeader />
        <Center my={16} px={10} flex={1}>
        <Heading color={"gray.100"} mb={6} fontSize={"lg"}>Feedback Do Quiz</Heading>
        <Text color={"gray.100"} fontSize={"md"}>ACERTOS: {feedbacks.totalCorrectAnswer}</Text>
        <Text color={"gray.100"} fontSize={"md"} mb={8}>ERROS: {feedbacks.totalWrongAnswers}</Text>
          <FlatList
            data={feedbacks.quizFeedback as []}
            renderItem={({ item }) => (
              <FeedbackCard data={item} />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
            }}
          />
          
        </Center>
        <Button
          title="Voltar"
          onPress={() => handleGoBack()}
          variant="outline"
          mb={4}
          width={80}
        />
      </VStack>
    );
}