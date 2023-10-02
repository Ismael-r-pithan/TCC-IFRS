import { Button } from "@components/Button";
import { HomeHeader } from "@components/HomeHeader";
import { QuizCard } from "@components/QuizCard";
import { QuizzDTO } from "@dtos/QuizzDto";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { PrivateNavigatorRoutesProps, PrivateRoutes } from "@routes/private.routes";
import { httpClient } from "@services/HttpClient";
import { AppError } from "@shared/AppError";
import { Center, Heading, ScrollView, VStack, useToast } from "native-base";
import { useEffect, useState } from "react";

export function FeedbackStudents() {
  const [quizzes, setQuizzes] = useState<QuizzDTO[]>([]);
  const { user } = useAuth();
  const toast = useToast();
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();
  

  async function handleFeedbackQuiz(codigoQuiz: string) {
    navigation.navigate("feedback_quiz", { studentId: user.id, codigoQuiz: codigoQuiz });
  }

  function handleGoBack() {
    return navigation.navigate('student');
  }

  async function listQuizzes() {
    try {
      const { data } = await httpClient.get(`users/${user.id}/quizzes`);
      setQuizzes(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os quizzes da sala";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  async function handleDelete() {
    console.log('DELETE');
  }

  async function handleEdit() {
    console.log('EDIT');
  }

  useEffect(() => {
    listQuizzes();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
    <VStack flex={1}>
      <HomeHeader />

      <Center my={16} px={10} justifyContent="space-between" flex={1}>
      <VStack alignItems="center">
        <Heading color={"gray.100"} mb={16} fontSize={"lg"}>
          Meus Quizzes Realizados
        </Heading>
        {quizzes.map((item) => (
          <QuizCard
            key={item.codigo}
            data={item}
            variant="STUDENT"
            onPress={() => handleFeedbackQuiz(item.codigo)} 
            onDelete={handleDelete} 
            onEdit={handleEdit}          
          />
        ))}
        </VStack>
        <Button
            title="Voltar"
            backgroundColor="green.800"
            onPress={handleGoBack}
          />
      </Center>
    </VStack>
    </ScrollView>
  );
}
