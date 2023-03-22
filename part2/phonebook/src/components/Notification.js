import React from 'react';

export const Notification = ({ info }) => {
  const { message, type } = info;
  const notificationStyle = {
    padding: '20px',
    position: 'absolute',
    zIndex: '999',
    bottom: '10px',
    textAlign: 'center',
    width: '200px',
    backgroundColor: type === 'error' ? '#ff7f7f' : '#39d64ba8',
    borderRadius: '20px',
    border: '1px solid grey',
    color: 'white',
    left: '0',
    right: '0',
    margin: 'auto',
  };

  if (!message) return <></>;

  return (
    <div style={notificationStyle}>
      <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{message}</span>
    </div>
  );
};
