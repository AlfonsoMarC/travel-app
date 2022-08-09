import { render } from "test-utils";
import Button from "./Button";

describe("Button", () => {
  test("should match snapshot", () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
  });
});
