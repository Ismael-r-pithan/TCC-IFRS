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
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();

  function handleListQuizzes(roomId: string) {
    return navigation.navigate("list_quizzes", { roomId: roomId });
  }

  function handleGoBack() {
    return navigation.navigate('home');
  }

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
  useFocusEffect(
    React.useCallback(() => {
      listRooms();
    }, [])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />
      <Center my={16} px={10} justifyContent="space-between" flex={1}>
      <>
        <Heading color={"gray.100"} mb={6} fontSize={"lg"}>Minhas Turmas</Heading>
        <FlatList
          data={rooms}
          renderItem={({ item }) => (
            <RoomCard onPress={() => handleListQuizzes(item.id)} data={item} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </>
        <Button
            title="Voltar"
            backgroundColor="green.800"
            onPress={handleGoBack}
          />
      </Center>
    </VStack>
  );
}
