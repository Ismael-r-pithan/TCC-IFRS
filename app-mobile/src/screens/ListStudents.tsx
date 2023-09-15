import { Button } from "@components/Button";
import { HomeHeader } from "@components/HomeHeader";
import { RoomCard } from "@components/RoomCard";
import { StudentCard } from "@components/StudentCard";
import { UserDto } from "@dtos/UserDto";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { PrivateNavigatorRoutesProps, PrivateRoutes } from "@routes/private.routes";
import { httpClient } from "@services/HttpClient";
import { AppError } from "@shared/AppError";
import { Center, FlatList, Heading, VStack, useToast } from "native-base";
import { useEffect, useState } from "react";

export function ListStudents() {
  const [students, setStudents] = useState<UserDto[]>([]);
  const toast = useToast();

  const navigation = useNavigation<PrivateNavigatorRoutesProps>();
  
  type ListStudentsRouteProp = RouteProp<PrivateRoutes, "list_students"> & {
    params: {
      roomId: string;
      codigoQuiz: string;
    };
  };
  

  const route = useRoute<ListStudentsRouteProp>();
  const { roomId, codigoQuiz } = route.params;

  function handleFeedbackStudent(studentId: string, codigoQuiz: string) {
    return navigation.navigate("feedback_quiz", { studentId: studentId, codigoQuiz: codigoQuiz, roomId: roomId });
  }

  function handleGoBack() {
    return navigation.navigate("list_quizzes", { roomId: roomId });
  }

  async function listStudents() {
    try {
      const { data } = await httpClient.get(`/rooms/${roomId}/quizzes/${codigoQuiz}`);
      setStudents(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os alunos da sala";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }
  useEffect(() => {
    listStudents();
  }, []);
  return (
    <VStack flex={1}>
      <HomeHeader />
      <Center my={16} px={10} justifyContent="space-between" flex={1}>
        <>
        <Heading color={"gray.100"} mb={6} fontSize={"lg"}>Alunos que Realizaram o Quiz</Heading>
        <FlatList
          data={students}
          renderItem={({ item }) => (
            <StudentCard onPress={() => handleFeedbackStudent(item.id, codigoQuiz)} data={item} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </>
        <Button
          title="Voltar"
          onPress={() => handleGoBack()}
          mt={4}
        />
      </Center>
    </VStack>
  );
}
