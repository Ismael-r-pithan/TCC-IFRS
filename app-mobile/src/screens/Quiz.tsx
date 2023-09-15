import { Button } from "@components/Button";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  PrivateNavigatorRoutesProps,
  PrivateRoutes,
} from "@routes/private.routes";
import {
  AlertDialog,
  Center,
  Radio,
  ScrollView,
  Text,
  VStack,
  Button as Btn,
  useToast,
} from "native-base";
import { useEffect, useState } from "react";
import { useQuestionList } from "@hooks/useQuestionList";
import React from "react";
import { httpClient } from "@services/HttpClient";
import { AppError } from "@shared/AppError";

type QuizRouteProp = RouteProp<PrivateRoutes, "quiz"> & {
  params: {
    codigoQuiz: string;
  };
};

type QuizFeedback = {
  description: string;
  questionAnswer: number;
  studentAnswer: number;
}

type QuizHistoryProps = {
  quizFeedback: QuizFeedback[];
  totalCorrectAnswer: number;
  totalWrongAnswers:number;
};

export function Quiz() {
  const route = useRoute<QuizRouteProp>();
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();
  const [answer, setAnswer] = useState<number[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<number>();
  const { handleCodigoQuiz, handlePage, questions, totalPages } =
    useQuestionList();
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [hits, setHits] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const toast = useToast();
 
  const { codigoQuiz } = route.params;
  const [valueRequired, setValueRequired] = useState(false);

  useEffect(() => {
    handlePage(page);
    handleCodigoQuiz(codigoQuiz);
  }, [page, codigoQuiz]);

  function goFeedbackQuizDetails() {
    setIsOpen(false);
    navigation.navigate("feedback_quiz", { codigoQuiz });
  }

  function cleanStates() {
    setAnswer([]);
    setPage(1);
  }

  async function handleQuiz() {
    if (!valueRequired) {
      toast.show({
        title: "Selecione pelo menos uma resposta",
        backgroundColor: "red.500",
        placement: "top",
      });
      return;
    }
    setAnswer((answers) => [...answers, Number(currentAnswer)]);
    if (!currentAnswer) {
      setValueRequired(false);
    }
    setPage((page) => (page < totalPages ? page + 1 : page));
    if (page === totalPages) {
      try {
        const { data } = await httpClient.post(
          `/quizzes/${codigoQuiz}/answer_quiz`,
          { quizAnswers: [...answer, Number(currentAnswer)] }
        );
        const response = data as QuizHistoryProps;
        setHits(response.totalCorrectAnswer);
        setWrongs(response.totalWrongAnswers);
        setIsOpen(true);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const title = isAppError
          ? error.message
          : "Não foi possível criar a questão, Tente novamente mais tarde";
        toast.show({
          title,
          backgroundColor: "red.500",
          placement: "top",
        });
        cleanStates();
        navigation.navigate("home");
      } finally {
        cleanStates();
      }
    }
  }

  return (
    <VStack flex={1} px={6} my={16}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Center alignItems="flex-start" justifyContent="flex-start">
          <Text color="white" mb={8} fontSize="md" fontWeight="extrabold">
            {questions.description}
          </Text>
          <Radio.Group
            onChange={(value) => {
              setCurrentAnswer(Number(value));
              setValueRequired(true);
            }}
            name="options"
            accessibilityLabel="Opção de resposta do quiz"
          >
            <Radio value="1">
              <Text padding={4} color="white">
                {questions.alternativeOne}
              </Text>
            </Radio>
            <Radio value="2">
              <Text padding={4} color="white">
                {questions.alternativeTwo}
              </Text>
            </Radio>
            <Radio value="3">
              <Text padding={4} color="white">
                {questions.alternativeThree}
              </Text>
            </Radio>
            <Radio value="4">
              <Text padding={4} color="white">
                {questions.alternativeFour}
              </Text>
            </Radio>
            <Radio value="5">
              <Text padding={4} color="white">
                {questions.alternativeFive}
              </Text>
            </Radio>
          </Radio.Group>
          <Button
            title="Responder"
            backgroundColor="green.800"
            mt={8}
            variant="outline"
            onPress={handleQuiz}
          />

          {isOpen && (
            <AlertDialog
              leastDestructiveRef={cancelRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Body>Acertos: {hits}</AlertDialog.Body>
                <AlertDialog.Body>Erros: {wrongs}</AlertDialog.Body>
                <AlertDialog.Footer>
                  <Btn.Group space={2}>
                    <Btn colorScheme="info" onPress={goFeedbackQuizDetails}>
                      Ok
                    </Btn>
                  </Btn.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
          )}
        </Center>
      </ScrollView>
    </VStack>
  );
}
