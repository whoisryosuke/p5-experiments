import { useEffect, useRef } from "react";

const useBlueskyFirehose = () => {
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    socket.current = new WebSocket(
      "wss://jetstream2.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post"
    );

    return () => {
      socket.current.close();
    };
  }, []);

  return {
    socket,
  };
};

export default useBlueskyFirehose;
