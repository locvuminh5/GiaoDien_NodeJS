import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the rotating animation
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Styled component for the loading spinner
const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-left-color: #09f; /* Adjust color as needed */
  animation: ${spin} 1s linear infinite; /* Apply the spin animation */
`;

// Styled component for the loading container
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <h2>Loading...</h2>
    </LoadingContainer>
  );
};

export default Loading;
