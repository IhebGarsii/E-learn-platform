export type video = {
  _id: string;
  sectionTitle: string;
  videoList: File[];
};

export type videoResponse = {
  sectionTitle: string;
  videoList: vid[];
};
export type fullVideo = {
  instructorId: string;
  video: halfVideo[];
  _id: string;
};
export type halfVideo = {
  sectionTitle: string;
  _id: string;
  videoList: [
    {
      videoName: string;
      duration: number;
      comments: string[];
      _id: string;
    },
  ];
};
type vid = {
  _id: string;
  videoName: string;
};
