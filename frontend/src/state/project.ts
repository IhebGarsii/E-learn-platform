import { createGlobalState } from ".";
import { project } from "../types/project";

export const useProjectState = createGlobalState<project>("project");
