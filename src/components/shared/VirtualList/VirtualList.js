// TODO: Fix compatibylity with "@types/react": "^18.0.5"
import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  AutoSizer,
  CellMeasurer,
  List,
  CellMeasurerCache
} from "react-virtualized";

const VirtualList = ({ items, rowRenderer }) => {
  const cellMeasurerCache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100
      }),
    []
  );

  useEffect(() => {
    // Recalculate item size onresize
    window.addEventListener("resize", () => cellMeasurerCache.clearAll());

    return () => {
      window.removeEventListener("resize", () => cellMeasurerCache.clearAll());
    };
  }, [cellMeasurerCache]);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          width={width}
          height={height}
          estimatedRowSize={100}
          overscanRowCount={7}
          rowCount={items.length}
          rowHeight={cellMeasurerCache.rowHeight}
          rowRenderer={params =>
            rowRenderer(params, CellMeasurer, cellMeasurerCache)
          }
        />
      )}
    </AutoSizer>
  );
};

VirtualList.propTypes = {
  items: PropTypes.array,
  rowRenderer: PropTypes.func
};

export default VirtualList;
