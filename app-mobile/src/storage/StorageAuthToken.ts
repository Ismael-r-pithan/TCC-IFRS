import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_STORAGE } from "@storage/StorageKeys";

export async function saveTokenInStorage(token: string) {
    await AsyncStorage.setItem(TOKEN_STORAGE, token);
}

export async function findTokenInStorage() {
    return await AsyncStorage.getItem(TOKEN_STORAGE);
}

export async function removeTokenInStorage() {
    await AsyncStorage.removeItem(TOKEN_STORAGE);
}