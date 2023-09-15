import { HomeHeader } from "@components/HomeHeader";
import { RoomCard } from "@components/RoomCard";
import { RoomDTO } from "@dtos/RoomDto";
import { useNavigation } from "@react-navigation/native";
import { PrivateNavigatorRoutesProps } from "@routes/private.routes";
import { httpClient } from "@services/HttpClient";
import { AppError } from "@shared/AppError";
import { Center, FlatList, Heading, VStack, useToast } from "native-base";
import { useEffect, useState } from "react";

export function FeedbackRooms() {
  const [rooms, setRooms] = useState<RoomDTO[]>([]);
  const toast = useToast();
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();

  function handleCreateQuiz(id: string) {
    return navigation.navigate("create_quiz", { roomId: id });
  }

  async function listRooms() {
    try {
      const { data } = await httpClient.get("/rooms");
      setRooms(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar a Sala do Quiz";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }
  useEffect(() => {
    listRooms();
  }, []);
  return (
    <VStack flex={1}>
      <HomeHeader />

      <Center my={16} px={10}>
        <Heading color={"gray.100"} mb={6} fontSize={"lg"}>Minhas Turmas</Heading>
        <FlatList
          data={rooms}
          renderItem={({ item }) => (
            <RoomCard onPress={() => handleCreateQuiz(item.id)} data={item} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </Center>
    </VStack>
  );
}
