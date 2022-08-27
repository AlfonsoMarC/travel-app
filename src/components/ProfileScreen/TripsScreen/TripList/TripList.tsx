import React from "react";
import styled from "styled-components";
import { Trip } from "types/types";
import { labelM } from "assets/mixins";
import TripListItem from "./TripListItem/TripListItem";
import TripListPlaceholder from "./TripListPlaceholder/TripListPlaceholder";

const StyledTripListContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.color.bg};
  .trip-list-menu {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
  }
  .trip-list-header {
    display: none;
  }
  .trip-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: ${({ theme }) => theme.spacing.space3};
    padding: ${({ theme }) => theme.spacing.space3};
    margin-bottom: 0;
    overflow-y: auto;
  }
  .trip-list-menu-footer {
    display: none;
  }

  ${({ theme }) => theme.media.atSmall} {
    .trip-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }

  ${({ theme }) => theme.media.atMedium} {
    width: unset;
    .trip-list-menu {
      padding-bottom: ${({ theme }) => theme.spacing.space5};
      min-width: 224px;
    }
    .trip-list-header {
      display: flex;
      justify-content: center;
      position: relative;
      > h2 {
        ${labelM};
        margin: ${({ theme }) => theme.spacing.space3} 0 0 0;
      }
      ::after {
        content: "";
        position: absolute;
        bottom: -${({ theme }) => theme.spacing.space3};
        left: 0;
        z-index: 9;
        height: ${({ theme }) => theme.spacing.space3};
        width: 100%;
        background: linear-gradient(
          ${({ theme }) => theme.color.bg},
          transparent
        );
      }
    }
    .trip-list {
      display: flex;
      flex-direction: column;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .trip-list-menu-footer {
      display: flex;
      position: absolute;
      bottom: ${({ theme }) => theme.spacing.space5};
      z-index: 9;
      height: ${({ theme }) => theme.spacing.space5};
      width: 100%;
      background: linear-gradient(
        transparent,
        ${({ theme }) => theme.color.bg}
      );
    }
  }
`;

interface Props {
  className?: string;
  tripsLoading: boolean;
  trips: [Trip];
}

const TripList: React.FC<Props> = ({ className, tripsLoading, trips }) => {
  return (
    <StyledTripListContainer className={className} id="trip-list-container">
      {tripsLoading || !trips.length ? (
        <TripListPlaceholder tripsLoading={tripsLoading} />
      ) : (
        <div className="trip-list-menu">
          <div className="trip-list-header">
            <h2>My Trips</h2>
          </div>
          <ul className="trip-list">
            {trips.map(trip => (
              <TripListItem key={trip._id} trip={trip} />
            ))}
          </ul>
          <div className="trip-list-menu-footer" />
        </div>
      )}
    </StyledTripListContainer>
  );
};

export default TripList;
