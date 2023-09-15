import { Button } from "@components/Button";
import { HomeHeader } from "@components/HomeHeader";
import { QuizCard } from "@components/QuizCard";
import { QuizzDTO } from "@dtos/QuizzDto";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { PrivateNavigatorRoutesProps, PrivateRoutes } from "@routes/private.routes";
import { httpClient } from "@services/HttpClient";
import { AppError } from "@shared/AppError";
import { Center, Heading, ScrollView, VStack, useToast } from "native-base";
import React from "react";
import { useEffect, useState } from "react";

export function ListQuizzes() {
  const [quizzes, setQuizzes] = useState<QuizzDTO[]>([]);
  const toast = useToast();
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();

  type ListQuizzesRouteProp = RouteProp<PrivateRoutes, "list_quizzes"> & {
    params: {
      roomId: string;
    };
  };

  const route = useRoute<ListQuizzesRouteProp>();
  const { roomId } = route.params;

  async function handleListStudents(roomId: string, codigoQuiz: string) {
    return navigation.navigate("list_students", { codigoQuiz: codigoQuiz, roomId: roomId });
  }

  async function onCreateQuiz(roomId: string) {
    return navigation.navigate("create_quiz", { roomId: roomId });
  }

  function handleGoBack() {
    return navigation.navigate("list_room");
  }

  async function listQuizzes(roomId: string) {
    try {
      const { data } = await httpClient.get(`rooms/${roomId}/quizzes`);
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

  useFocusEffect(
    React.useCallback(() => {
      listQuizzes(roomId);
    }, [roomId])
  );


  return (
    
    <VStack  alignItems="center" flex={1}>
      
      <HomeHeader />
      
      <Center my={16} px={10} flex={1}>
     
        <Heading color={"gray.100"} mb={16} fontSize={"lg"}>
          Quizzes da Turma
        </Heading>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
        {quizzes.map((item) => (
          <QuizCard
            key={item.codigo}
            data={item}
            onPress={() => handleListStudents(roomId, item.codigo)}
          />
        ))}
         </ScrollView>
      </Center>
      
      <Button
          title="Criar Novo Quizz"
          onPress={() => onCreateQuiz(roomId)}
          width="80"
        />
        <Button
          title="Voltar"
          onPress={() => handleGoBack()}
          variant="outline"
          mt={4}
          width="80"
          mb={6}
        />
      
    </VStack>
  
   
  );
}
