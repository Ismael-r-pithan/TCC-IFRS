import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  PrivateNavigatorRoutesProps,
  PrivateRoutes,
} from "@routes/private.routes";
import {
  AlertDialog,
  Button as Btn,
  Center,
  ScrollView,
  TextArea,
  VStack,
  useToast,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@components/Input";
import { httpClient } from "@services/HttpClient";
import { useState } from "react";
import { AppError } from "@shared/AppError";
import { createQuestionValidator } from "@validators/CreateQuestionValidator";
import React from "react";

type CreateQuestionRouteProp = RouteProp<PrivateRoutes, "create_question"> & {
  params: {
    codigoQuiz: string;
    roomId: string;
  };
};

export type CreateQuestionProps = {
  question: string;
  alternative_one: string;
  alternative_two: string;
  alternative_three: string;
  alternative_four: string;
  alternative_five: string;
  question_answer: string;
};

export function CreateQuestion() {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute<CreateQuestionRouteProp>();
  const { codigoQuiz, roomId } = route.params;
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const cancelRef = React.useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateQuestionProps>({
    resolver: yupResolver(createQuestionValidator),
  });
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();
  const toast = useToast();

  async function handleCreateQuestion({
    question,
    alternative_one,
    alternative_two,
    alternative_three,
    alternative_four,
    alternative_five,
    question_answer,
  }: CreateQuestionProps) {
    try {
      await httpClient.post(`/quizzes/${codigoQuiz}/questions`, {
        description: question,
        alternativeOne: alternative_one,
        alternativeTwo: alternative_two,
        alternativeThree: alternative_three,
        alternativeFour: alternative_four,
        alternativeFive: alternative_five,
        questionAnswer: question_answer,
      });
      reset();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a questão, Tente novamente mais tarde";
      setIsLoading(false);
      toast.show({
        title,
        backgroundColor: "red.500",
        placement: "top",
      });
    }
  }

  async function handleCreateQuiz() {
    navigation.navigate("list_quizzes", { roomId: roomId });
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={4}>
        <Center my={8}>
          <Controller
            control={control}
            name="question"
            render={({ field: { onChange, value } }) => (
              <TextArea
                placeholder="Informe a questão..."
                totalLines={24}
                minHeight={40}
                backgroundColor="gray.400"
                height={24}
                mt={16}
                width="full"
                borderWidth={0}
                fontSize="md"
                color="white"
                placeholderTextColor="white"
                focusOutlineColor="green.500"
                _focus={{
                  bg: "gray.800",
                  borderWidth: 1,
                }}
                value={value}
                mb={8}
                onChangeText={onChange}
                autoCompleteType={undefined}
              />
            )}
          />

          <Controller
            control={control}
            name="alternative_one"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Informe a primeira alternativa"
                placeholderTextColor="gray.100"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.alternative_one?.message}
                label="1"
                width="95%"
              />
            )}
          />

          <Controller
            control={control}
            name="alternative_two"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Informe a segunda alternativa"
                placeholderTextColor="gray.100"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.alternative_two?.message}
                label="2"
                width="95%"
              />
            )}
          />

          <Controller
            control={control}
            name="alternative_three"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Informe a terceira alternativa"
                placeholderTextColor="gray.100"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.alternative_three?.message}
                label="3"
                width="95%"
              />
            )}
          />

          <Controller
            control={control}
            name="alternative_four"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Informe a quarta alternativa"
                placeholderTextColor="gray.100"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.alternative_four?.message}
                label="4"
                width="95%"
              />
            )}
          />

          <Controller
            control={control}
            name="alternative_five"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Informe a quinta alternativa"
                placeholderTextColor="gray.100"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.alternative_five?.message}
                label="5"
                width="95%"
              />
            )}
          />

          <Controller
            control={control}
            name="question_answer"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Numero da questão com a resposta"
                placeholderTextColor="gray.100"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.question_answer?.message}
                width="95%"
                label="*"
                mb="4"
              />
            )}
          />

          <Button
            title="Criar Questão"
            onPress={handleSubmit(handleCreateQuestion)}
            isLoading={isLoading}
            mb="2"
          />
        </Center>

        <Button
          mt={2}
          mb={8}
          title="Criar Quiz"
          variant="outline"
          onPress={onOpen}
        />

        {isOpen && (
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Body>{codigoQuiz}</AlertDialog.Body>
              <AlertDialog.Footer>
                <Btn.Group space={2}>
                  <Btn colorScheme="info" onPress={handleCreateQuiz}>
                    Ok
                  </Btn>
                </Btn.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        )}
      </VStack>
    </ScrollView>
  );
}
