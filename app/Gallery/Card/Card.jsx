import React from 'react';
import Image from "next/image";
import './Card.css';

function Card (props) {

  const showLightbox = () => {
    props.onShow();
  };

  return (
    <div className={"card " + props.data.categories.join(' ')} ref={props.innerRef} style={{transitionDelay: `${props.delay}ms`}}>
      { props.data.thumbnail.mediaType === 'image' ? (<Image priority={props.shouldPreload} width={window.innerHeight*.26} height={window.innerHeight*.26} className="thumbnail" src={`/gallery/${props.data.thumbnail.uri}`} alt={props.data.name}/>)
      : (<video 
        className="thumbnail" 
        autoPlay 
        muted
        loop
        playsInline>
          {props.data.thumbnail.sources.map(source => {
            return <source key={source.format} src={`/gallery/${source.uri}`} type={`video/${source.format}`} />;
          })}
        </video>)}
      <h1 className="projectName">{props.data.name}</h1>
      <div className='detailsPrompt' onClick={showLightbox}>
        <h2>Click for details</h2>
      </div>
    </div>
  );
}

export default Card;