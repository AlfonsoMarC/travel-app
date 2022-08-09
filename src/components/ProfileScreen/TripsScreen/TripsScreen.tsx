import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFetchModel from "customHooks/useFetchModel";
import AsideMenu from "components/shared/AsideMenu/AsideMenu";
import IconButton from "components/shared/IconButton/IconButton";
import TripList from "./TripList/TripList";
import Map from "./Map";
import NewTripModal from "./NewTripModal/NewTripModal";

const StyledTripsScreenContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  .trips-view-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  ${({ theme }) => theme.media.atSmall} {
    .trips-view-content {
      flex-direction: row;
    }
  }
`;

const TripsScreen = () => {
  const [showNewTripModal, setShowNewTripModal] = useState(false);
  const toggleNewTripModal = () => {
    setShowNewTripModal(!showNewTripModal);
  };
  const [
    { loading: tripsLoading, result: tripsResult, error: tripsError },
    fetchModel
  ] = useFetchModel();

  useEffect(() => {
    fetchModel({ model: "trips" });
  }, [fetchModel]);

  return (
    <StyledTripsScreenContainer>
      <div className="trips-view-content">
        <TripList
          tripsLoading={tripsLoading}
          trips={tripsResult?.trips ?? []}
        />
        <Map />
      </div>
      <AsideMenu className="trips-aside-tools">
        <IconButton
          icon={"plus"}
          onClick={toggleNewTripModal}
          tooltip="Add trip"
        />
      </AsideMenu>
      <NewTripModal
        showNewTripModal={showNewTripModal}
        closeNewTripModal={() => setShowNewTripModal(false)}
      />
    </StyledTripsScreenContainer>
  );
};

export default TripsScreen;

/* import { render } from "test-utils";
import useFetchModel from "customHooks/useFetchModel";
import TripsScreen from "../TripsScreen/TripScreen";

 jest.mock("customHooks/useFetchModel");

describe("TripScreen", () => {
  test("should show placeholder when loading trips", () => {
     useFetchModel.mockReturnValue([
      { loading: true, result: {}, error: null },
      () => {}
    ]);

    const { container } = render(<TripsScreen />);
    expect(container).toMatchSnapshot();
  });
});
 */
