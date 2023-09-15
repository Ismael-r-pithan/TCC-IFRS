import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDto } from "@dtos/UserDto";
import { USER_STORAGE } from "@storage/StorageKeys";

export async function saveUserInStorage(user: UserDto) {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function findUserInStorage() {
    const storage = await AsyncStorage.getItem(USER_STORAGE);

    const user: UserDto = storage ? JSON.parse(storage) : {};

    return user;
}

export async function removeUserInStorage() {
    await AsyncStorage.removeItem(USER_STORAGE);
}