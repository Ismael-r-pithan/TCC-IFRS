import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";

import { EducatorScreen } from "@screens/Educator";
import { Profile } from "@screens/Profile";
import { Quiz } from "@screens/Quiz";
import { CreateRoom } from "@screens/CreateRoom";

import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg";
import { ListRoom } from "@screens/ListRoom";
import { CreateQuiz } from "@screens/CreateQuiz";
import { CreateQuestion } from "@screens/CreateQuestion";
import { Home } from "@screens/Home";
import { FeedbackQuiz } from "@screens/FeedbackQuiz";
import { FeedbackRooms } from "@screens/FeedbackRooms";
import { ListQuizzes } from "@screens/ListQuizzes";
import { FeedbackStudents } from "@screens/FeedbackStudents";
import { ListStudents } from "@screens/ListStudents";
import { StudentScreen } from "@screens/Student";

export type PrivateRoutes = {
  home: undefined;
  quiz: { codigoQuiz: string };
  profile: undefined;
  educator: undefined;
  student: undefined;

  create_room: { roomId?: string, roomName?: string };
  create_quiz: { roomId: string };
  create_question: { codigoQuiz: string, roomId: string };

  list_room: undefined;
  list_quizzes: { roomId: string};
  list_students: { roomId: string, codigoQuiz: string };
  
  feedback: undefined;
  feedback_quiz: { studentId?: string, codigoQuiz: string, roomId?: string };
  feedback_rooms: undefined;
  feedback_students: undefined;
};

export type PrivateNavigatorRoutesProps =
  BottomTabNavigationProp<PrivateRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<PrivateRoutes>();

export function PrivateRoutes() {
  const { colors, sizes } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[600],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="feedback"
        component={FeedbackStudents}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="create_room"
        component={CreateRoom}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="list_room"
        component={ListRoom}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="educator"
        component={EducatorScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
       <Screen
        name="student"
        component={StudentScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="list_quizzes"
        component={ListQuizzes}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="list_students"
        component={ListStudents}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="quiz"
        component={Quiz}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="create_quiz"
        component={CreateQuiz}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="create_question"
        component={CreateQuestion}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="feedback_quiz"
        component={FeedbackQuiz}
        options={{
          tabBarButton: () => null,
        }}
      />
      {/* <Screen
        name="feedback_rooms"
        component={FeedbackRooms}
        options={{
          tabBarButton: () => null,
        }}
      /> */}
      <Screen
        name="feedback_students"
        component={FeedbackStudents}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
