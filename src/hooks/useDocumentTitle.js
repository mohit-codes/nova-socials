import { useRef } from "react";
import { useEffect } from "react";

const useDocumentTitle = (title) => {
  const defaultTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      document.title = defaultTitle;
    };
  }, []);
};

export default useDocumentTitle;
