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
type halfVideo = {
  sectionTitle: string;
  _id: string;
  videoList: [
    {
      videoName: string;
      comments: string[];
      _id: string;
    },
  ];
};
type vid = {
  _id: string;
  videoName: string;
};
