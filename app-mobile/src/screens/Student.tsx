import { Button } from "@components/Button";
import { HomeHeader } from "@components/HomeHeader";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { PrivateNavigatorRoutesProps } from "@routes/private.routes";
import { Center, ScrollView, VStack } from "native-base";
import { useState } from "react";

export function StudentScreen() {
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();

  const [codigoQuiz, setCodigoQuiz] = useState("");

  function handleCreateRoom() {
    navigation.navigate("create_room", {});
  }

  function handleMyResults() {
    navigation.navigate("feedback_students");
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
            title="Meus Resultados"
            backgroundColor="green.800"
            width={80}
            mb={4}
            onPress={handleMyResults}
          />
          <Input
            placeholder="Codigo Quiz"
            backgroundColor="gray.400"
            placeholderTextColor="gray.200"
            width={80}
            onChangeText={(text) => setCodigoQuiz(text)}
            textAlign={"center"}
          />
         
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
