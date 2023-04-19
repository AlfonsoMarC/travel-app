import React from "react";
import styled from "styled-components";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { RootState } from "store";
import { useSelector } from "react-redux";
import TripsScreen from "./TripsScreen/TripsScreen";
import TripScreen from "./TripScreen/TripScreen";
import ProfileNavbar from "./PropfileNavbar/ProfileNavbar";
import FriendsScreen from "./FriendsScreen/FriendsScreen";

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
  const params = useParams();
  const urlUser = params.uid;
  const { uid } = useSelector((state: RootState) => state.auth);

  if (urlUser !== uid) {
    return <div>You dont have access to this profile || Profile not found</div>;
  }
  return (
    <StyledProfileScreenContainer>
      <ProfileNavbar urlUser={urlUser} />
      <div className="profile-content">
        <Routes>
          <Route path="trips" element={<TripsScreen />} />
          <Route path="trip/:tripId" element={<TripScreen />} />
          <Route path="friends" element={<FriendsScreen />} />
          <Route path="*" element={<Navigate to="trips" replace />} />
        </Routes>
      </div>
    </StyledProfileScreenContainer>
  );
};

export default ProfileScreen;
