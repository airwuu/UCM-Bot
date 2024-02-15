import { getEnvVar} from "./utils/index.js";

export const Keys = {
    clientToken: getEnvVar('CLIENT_TOKEN'),
    clientID: getEnvVar('CLIENT_ID'),
    guildID: getEnvVar('GUILD_ID'),
}as const;

export default Keys;