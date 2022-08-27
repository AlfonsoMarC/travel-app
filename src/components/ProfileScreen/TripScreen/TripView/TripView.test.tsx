import { render, screen } from "test-utils";
import TripView from "./TripView";

const trip = {
  _id: "1",
  title: "Trip 1",
  startDate: "01/01/2021",
  endDate: "02/01/2021",
  posts: [
    {
      _id: "1",
      img: "trip1Url",
      trip: "1",
      location: "1"
    }
  ],
  locations: [{ _id: "1", name: "Location 1", trip: "1" }]
};

describe("TripView", () => {
  beforeEach(() => {
    render(<TripView trip={trip} />);
  });
  test("should render trip title", () => {
    expect(screen.getAllByRole("heading", { level: 2 })[0].textContent).toBe(
      "Trip 1"
    );
  });
  test("should render LocationList", () => {
    expect(screen.getByText("Locations")).toBeInTheDocument();
  });
  test("should render LocationView", () => {
    expect(
      document.querySelector("#location-view-container")
    ).toBeInTheDocument();
  });
});
