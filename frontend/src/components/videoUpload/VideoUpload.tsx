import React, { useState } from "react";

interface VideoUploadProps {
  onChange: (files: File[]) => void;
}

interface Video {
  videoTitle: string;
  videoExtension: File | null;
}

interface VideoSection {
  sectionTitle: string;
  videoList: Video[];
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onChange }) => {
  const [videoSections, setVideoSections] = useState<VideoSection[]>([]);

  const handleAddSection = () => {
    setVideoSections((prevSections) => [
      ...prevSections,
      { sectionTitle: "", videoList: [] },
    ]);
  };

  const handleSectionTitleChange = (index: number, title: string) => {
    const updatedSections = [...videoSections];
    updatedSections[index].sectionTitle = title;
    setVideoSections(updatedSections);
  };

  const handleVideoFileChange = (
    sectionIndex: number,
    videoIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const updatedSections = [...videoSections];

    if (!updatedSections[sectionIndex]) {
      updatedSections[sectionIndex] = { sectionTitle: "", videoList: [] };
    }

    const currentVideoList = updatedSections[sectionIndex].videoList;

    if (!currentVideoList[videoIndex]) {
      currentVideoList[videoIndex] = { videoTitle: "", videoExtension: null };
    }

    if (file) {
      const { sectionTitle } = updatedSections[sectionIndex];

      const newFileName = `${sectionTitle}_${file.name}`;

      currentVideoList[videoIndex].videoExtension = new File(
        [file],
        newFileName,
        { type: file.type }
      );

      setVideoSections(updatedSections);

      const allFiles = videoSections.flatMap((section) =>
        section.videoList
          .filter((video) => video.videoExtension)
          .map((video) => video.videoExtension as File)
      );

      onChange(allFiles);
    }
  };

  const handleAddVideo = (sectionIndex: number) => {
    const updatedSections = [...videoSections];
    if (!updatedSections[sectionIndex]) {
      updatedSections[sectionIndex] = { sectionTitle: "", videoList: [] };
    }
    updatedSections[sectionIndex].videoList.push({
      videoTitle: "",
      videoExtension: null,
    });
    setVideoSections(updatedSections);
  };

  return (
    <div className="my-5 mx-auto flex flex-col gap-4 items-center">
      <button
        onClick={handleAddSection}
        className="rounded-lg relative w-40 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
      >
        <span className="text-gray-200 font-semibold ml-7 transform group-hover:translate-x-20 transition-all duration-300">
          Add Section
        </span>
        <span className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg
            className="svg w-8 text-white"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" x2="12" y1="5" y2="19"></line>
            <line x1="5" x2="19" y1="12" y2="12"></line>
          </svg>
        </span>
      </button>
      {videoSections.map((section, sectionIndex) => (
        <div className="flex flex-col gap-4 items-center" key={sectionIndex}>
          <input
            type="text"
            className="outline-none border border-gray-50 px-4 py-2 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={section.sectionTitle}
            onChange={(e) =>
              handleSectionTitleChange(sectionIndex, e.target.value)
            }
            placeholder={`Section ${sectionIndex + 1} Title`}
          />
          {section.videoList.map((video, videoIndex) => (
            <div
              key={videoIndex}
              className="grid w-full max-w-xs items-center gap-1.5"
            >
              <input
                className="flex w-full rounded-md border border-blue-300 border-input bg-white text-sm text-gray-400 file:border-0 file:bg-blue-600 file:text-white file:text-sm file:font-medium"
                type="file"
                name="video"
                onChange={(e) =>
                  handleVideoFileChange(sectionIndex, videoIndex, e)
                }
              />
            </div>
          ))}

          <button
            onClick={() => handleAddVideo(sectionIndex)}
            className="rounded-lg relative w-40 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
          >
            <span className="text-gray-200 font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300">
              Add Video
            </span>
            <span className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
              <svg
                className="svg w-8 text-white"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default VideoUpload;
