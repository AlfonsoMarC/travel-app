import React, { useState } from "react";
import styled from "styled-components";
import { formatDate } from "helpers/dates";
import { Trip } from "types/types";
import { Link } from "react-router-dom";
import { small } from "assets/mixins";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";

const TripCardContainer = styled.li`
  position: relative;
  min-width: 0;
  a {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 0;
    max-height: 200px;
    overflow: hidden;
    color: ${({ theme }) => theme.color.black};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 5px;
    &:hover {
      .photo {
        transform: scale(1.3);
      }
    }
  }
  .meta {
    flex-shrink: 0;
    z-index: 0;
    position: relative;
    height: 100px;
  }
  .photo {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    transition: transform 0.2s;
  }
  .text {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    padding: ${({ theme }) => theme.spacing.space};
    background: ${({ theme }) => theme.color.white};
    overflow: hidden;
    &:before {
      content: "";
      position: absolute;
      left: -10px;
      top: 0;
      bottom: 0;
      z-index: -1;
      transform: skewX(-3deg);
      width: ${({ theme }) => theme.spacing.space3};
      background: ${({ theme }) => theme.color.white};
    }
  }
  h3 {
    display: flex;
    font-size: 12px;
  }
  .trip-dates {
    display: flex;
    ${small};
  }
  .description {
    overflow: hidden;
  }
  ${({ theme }) => theme.media.atMedium} {
    width: 200px;
    a {
      flex-direction: row;
      height: 72px;
      width: 200px;
      &:hover {
        .photo {
          transform: scale(1.3) rotate(3deg);
        }
      }
    }
    .meta {
      flex-basis: 40%;
    }
    .text {
      flex-basis: 60%;
      justify-content: space-between;
      overflow: unset;
    }
    .description {
      display: none;
    }
    &:nth-child(even) {
      a {
        flex-direction: row-reverse;
        .text {
          &:before {
            left: inherit;
            right: -10px;
            transform: skew(3deg);
          }
        }
      }
      h3 {
        justify-content: flex-end;
        text-align: end;
        max-height: 42px;
      }
      .trip-dates {
        justify-content: flex-end;
      }
    }
  }
`;

/* const Icon = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  font-family: "Material Icons";
  font-size: 24px;
  cursor: pointer;
`;
 */
interface Props {
  trip: Trip;
}

const TripListItem: React.FC<Props> = ({ trip }) => {
  const startDate = formatDate(trip.startDate, "MMM yyyy");

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );

  return (
    <TripCardContainer className="alt">
      <Link to={`../trip/${trip._id}`}>
        <div className="meta">
          <div
            className="photo"
            style={{
              backgroundImage: `url(${
                trip.posts?.[0]?.img ??
                "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg"
              })`
            }}
          />
        </div>
        <section className="text">
          <h3>{trip.title}</h3>
          {startDate && (
            <div className="trip-dates">
              <time>{startDate}</time>
            </div>
          )}
          {trip.description && (
            <p className="description">{trip.description}</p>
          )}
        </section>
      </Link>
      {/*    <OverlayTrigger
        trigger="click"
        placement="right"
        overlay={popover}
        rootClose={true}
      >
        <Icon>arrow_drop_down</Icon>
      </OverlayTrigger> */}
    </TripCardContainer>
  );
};

export default TripListItem;
