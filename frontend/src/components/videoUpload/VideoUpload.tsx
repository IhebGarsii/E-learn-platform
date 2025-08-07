import React, { useState, useEffect } from "react";

interface VideoUploadProps {
  onChange: (
    sections: {
      sectionTitle: string;
      videoList: { videoTitle: string; file: File }[];
    }[]
  ) => void;
}

interface Video {
  videoTitle: string;
  file: File | null;
}

interface VideoSection {
  sectionTitle: string;
  videoList: Video[];
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onChange }) => {
  const [videoSections, setVideoSections] = useState<VideoSection[]>([]);

  const handleAddSection = () => {
    setVideoSections((prev) => [...prev, { sectionTitle: "", videoList: [] }]);
  };

  const handleSectionTitleChange = (index: number, title: string) => {
    const updated = [...videoSections];
    updated[index].sectionTitle = title;
    setVideoSections(updated);
  };

  const handleAddVideo = (sectionIndex: number) => {
    const updated = [...videoSections];
    updated[sectionIndex].videoList.push({ videoTitle: "", file: null });
    setVideoSections(updated);
  };

  const handleVideoFileChange = (
    sectionIndex: number,
    videoIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const updated = [...videoSections];
    const section = updated[sectionIndex];

    // Require section title before adding file
    if (!section.sectionTitle.trim()) {
      alert("Please enter a section title before uploading videos.");
      return;
    }

    // Derive videoTitle from file name without extension
    const videoTitle = file.name.replace(/\.[^/.]+$/, "");

    section.videoList[videoIndex] = {
      videoTitle,
      file,
    };

    setVideoSections(updated);
  };

  // Notify parent of structured data whenever videoSections changes
  useEffect(() => {
    // Filter out incomplete videos (file is null or sectionTitle empty)
    const validSections = videoSections
      .filter((section) => section.sectionTitle.trim() !== "")
      .map((section) => ({
        sectionTitle: section.sectionTitle.trim(),
        videoList: section.videoList.filter((video) => video.file !== null) as {
          videoTitle: string;
          file: File;
        }[],
      }));

    onChange(validSections);
  }, [videoSections, onChange]);

  return (
    <div className="my-5 mx-auto flex flex-col gap-4 items-center">
      <button
        onClick={handleAddSection}
        className="rounded-lg relative w-40 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-600 active:bg-green-700"
      >
        <span className="text-gray-200 font-semibold ml-7">Add Section</span>
      </button>

      {videoSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="flex flex-col gap-4 items-center">
          <input
            type="text"
            className="outline-none border border-gray-300 px-4 py-2 rounded-lg"
            placeholder={`Section ${sectionIndex + 1} Title`}
            value={section.sectionTitle}
            onChange={(e) =>
              handleSectionTitleChange(sectionIndex, e.target.value)
            }
          />
          {section.videoList.map((video, videoIndex) => (
            <div key={videoIndex} className="w-full max-w-xs">
              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  handleVideoFileChange(sectionIndex, videoIndex, e)
                }
                className="w-full"
              />
              {video.videoTitle && (
                <p className="text-sm mt-1">{video.videoTitle}</p>
              )}
            </div>
          ))}
          <button
            onClick={() => handleAddVideo(sectionIndex)}
            className="rounded-lg w-40 h-10 cursor-pointer border border-blue-500 bg-blue-500 text-white"
          >
            Add Video
          </button>
        </div>
      ))}
    </div>
  );
};

export default VideoUpload;
