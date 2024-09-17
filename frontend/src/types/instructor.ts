import { certification } from "./certifications";
import { cousers, rate } from "./course";
import { project } from "./project";

export type instructor = {
  courses: cousers[];
  createdAt: Date;
  email: string;
  firstName: string;
  image: string;
  lastName: string;
  password: string;
  roles: string[];
  updatedAt: Date;
  avgRate: rate;
  aboutMe: string;
  projects: (project | string)[];
  _id: string;
  experience: number;
  education: string;
  languages: string[];
  skills: string[];
  degree: string;
  certifications: certification;
};
