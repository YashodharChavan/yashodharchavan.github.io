import React from 'react';

const CenteredHrWithText = ({ text }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      margin: '14px 0',
    }}>
      <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #ccc' }} />
      <span style={{ padding: '0 10px', color: '#555', whiteSpace: 'nowrap', fontSize: "18px", fontFamily: "serif", fontStyle: "italic" }}>{text}</span>
      <hr style={{ flexGrow: 1, border: 'none', borderTop: '1px solid #ccc' }} />
    </div>
  );
};


export default React.memo(CenteredHrWithText);
