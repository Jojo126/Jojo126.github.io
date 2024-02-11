import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Markdown from 'react-markdown';

import closeIcon from '@/public/lightbox/close.png';
import prevIcon from '@/public/lightbox/prev.png';
import nextIcon from '@/public/lightbox/next.png';

import "./Lightbox.css";

function Lightbox({viewedWork, isShown, closeLightbox}) {

  const [slide, updateSlide] = useState({slideIndex: 0, scrolledPx: 0, currentWidth: 1920/2, currentHeight: 1080/2, scaleFactor: 1});

  const MAX_SCREENPORTION_X = .6;
  const MAX_SCREENPORTION_Y = .8;

  function close(e) {
    if(e.target === e.currentTarget) { // Only background and X-btn should trigger this
      gotoSlide(0);
      closeLightbox();
    }
  }

  function gotoSlide(index) {
    let scrolledPx = 0;
    for(let i = 0; i < index; i++) {
      scrolledPx += viewedWork?.images[i].width;
    }

    const { innerWidth: width, innerHeight: height } = window;
    let scaleFactorX = Math.min((width * MAX_SCREENPORTION_X) / viewedWork?.images[index].width, 1);
    let scaleFactorY = Math.min((height * MAX_SCREENPORTION_Y) / viewedWork?.images[index].height, 1);
    let scaleFactor = Math.min(scaleFactorX, scaleFactorY);
    updateSlide({
      slideIndex: index, 
      scrolledPx: scrolledPx, 
      currentWidth: viewedWork?.images[index].width, 
      currentHeight: viewedWork?.images[index].height, 
      scaleFactor: scaleFactor ? scaleFactor : 1
    });
  }
  const initLightbox = useCallback(gotoSlide, [viewedWork?.images]);

  useEffect(() => {
    initLightbox(0);
  }, [initLightbox]);

  return (
    <div id="lightboxBG" onClick={close}>
      <div id="lightbox">
        <div id="slideShow" style={{width: slide.currentWidth * slide.scaleFactor + 'px', height: slide.currentHeight * slide.scaleFactor + 'px'}}>
          <div id="slideControls" style={{width: slide.currentWidth * slide.scaleFactor + 'px', height: slide.currentHeight * slide.scaleFactor + 'px'}}>
            {slide.slideIndex > 0 && <div onClick={() => {gotoSlide(slide.slideIndex - 1)}} className="slideShowBtn" id="prevSlideBtn">
              <Image src={prevIcon} alt="<" />
            </div>}
            {slide.slideIndex < viewedWork?.images.length-1 && <div onClick={() => {gotoSlide(slide.slideIndex + 1)}} className="slideShowBtn" id="nextSlideBtn">
              <Image src={nextIcon} alt=">" />
            </div>}
            {viewedWork?.images.length > 1 && <div id="slidePreviews">{viewedWork?.images.map((val, index) => <div onClick={() => {gotoSlide(index)}} key={index} className={`slidePreview ${index === slide.slideIndex ? 'active' : ''}`}></div>)}</div>}
          </div>
          <div id="slides" style={{transform: `translateX(-${slide.scrolledPx}px)`}}>
            {viewedWork?.images.map((image, index) => {
                return image.mediaType === 'image' ? (<Image 
                  key={image.uri} 
                  

                  width={index === slide.slideIndex ? image.width * slide.scaleFactor : image.width}
                  height={index === slide.slideIndex ? image.height * slide.scaleFactor : image.height}
                  
                  src={`/gallery/${image.uri}`} 
                  alt={viewedWork?.name} 
                />) : 
                (<video 
                  key={image.sources[0].uri}
                  
                  width={index === slide.slideIndex ? image.width * slide.scaleFactor : image.width}
                  height={index === slide.slideIndex ? image.height * slide.scaleFactor : image.height}
                  
                  muted={index !== slide.slideIndex || !isShown}
                  controls 
                  autoPlay 
                  loop
                  playsInline>
                    {image.sources.map(source => {
                      return <source key={source.format} src={`/gallery/${source.uri}`} type={`video/${source.format}`} />
                    })}
                </video>)
              }
            )}
          </div>
        </div>
        <span id="info">
          <h1 id="projName">{viewedWork?.name}</h1>
          <div id="infoPoints">
            <p id="date"><b>Date of creation:</b> {viewedWork?.date}</p>
            <p id="team"><b>The people who made this:</b> Johanna Palmkvist{viewedWork?.team?.length > 0 && ', ' + viewedWork?.team.join(', ')}</p>
            <div>
              <p><b>The tools used to make this:</b></p> 
              {viewedWork?.tools.map((tool, index) => {
                return (
                    <a className="tool" key={index} href={tool.link} style={{backgroundColor: tool.colors.bg}} target="_blank" rel="noreferrer">
                      <span style={{color: tool.colors.pg}}>{tool.name}</span>
                    </a>
                  );
                })
              }
            </div>
            {viewedWork?.location && <p id="location"><b>Location:</b> {viewedWork.location}</p>}
          </div>
          {viewedWork?.descr && <Markdown>{viewedWork.descr}</Markdown>}
          {viewedWork?.link && (
            <a id="projPageLink" href={viewedWork.link} target="_blank" rel="noreferrer">
              <span>Visit project page</span>
            </a>
          )}
        </span>
      </div>
      <div onClick={close} id="closeLightboxBtn" style={{height: `calc(4vh + ${slide.currentHeight * slide.scaleFactor}px)`}}>
          <Image onClick={close} src={closeIcon} alt="x" />
      </div>
    </div>
  );
}

export default Lightbox;
