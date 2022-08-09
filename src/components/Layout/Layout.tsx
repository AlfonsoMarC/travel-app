import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import ProfileScreen from "components/ProfileScreen/index";
import HomeScreen from "components/HomeScreen/HomeScreen";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Navbar from "./Navbar/Navbar";

const StyledLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const Layout: React.FC = () => {
  const { uid } = useSelector((state: RootState) => state.auth);
  return (
    <StyledLayoutContainer id="layout">
      <Navbar />
      <StyledContent>
        <Routes>
          <Route path="home" element={<HomeScreen />} />
          <Route path="profile/:uid/*" element={<ProfileScreen />} />
          <Route
            path="*"
            element={<Navigate to={`profile/${uid}`} replace />}
          />
        </Routes>
      </StyledContent>
    </StyledLayoutContainer>
  );
};

export default Layout;
