import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the zoom-in animation
const zoomIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

// Styled component for the checkmark icon container
const CheckmarkIconContainer = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid #0a0; /* Green color */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${zoomIn} 0.5s ease-in; /* Apply the zoom-in animation */
`;

// Styled component for the success container
const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Success = () => {
  return (
    <SuccessContainer>
      <CheckmarkIconContainer>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#0a0" width="32" height="32">
          <path fillRule="evenodd" d="M9.293 17.707a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L9 14.586l9.293-9.293a1 1 0 1 1 1.414 1.414l-10 10z" clipRule="evenodd" />
        </svg>
      </CheckmarkIconContainer>
      <h2>Success!</h2>
    </SuccessContainer>
  );
};

export default Success;
