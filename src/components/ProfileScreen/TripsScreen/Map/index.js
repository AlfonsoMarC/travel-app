import React, { useState } from "react";
import styled from "styled-components";
import map from "assets/map.svg";
import marker from "assets/marker.svg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const StyledMapContainer = styled.div`
  display: none;
  ${({ theme }) => theme.media.atMedium} {
    display: flex;
    flex: 1;
    align-items: flex-start;
    overflow: hidden;
  }
`;

const StyledMap = styled.img`
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.color.bg};
  z-index: -1;
`;

const StyledMarkerImg = styled.img`
  width: 12px;
  height: 12px;
  position: absolute;
  pointer-events: auto !important;
  cursor: pointer;
  /* transform: scale(
    ${props => 1 / props.currentScale},
    ${props => 1 / props.currentScale}
  ); */
`;

const Marker = styled.div`
  background-color: red;
  position: absolute;
  left: ${props => props.markerPosition.x + "%"};
  top: ${props => props.markerPosition.y + "%"};
`;

const NewMarker = styled.div`
  position: absolute;
  left: ${props => props.newMarkerPosition.x + "%"};
  top: ${props => props.newMarkerPosition.y + "%"};
`;

const Map = () => {
  const [newMarkerPosition, setNewMarkerPosition] = useState(null);
  const [currentScale, setCurrentScale] = useState(1);

  const editLocation = e => {
    e.stopPropagation();
  };

  const markers = [{ x: 50, y: 50 }];

  const addMarker = e => {
    const mapMeasures = e.target.getBoundingClientRect();
    const clikCoordinates = {
      x:
        ((e.clientX - mapMeasures.x - 6 * currentScale) / mapMeasures.width) *
        100,
      y:
        ((e.clientY - mapMeasures.y - 12 * currentScale) / mapMeasures.height) *
        100
    };
    setNewMarkerPosition({ x: clikCoordinates.x, y: clikCoordinates.y });
  };

  return (
    <StyledMapContainer className="map-container">
      <TransformWrapper
        initialScale={1}
        onZoom={e => setCurrentScale(e.state.scale)}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <TransformComponent>
              {newMarkerPosition && (
                <NewMarker newMarkerPosition={newMarkerPosition}>
                  <StyledMarkerImg
                    alt="marker"
                    src={marker}
                    currentScale={currentScale}
                    onClick={editLocation}
                  />
                </NewMarker>
              )}
              {markers.map((markerPosition, key) => (
                <Marker key={key} markerPosition={markerPosition} />
              ))}
              <StyledMap alt="map" src={map} />
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </StyledMapContainer>
  );
};

export default Map;
