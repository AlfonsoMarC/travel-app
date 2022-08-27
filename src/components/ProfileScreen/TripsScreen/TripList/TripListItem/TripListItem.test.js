import { render } from "test-utils";
import TripListItem from "./TripListItem";

describe("TripListItem", () => {
  test("should match snapshot", () => {
    const testTrip = {
      _id: "test_id",
      title: "Test trip",
      startDate: "01/01/2000",
      endDate: "01/01/2000",
      posts: [{ _id: "123456", img: "test_url" }]
    };
    const { container } = render(<TripListItem trip={testTrip} />);
    expect(container).toMatchSnapshot();
  });
});
