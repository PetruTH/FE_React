import React, { useState, useEffect } from 'react';

const MovingClouds = () => {
  const [clouds, setClouds] = useState([
    { id: 1, left: 0 },
    { id: 2, left: 100 },
    { id: 3, left: 200 },
    { id: 4, left: 300},
    { id: 5, left: 400 },
    { id: 6, left: 500},
    { id: 7, left: 600 },
    { id: 8, left: 700},
    { id: 9, left: 800 },
    { id: 10, left: 900},
  ]);

  const cloudSpeed = 1;

  useEffect(() => {
    const updateClouds = () => {
      setClouds((prevClouds) =>
        prevClouds.map((cloud) => {
          let newLeft = cloud.left - cloudSpeed;

          if (newLeft + 150 < 0) {
            newLeft = 800;
          }

          return { ...cloud, left: newLeft };
        })
      );
    };

    const animationFrame = requestAnimationFrame(() => {
      updateClouds();
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [clouds]);

  return (
    <div style={{ position: 'relative', height: '200px', overflow: 'hidden'}}>
      <p style={{ textAlign: 'center', marginTop: '10px', color: 'black' }}>Too cold!</p>
      {clouds.map((cloud) => (
        <div
          className="cloud"
          key={cloud.id}
          style={{
            position: 'absolute',
            left: `${cloud.left}px`,
            top: '50%',
            marginLeft: '-1.5em',
            width: '3em',
            height: '1em',
            borderRadius: '1em',
            backgroundColor: '#fff',
            boxShadow: 'inset 0 0 0 1px hsla(0,0%,100%,.5)',
            display: 'inline-block',
            filter: 'drop-shadow(0 2px 3px hsla(0,0%,0%,.25))',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              content: '',
              borderRadius: '100%',
              position: 'absolute',
            }}
          ></div>
          <div
            style={{
              backgroundColor: '#fff',
              content: '',
              borderRadius: '100%',
              position: 'absolute',
              backgroundImage: '-webkit-linear-gradient(hsla(0,0%,0%,0) 50%, hsla(0,0%,0%,.025))',
              height: '1em',
              right: '0.4em',
              top: '-0.5em',
              width: '1em',
            }}
          ></div>
          <div
            style={{
              backgroundColor: '#fff',
              content: '',
              borderRadius: '100%',
              position: 'absolute',
              backgroundImage: '-webkit-linear-gradient(hsla(0,0%,0%,0) 50%, hsla(0,0%,0%,.075))',
              height: '1.6em',
              left: '0.4em',
              top: '-0.75em',
              width: '1.6em',
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default MovingClouds;
