import React from 'react'

function TestApp() {
  console.log('TestApp is rendering!');
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'red', 
      color: 'white',
      minHeight: '100vh',
      fontSize: '24px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999
    }}>
      <h1>TEST - If you see this, React is working</h1>
      <p>This is a test component to check if the issue is with React rendering</p>
      <p>Current time: {new Date().toISOString()}</p>
    </div>
  )
}

export default TestApp
