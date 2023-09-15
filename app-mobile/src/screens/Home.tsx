import { Button } from "@components/Button";
import { HomeHeader } from "@components/HomeHeader";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { PrivateNavigatorRoutesProps } from "@routes/private.routes";
import { Center, ScrollView, VStack } from "native-base";
import { useState } from "react";

export function Home() {
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();

  const [codigoQuiz, setCodigoQuiz] = useState("");

  function handleCreateRoom() {
    navigation.navigate("create_room");
  }

  function handleListRoom() {
    navigation.navigate("list_room");
  }

  function onEnterQuiz() {
    // TODO: Validar se o quiz existe !!
    if (codigoQuiz) {
      navigation.navigate("quiz", { codigoQuiz });
    }
  }

  return (
    <VStack flex={1}>
      <HomeHeader />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Center my={24} px={8}>
          <Button
            title="Criar Turma"
            backgroundColor="green.800"
            mb={4}
            onPress={handleCreateRoom}
          />
          <Button
            title="Selecionar Turma"
            backgroundColor="green.800"
            mb={32}
            onPress={handleListRoom}
          />
          <Input
            placeholder="Codigo Quiz"
            backgroundColor="gray.400"
            placeholderTextColor="gray.200"
            onChangeText={(text) => setCodigoQuiz(text)}
          />
          <Button
            title="Entrar"
            backgroundColor="green.800"
            mb={8}
            variant="outline"
            onPress={onEnterQuiz}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
