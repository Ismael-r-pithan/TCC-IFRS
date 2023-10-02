export type FeedbackDTO = {
    quizFeedback: QuizFeedback[];
    totalCorrectAnswer: number;
    totalWrongAnswers: number;
}

export type QuizFeedback = {
    id: string;
    description: string;
    questionAnswer: number;
    studentAnswer: number;
}

