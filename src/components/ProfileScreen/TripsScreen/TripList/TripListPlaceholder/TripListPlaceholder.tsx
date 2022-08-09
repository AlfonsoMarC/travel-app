import React from "react";
import styled from "styled-components";

const StyledTripListContainer = styled.div`
  display: flex;
  height: 100%;
  background: ${({ theme }) => theme.color.bg};
  ${({ theme }) => theme.media.atMedium} {
    flex-direction: row;
    height: 72px;
    width: 224px;
  }
`;

interface Props {
  tripsLoading?: boolean;
}

const TripListPlaceholder: React.FC<Props> = ({ tripsLoading }) => {
  return (
    <StyledTripListContainer>
      {tripsLoading ? "Loading..." : "Add some trips"}
    </StyledTripListContainer>
  );
};

export default TripListPlaceholder;
