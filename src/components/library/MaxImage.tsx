import {
  ArrowDownTrayIcon,
  LinkIcon,
  EyeIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import React, { useEffect, useRef } from "react";

interface Image {
  id: number;
  title: string;
  image_file: string;
  reference: number;
}

interface imageProps {
  onClose: () => void;
  content: Image | null;
}

function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  onClose: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      const target = event.target as HTMLElement;
      if (
        ref.current &&
        !ref.current.contains(target) &&
        !target.closest("button")
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
}

const MaxImage = ({ onClose, content }: imageProps) => {
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, onClose);
  return (
    <div className="max-w-[100%] mx-auto">
      <div className="flex flex-row justify-center items-center p-16">
        <div className="w-1/12"></div>
        <div className="relative w-[70%]" ref={wrapperRef}>
          <img
            src={content?.image_file}
            alt="img"
            className="h-full min-w-[70%] object-cover rounded-lg"
          ></img>
          {/* Close button in the top-right corner */}
          <button
            className="absolute top-4 right-4 p-2 bg-brandgray-500/50 hover:bg-brandgray-500/70 active:bg-brandgray-500 rounded-full"
            onClick={() => {
              onClose();
            }}
          >
            <XMarkIcon className="h-6 w-6 text-brandtext" />
          </button>
        </div>
        <div className="w-1/12">
          {/* download button round */}
          <button
            onClick={
              // download image
              () => {
                const downloadLink = document.createElement("a");
                // downloadLink.href = src;
                downloadLink.download = "test.jpg";
                downloadLink.target = "_blank";
                downloadLink.click();
                document.body.removeChild(downloadLink);
              }
            }
            className="flex flex-row p-4 m-4 justify-center items-center bg-brandgray-500/50 hover:bg-brandgray-500/70 active:bg-brandgray-500 rounded-full"
          >
            <ArrowDownTrayIcon className="h-6 w-6 text-brandtext" />
          </button>
          <button className="flex flex-row p-4 m-4 justify-center items-center bg-brandgray-500/50 hover:bg-brandgray-500/70 active:bg-brandgray-500 rounded-full">
            <LinkIcon className="h-6 w-6 text-brandtext" />
          </button>
          <button className="flex flex-col p-4 m-4 justify-center items-center bg-brandgray-500/50 hover:bg-brandgray-500/70 active:bg-brandgray-500 rounded-full space-y-2">
            <HandThumbUpIcon className="h-6 w-6 text-brandtext" />
            <p className="text-sm">288</p>
          </button>
          <button className="flex flex-col p-4 m-4 justify-center items-center bg-brandgray-500/50 hover:bg-brandgray-500/70 active:bg-brandgray-500 rounded-full space-y-2">
            <HandThumbDownIcon className="h-6 w-6 text-brandtext" />
            <p className="text-sm">288</p>
          </button>
          <button className="flex flex-col p-4 m-4 justify-center items-center bg-brandgray-500/50 rounded-full space-y-2">
            <EyeIcon className="h-6 w-6 text-brandtext" />
            <p className="text-sm">288</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaxImage;
