import { MMKV } from "react-native-mmkv";

const teamStorage = new MMKV({ id: "teams" });
const configStorage = new MMKV({ id: "config" });
const formationsStorage = new MMKV({ id: "formations" });

export {
    teamStorage,
    configStorage,
    formationsStorage
}