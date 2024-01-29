import { Stack } from "@mui/material";
import { ReactJSXElement } from "node_modules/@emotion/react/types/jsx-namespace";
import React, { useEffect, useRef } from "react";
type TInfiniteScroll = {
  children: any;
  loader: ReactJSXElement;
  fetchMore: Function;
  hasMore: boolean;
  endMessage: ReactJSXElement | String;
};

const InfiniteScrollWrapper = ({
  children,
  loader,
  fetchMore,
  hasMore,
  endMessage,
}: TInfiniteScroll) => {
  const pageEndRef = useRef(null);
  useEffect(() => {
    if (hasMore) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            fetchMore();
          }, 1000);
        }
      });

      if (pageEndRef.current) {
        observer.observe(pageEndRef.current);
      }

      return () => {
        if (pageEndRef.current) {
          observer.unobserve(pageEndRef.current);
        }
      };
    }
  }, [hasMore]);
  return (
    <div>
      {children}

      {hasMore ? (
        <Stack alignItems={"center"} p={5} ref={pageEndRef}>
          {loader}
        </Stack>
      ) : (
        <Stack alignItems={"center"} p={5} ref={pageEndRef}>
          {endMessage}
        </Stack>
      )}
    </div>
  );
};

export default InfiniteScrollWrapper;
