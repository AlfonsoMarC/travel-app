import React from "react";
import styled from "styled-components";

const StyledPlaceholderContainer = styled.div`
  display: flex;
  height: 100%;
  background: ${({ theme }) => theme.color.bg};
  ${({ theme }) => theme.media.atMedium} {
    flex-direction: row;
    height: 72px;
    width: 224px;
  }
`;

const TripListPlaceholder: React.FC = () => {
  return <StyledPlaceholderContainer>Loading...</StyledPlaceholderContainer>;
};

export default TripListPlaceholder;
