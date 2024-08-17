export type video = {
  _id: string;

  sectionTitle: string;
  videoList: File[];
};

export type videoResponse = {
  sectionTitle: string;
  videoList: vid[];
};
type vid = {
  _id: string;
  videoName: string;
};
