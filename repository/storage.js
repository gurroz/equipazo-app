import { MMKV } from "react-native-mmkv";

const teamStorage = new MMKV({ id: "teams" });
const configStorage = new MMKV({ id: "config" });

export {
    teamStorage,
    configStorage
}