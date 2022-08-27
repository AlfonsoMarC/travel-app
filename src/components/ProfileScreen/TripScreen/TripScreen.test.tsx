import { render, screen } from "test-utils";
import useFetchModel from "customHooks/useFetchModel";
import useViewport from "customHooks/useViewport";
import TripScreen from "./TripScreen";

jest.mock("customHooks/useFetchModel");
jest.mock("customHooks/useViewport");

const mockedUseFetchModel = useFetchModel as jest.Mock;
const mockedUseViewport = useViewport as jest.Mock;

const small = {
  isSmall: true,
  isMedium: false,
  isLarge: false
};
const medium = {
  isSmall: true,
  isMedium: true,
  isLarge: true
};
const mockedFetch = jest.fn();
const fetchModelSuccessResponse = [
  {
    loading: false,
    result: {
      _id: "1",
      title: "Trip 1",
      startDate: "01/01/2021",
      endDate: "02/01/2021",
      posts: [
        {
          _id: "1",
          img: "url",
          trip: "1"
        }
      ]
    },
    error: null
  },
  mockedFetch
];

describe("TripScreen", () => {
  test("should render trip loading when loading", () => {
    mockedUseViewport.mockReturnValue(medium);
    mockedUseFetchModel.mockReturnValue([
      {
        loading: true,
        result: null,
        error: null
      },
      mockedFetch
    ]);
    render(<TripScreen />);
    expect(mockedFetch).toHaveBeenCalled();
    expect(screen.getByText("Trip loading...")).toBeInTheDocument();
  });
  test("should render trip error when there is a fetch error", () => {
    mockedUseViewport.mockReturnValue(medium);
    mockedUseFetchModel.mockReturnValue([
      {
        loading: false,
        result: null,
        error: "There was an error"
      },
      mockedFetch
    ]);
    render(<TripScreen />);
    expect(mockedFetch).toHaveBeenCalled();
    expect(screen.getByText("Trip error")).toBeInTheDocument();
  });
  test("should render TripView for medium size", () => {
    mockedUseViewport.mockReturnValue(medium);
    mockedUseFetchModel.mockReturnValue(fetchModelSuccessResponse);
    render(<TripScreen />);
    expect(mockedFetch).toHaveBeenCalled();
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(
      "Trip 1"
    );
  });
  test("should render PostListView for small size", () => {
    mockedUseViewport.mockReturnValue(small);
    mockedUseFetchModel.mockReturnValue(fetchModelSuccessResponse);
    const { container } = render(<TripScreen />);
    expect(mockedFetch).toHaveBeenCalled();
    expect(container.querySelectorAll("li>div>label")[0].textContent).toBe(
      "Trip 1"
    );
  });
  test("shoul render TripAsideTool", () => {
    mockedUseViewport.mockReturnValue(medium);
    mockedUseFetchModel.mockReturnValue(fetchModelSuccessResponse);
    const { container } = render(<TripScreen />);
    expect(container.querySelector(".trip-aside-tools")).toBeInTheDocument();
  });
});
