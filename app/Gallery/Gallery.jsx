'use client';

import { useRef, useState, createRef, useEffect } from 'react';
import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group';

import Card from './Card/Card';
import Lightbox from './Lightbox/Lightbox';
import './Gallery.css';

import data from './Gallery.json';

function Gallery() {
  const [workItems, setWorkItems] = useState(data.work.sort((a,b)=> {
    return a.date < b.date ? 1 : -1
  }));
  
  const [activeFilter, switchFilter] = useState("All");

  const [lightboxWork, updateLightbox] = useState(null);
  const [showLightbox, toggleLightbox] = useState(false);
  function openLightbox(id) {
    updateLightbox(data.work.find(work => id === work.id));
    toggleLightbox(true);
  }
  function closeLightbox() {
    toggleLightbox(false);
  }

  // Lightbox transition
  const transitionRef = useRef(null);
  const duration = 600; // ms
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    zIndex: 1,
    visibility: 'hidden'
  }
  const transitionStyles = {
    entering: { opacity: 1, visibility: 'visible' },
    entered:  { opacity: 1, visibility: 'visible' },
    exiting:  { opacity: 0, visibility: 'visible' },
    exited:  { opacity: 0, visibility: 'hidden' },
  };

  // Card transitions
  const onPageLoad = useRef(true);
  const cardTransDuration = onPageLoad.current ? 0 : 600; //ms
  const delay = 50; // ms
  const prevLength = useRef(workItems.length);
  prevLength.current = workItems.length;

  useEffect(() => {
    onPageLoad.current = false;

    setWorkItems([]);
    
    const timer = setTimeout(() => {  
      const newList = data.work.sort((a,b)=> {
        return a.date < b.date ? 1 : -1
      })
      .filter((workObj) => {
        return (activeFilter === "All" || workObj.categories.includes(activeFilter));
      });
      
      setWorkItems(newList);  
    }, cardTransDuration + prevLength.current*delay);

    return () => [clearTimeout(timer)];

  }, [activeFilter, cardTransDuration]);

  return (
    <div className="Gallery">
      <Transition nodeRef={transitionRef} in={showLightbox} timeout={cardTransDuration}>
        {state => <div ref={transitionRef} style={{...defaultStyle, ...transitionStyles[state]}}>
          <Lightbox viewedWork={lightboxWork} isShown={showLightbox} closeLightbox={closeLightbox}/>
        </div>}
      </Transition>
      <ul id="filters">
        {data.filters.map((filter, index) => {
          if(filter === activeFilter) {
            return (<li id="activeFilter" key={index} onClick={() => switchFilter(filter)}>{filter}</li>)
          } else {
            return (<li key={index} onClick={() => switchFilter(filter)}>{filter}</li>)
          }
        })}
      </ul>
      {!onPageLoad.current && (<TransitionGroup id="feed" className="container">
        {workItems.map((workObj, id) => {
          const itemRef = createRef(null);
          const waveEffectDelay = id*delay;
          
          return (
            <CSSTransition
              key={workObj.id}
              timeout={{
                appear: cardTransDuration,
                enter: cardTransDuration,
                exit: cardTransDuration + delay*prevLength.current,
               }}
              nodeRef={itemRef}
              classNames="item">
              <Card 
                innerRef={itemRef} 
                data={workObj} 
                onShow={() => openLightbox(workObj.id)}
                delay={waveEffectDelay} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>)}
    </div>
  );
}

export default Gallery;
