import React from 'react';

const Sunny = () => {
  return (
    <div style={{ position: 'relative', height: '200px', overflow: 'hidden'}}>
      <p style={{ textAlign: 'center', marginTop: '10px', color: 'black' }}>Perfect wheather!</p>
      <div
        className="ball"
        style={{
          position: 'absolute',
          width: '70px',
          height: '70px',
          backgroundColor: 'orange',
          borderRadius: '50%',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          boxShadow: '0 0 35px 5px yellow, 0 0 25px 10px yellow inset',
        }}
      ></div>
    </div>
  );
};

export default Sunny;
