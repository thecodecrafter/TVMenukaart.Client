import {
  DocumentElementWithFullscreen,
  DocumentWithFullscreen,
} from "./useFullscreen.types";
import { useEffect, useState } from "react";

const isWindowFullscreen = (): boolean => {
  return (
    window.innerWidth === window.screen.availWidth &&
    window.innerHeight === window.screen.availHeight
  );
};

const isDocumentFullscreen = (): boolean => {
  const doc = document as DocumentWithFullscreen;

  return !!(
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement
  );
};

const isInFullscreen = () => {
  return isWindowFullscreen() || isDocumentFullscreen();
};

const requestFullscreen = async (element: DocumentElementWithFullscreen) => {
  if (element.requestFullscreen) {
    await element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    await element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    await element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    await element.mozRequestFullScreen();
  }
};

const exitFullscreen = async (doc: DocumentWithFullscreen) => {
  if (doc.exitFullscreen) {
    await doc.exitFullscreen();
  } else if (doc.msExitFullscreen) {
    await doc.msExitFullscreen();
  } else if (doc.webkitExitFullscreen) {
    await doc.webkitExitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    await doc.mozCancelFullScreen();
  }
};

const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    setIsFullscreen(isInFullscreen());
  }, []);

  useEffect(() => {
    const handleFullscreenEvent = () => {
      setIsFullscreen(isInFullscreen());
    };

    // Pressing F11 is out of scope for JS to come out of again manually so we handle the key directly
    const handleF11Press = async (e: KeyboardEvent) => {
      if (e.key === "F11") {
        e.preventDefault();
        await toggleFullscreen();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenEvent);
    document.addEventListener("webkitfullscreenchange", handleFullscreenEvent);
    document.addEventListener("mozfullscreenchange", handleFullscreenEvent);
    document.addEventListener("msfullscreenchange", handleFullscreenEvent);
    window.addEventListener("resize", handleFullscreenEvent);
    window.addEventListener("keydown", handleF11Press);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenEvent);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenEvent
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenEvent
      );
      document.removeEventListener("msfullscreenchange", handleFullscreenEvent);
      window.removeEventListener("resize", handleFullscreenEvent);
      window.removeEventListener("keydown", handleF11Press);
    };
  }, []);

  const toggleFullscreen = async (): Promise<void> => {
    if (!isInFullscreen()) {
      await requestFullscreen(document.documentElement);
    } else {
      await exitFullscreen(document);
    }

    setIsFullscreen(isInFullscreen());
  };

  return { toggleFullscreen, isFullscreen };
};

export default useFullscreen;
