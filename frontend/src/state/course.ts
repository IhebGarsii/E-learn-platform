import { createGlobalState } from ".";
import { cousers } from "../types/course";

export const useCourseState = createGlobalState<cousers>("course");
