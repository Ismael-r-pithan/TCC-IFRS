import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Box } from "native-base";
import { PrivateRoutes } from "./private.routes";
import { PublicRoutes } from "./public.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";



export function Routes() {

    const { user, isLoadingUserStorage } = useAuth();

    const theme = DefaultTheme;
    const nativeTheme = useTheme();

    theme.colors.background = nativeTheme.colors.gray[600]

    if (isLoadingUserStorage) {
        return (
            <Loading />
        );
    }

    return (
        <Box flex={1} bg="gray.600">
            <NavigationContainer>
                { user.id ? <PrivateRoutes /> : <PublicRoutes /> }
            </NavigationContainer>
        </Box>
    );
}