// 유튜브 연결
/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

// 스크롤 위치에 따라 유튜브 자동 재생
export const AutoplayYouTubeVideo = ({ videoId }) => {
  const videoRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 자동재생
          if (videoRef.current && videoRef.current.contentWindow) {
            videoRef.current.contentWindow.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              "*"
            );
          }
        } else {
          // 일시정지
          if (videoRef.current && videoRef.current.contentWindow) {
            videoRef.current.contentWindow.postMessage(
              '{"event":"command","func":"pauseVideo","args":""}',
              "*"
            );
          }
        }
      });
    }, options);

    observerRef.current = observer;
    observer.observe(videoRef.current);

    return () => {
      if (observerRef.current && videoRef.current) {
        observerRef.current.unobserve(videoRef.current);
      }
    };
  }, [videoId]);

  return (
    <YoutubeStyle>
      <iframe
        ref={videoRef}
        width="100%"
        height="485px"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </YoutubeStyle>
  );
};

// 유튜브 css
const YoutubeStyle = styled.div`
  margin: 6% 0 4% 0;
`;

export default AutoplayYouTubeVideo;
