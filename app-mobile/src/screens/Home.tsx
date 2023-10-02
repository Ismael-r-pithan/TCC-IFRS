import { Button } from "@components/Button";
import { HomeHeader } from "@components/HomeHeader";

import { useNavigation } from "@react-navigation/native";
import { PrivateNavigatorRoutesProps } from "@routes/private.routes";
import { Center, ScrollView, VStack } from "native-base";
import React, { useEffect } from "react";


export function Home() {
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();

  useEffect(() => {
    setTimeout(() => {
      console.log('load home screen');
    }, 1000);
  }, [])

  function handleStudent() {
    navigation.navigate("student");
  }

  function handleEducator() {
    navigation.navigate("educator");
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
            title="Educador"
            backgroundColor="green.800"
            mb={4}
            onPress={handleEducator}
          />
          <Button
            title="Aluno"
            backgroundColor="green.800"
            mb={32}
            onPress={handleStudent}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
