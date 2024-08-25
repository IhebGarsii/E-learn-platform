import { instructor } from "./instructor";
import { video } from "./video";

export type cousers = {
  articles: string;
  description: string;
  downloadNb: string;
  duration: string;
  format: string;
  headTags: string[];
  instructorId: instructor | string;
  language: string;
  learnTarget: string[];
  price: number;
  studentsId: string[];
  tags: string[];
  thumbnail: string;
  timeAccess: string;
  avgRate: rate;
  title: string;
  video: video;
  videoDuration: string;
  _id: string;
  difficultyLevel: string;
  requirements: string;
  secondTitle: string;
};
export type rate = {
  rate: number;
  nbRate: number;
};
