import { prettyDOM, render, screen } from "test-utils";
import VirtualListWithStickyHeaders, {
  StickyHeader
} from "./VirtualListWithStickyHeaders";
//import { prettyDOM } from "@testing-library/dom";

interface TestItem {
  label: string;
}

const items: (TestItem | StickyHeader)[] = [
  { label: "title", isHeader: true },
  { label: "item1" },
  { label: "item2" }
];

const renderHeader = (item: StickyHeader) => <div>{item.label}</div>;
const renderElement = (item: TestItem) => <div>{item.label}</div>;

describe("VirtualListWithStickyHeaders", () => {
  test("should render list and items", () => {
    render(
      <VirtualListWithStickyHeaders
        items={items}
        renderElement={renderElement}
        renderHeader={renderHeader}
      />
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("item1")).toBeInTheDocument();
    expect(screen.getByText("item2")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")[0]).toHaveStyle("position:sticky");
  });
  test("should render  render items with renderElement and header with renderHeader", () => {
    const mockRenderElement = jest.fn(renderElement);
    const mockRenderHeader = jest.fn(renderHeader);
    render(
      <VirtualListWithStickyHeaders
        items={items}
        renderElement={mockRenderElement}
        renderHeader={mockRenderHeader}
      />
    );
    expect(mockRenderElement).toHaveBeenCalledWith({ label: "item1" });
    expect(mockRenderElement).toHaveBeenCalledWith({ label: "item2" });
    expect(mockRenderElement).not.toHaveBeenCalledWith({
      label: "title",
      isHeader: true
    });

    expect(mockRenderHeader).not.toHaveBeenCalledWith({ label: "item1" });
    expect(mockRenderHeader).not.toHaveBeenCalledWith({ label: "item2" });
    expect(mockRenderHeader).toHaveBeenCalledWith({
      label: "title",
      isHeader: true
    });
  });
});
