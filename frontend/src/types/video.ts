export type video = {
  sectionTitle: string;
  videoList: File[];
  _id: string;
};

export type videoResponse = {
  sectionTitle: string;
  videoList: vid[];
};
type vid = {
  _id: string;
  videoName: string;
};
