import React from 'react';

const Resume = () => {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <iframe
        loading='lazy'
        src="https://yashodharchavan.github.io/books/Resume.pdf"
        width="100%"
        height="100%"
        title="Resume PDF"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default Resume;
