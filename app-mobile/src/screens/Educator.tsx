import { Button } from "@components/Button";
import { HomeHeader } from "@components/HomeHeader";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { PrivateNavigatorRoutesProps } from "@routes/private.routes";
import { Center, ScrollView, VStack } from "native-base";
import { useState } from "react";

export function EducatorScreen() {
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();

  const [codigoQuiz, setCodigoQuiz] = useState("");

  function handleCreateRoom() {
    navigation.navigate("create_room", {});
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

  function handleGoBack() {
    return navigation.navigate("home");
}

  return (
    <VStack flex={1} alignItems={"center"}>
      <HomeHeader />
        <Center my={24} px={8} flex={1}>
          
          <Button
            title="Criar Turma"
            backgroundColor="green.800"
            mb={4}
            onPress={handleCreateRoom}
            width={80}
          />
          <Button
            title="Selecionar Turma"
            backgroundColor="green.800"
            width={80}
            onPress={handleListRoom}
          />
          {/* <Input
            placeholder="Codigo Quiz"
            backgroundColor="gray.400"
            placeholderTextColor="gray.200"
            onChangeText={(text) => setCodigoQuiz(text)}
          />
          */}
         
        </Center>
        <Button
            title="Voltar"
            backgroundColor="green.800"
            width={80}
            variant="outline"
            onPress={handleGoBack}
            my={24} 
          /> 
    </VStack>
  );
}
