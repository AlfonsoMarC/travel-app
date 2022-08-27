import { render, screen } from "test-utils";
import TripList from "./TripList";

const trips = [
  {
    _id: "1",
    title: "Trip 1",
    startDate: "01/01/2021",
    endDate: "02/01/2021"
  },
  {
    _id: "2",
    title: "Trip 2",
    startDate: "01/01/2022",
    endDate: "02/01/2022"
  }
];

describe("TripList", () => {
  test("should render placeholder when trips are loading", () => {
    render(<TripList tripsLoading={true} trips={[]} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  test("should render add trips message when there are no trips", () => {
    render(<TripList tripsLoading={false} trips={[]} />);
    expect(screen.getByText("Add some trips")).toBeInTheDocument();
  });
  test("shpuld render trips when there are trips", () => {
    render(<TripList tripsLoading={false} trips={trips} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
