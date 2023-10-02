import { Button } from "@components/Button";
import { HomeHeader } from "@components/HomeHeader";
import { RoomCard } from "@components/RoomCard";
import { RoomDTO } from "@dtos/RoomDto";
import { useNavigation, useFocusEffect  } from "@react-navigation/native";
import { PrivateNavigatorRoutesProps } from "@routes/private.routes";
import { httpClient } from "@services/HttpClient";
import { AppError } from "@shared/AppError";
import { Center, FlatList, Heading, VStack, useToast } from "native-base";
import React from "react";
import { useEffect, useState } from "react";

export function ListRoom() {
  const [rooms, setRooms] = useState<RoomDTO[]>([]);
  const toast = useToast();
  const [action, setAction] = useState(false);
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();


  function handleListQuizzes(roomId: string) {
    return navigation.navigate("list_quizzes", { roomId: roomId });
  }

  function handleGoBack() {
    return navigation.navigate('educator');
  }

  const onRemove = () => setAction(!action);

  async function listRooms() {
    try {
      const { data } = await httpClient.get("/rooms");
      setRooms(data);
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

  async function handleDelete(roomId: string) {
    try {
      await httpClient.delete(`/rooms/${roomId}`);
      onRemove()
      toast.show({
        title: 'Turma Removida Com Sucesso',
        backgroundColor: "green.500",
        placement: "top"
      })
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível excluir a turma no momento, tente novamente mais tarde";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  function handleEdit(roomId: string, roomName: string) {
    navigation.navigate('create_room', { roomId, roomName });
  }

  useFocusEffect(
    React.useCallback(() => {
      listRooms();
    }, [action])
  );

  return (
    <VStack alignItems={"center"} flex={1}>
      <HomeHeader />
        <Heading color={"gray.100"} mb={6} mt={6} fontSize={"lg"}>Minhas Turmas</Heading>
        <FlatList
          data={rooms}
          renderItem={({ item }) => (
            <RoomCard 
              onPress={() => handleListQuizzes(item.id)} 
              data={item} 
              onDelete={() => handleDelete(item.id)} 
              onEdit={() => handleEdit(item.id, item.name)} 
            />
          )}
          showsVerticalScrollIndicator={false}
        />
        <Button
            title="Voltar"
            backgroundColor="green.800"
            onPress={handleGoBack}
            mt={4}
            mb={4}
            w={80}
          />
    </VStack>
  );
}
