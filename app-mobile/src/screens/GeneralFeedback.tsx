import { Button } from "@components/Button";
import { HomeHeader } from "@components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { PrivateNavigatorRoutesProps } from "@routes/private.routes";
import { Center, ScrollView, VStack } from "native-base";

export function GeneralFeedback() {
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();


  function handleFeedbackStudent() {
    navigation.navigate("feedback_students");
  }

  function handleListkRooms() {
    navigation.navigate("list_room");
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
            title="Professor"
            backgroundColor="green.800"
            mb={4}
            onPress={handleListkRooms}
          />
          <Button
            title="Aluno"
            backgroundColor="green.800"
            mb={32}
            onPress={handleFeedbackStudent}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
