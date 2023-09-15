import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";


type PublicRoutes = {
    signIn: undefined;
    signUp: undefined;
}

export type PublicNavigatorRoutesProps = NativeStackNavigationProp<PublicRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<PublicRoutes>();

export function PublicRoutes() {
    return (
        <Navigator screenOptions={{  headerShown: false }}>
            <Screen
                name="signIn"
                component={SignIn}
            />
            <Screen
                name="signUp"
                component={SignUp}
            />        
        </Navigator>
    );
}