import React, { useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const VideoPreviewModal = ({
  isOpen,
  videoUrl,
  onClose,
}: {
  isOpen: boolean;
  videoUrl: string | null;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      AOS.refresh();
    }
  }, [isOpen]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleVideoEnd = () => {
        onClose();
      };

      videoElement.addEventListener("ended", handleVideoEnd);

      return () => {
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [videoUrl, onClose]);

  if (!isOpen || !videoUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      data-aos="fade-in"
      data-aos-duration="600"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-[80%] max-w-3xl relative overflow-hidden"
        data-aos="zoom-in"
        data-aos-duration="600"
      >
        <button
          className="absolute -top-2 z-20 -right-0.5 text-red-500 text-2xl font-light rounded-full p-2 hover:bg-gray-200 transition"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-full h-[60vh] object-cover rounded-lg border border-gray-300"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the avatar tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPreviewModal;
