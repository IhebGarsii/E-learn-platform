import { createGlobalState } from ".";
import { instructor } from "../types/instructor";

export const useUserState = createGlobalState<instructor>("user");
