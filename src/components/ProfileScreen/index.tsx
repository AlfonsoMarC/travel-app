import React from "react";
import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";
import TripsScreen from "./TripsScreen/TripsScreen";
import TripScreen from "./TripScreen/TripScreen";
import ProfileNavbar from "./PropfileNavbar/ProfileNavbar";
import LocationScreen from "./LocationsScreen/LocationScreen";

const StyledProfileScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  ${({ theme }) => theme.color.bg};
  .profile-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    background: ${({ theme }) => theme.color.bg};
    overflow: hidden;
  }
`;

const ProfileScreen: React.FC = () => {
  return (
    <StyledProfileScreenContainer>
      <ProfileNavbar />
      <div className="profile-content">
        <Routes>
          <Route path="trips" element={<TripsScreen />} />
          <Route path="trip/:tripId" element={<TripScreen />} />
          <Route path="locations" element={<LocationScreen />} />
          <Route path="articles" element={<LocationScreen />} />
          <Route path="*" element={<Navigate to="trips" replace />} />
        </Routes>
      </div>
    </StyledProfileScreenContainer>
  );
};

export default ProfileScreen;
