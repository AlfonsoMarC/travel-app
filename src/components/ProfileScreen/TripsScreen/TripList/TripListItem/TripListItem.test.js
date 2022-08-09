import { Router, useLocation } from "react-router-dom";
import { render } from "test-utils";
import { createMemoryHistory } from "history";
import TripListItem from "./TripListItem";

describe("TripListItem", () => {
  const history = createMemoryHistory();
  //  const location = useLocation();

  test("should", () => {
    const testTrip = {
      _id: "test_id",
      title: "Test trip",
      startDate: "01/01/2000",
      endDate: "01/01/2000",
      posts: [{ img: "test_url" }]
    };
    const { container } = render(
      <Router location={history.location} navigator={history}>
        <TripListItem trip={testTrip} />
      </Router>
    );
    expect(container).toMatchSnapshot();
    console.log("container", container);
  });
});
