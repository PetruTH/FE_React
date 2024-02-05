import React from 'react';

const TooHot = () => {
  return (
    <div style={{ position: 'relative', height: '200px', overflow: 'hidden'}}>
      <p style={{ textAlign: 'center', marginTop: '10px', color: 'black' }}>Too Hot!</p>
      <div
        className="mt-2"
        style={{
          position: 'absolute',
          width: '70px',
          height: '70px',
          backgroundColor: 'orange',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
          boxShadow: '0px 0px 27px 29px rgba(255,144,46,0.72)',
        }}
      ></div>
    </div>
  );
};

export default TooHot;
