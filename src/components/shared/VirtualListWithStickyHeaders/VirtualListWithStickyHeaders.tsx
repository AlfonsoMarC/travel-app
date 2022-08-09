import React, { useRef, useMemo } from "react";
import { useVirtual, defaultRangeExtractor, Range } from "react-virtual";

export interface StickyHeader {
  isHeader: true;
  [key: string]: any;
}

interface Props {
  items: any[];
  renderElement: (item: any) => JSX.Element;
  renderHeader?: (item: StickyHeader) => JSX.Element;
}

const VirtualListWithStickyHeaders: React.FC<Props> = ({
  items,
  renderElement,
  renderHeader
}) => {
  const parentRef = useRef(null);
  const activeStickyIndexRef = useRef<number>(-1);

  const stickyIndexes = useMemo(() => {
    const indexes: number[] = [];
    items.forEach((item: any, index: number) => {
      if (item.isHeader) {
        indexes.push(index);
      }
    });
    return indexes;
  }, [items]);

  const isSticky = (index: any) => stickyIndexes.includes(index);

  const isActiveSticky = (index: any) => activeStickyIndexRef.current === index;

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    rangeExtractor: React.useCallback(
      (range: Range) => {
        activeStickyIndexRef.current =
          [...stickyIndexes]
            .reverse()
            .find((index: number) => range.start >= index) ?? -1;

        const next = [
          activeStickyIndexRef.current,
          ...defaultRangeExtractor(range)
        ];

        const newSet: number[] = [];

        next.forEach(index => {
          if (!newSet.includes(index)) {
            newSet.push(index);
          }
        });

        return newSet.sort((a, b) => a - b);
      },
      [stickyIndexes]
    )
  });

  const getHtmlElement = (item: any) => {
    if (!item) {
      return null;
    } else if (!item.isHeader) {
      return renderElement(item);
    } else if (renderHeader) {
      return renderHeader(item);
    }
    return null;
  };

  if (!items.length) {
    return null;
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "auto"
      }}
      ref={parentRef}
    >
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: "100%",
          position: "relative"
        }}
      >
        {rowVirtualizer.virtualItems.map(virtualItem => {
          const item = items[virtualItem.index];

          return (
            <div
              key={virtualItem.index}
              ref={el => virtualItem.measureRef(el)}
              style={{
                ...(isSticky(virtualItem.index) ? { zIndex: 1 } : {}),
                ...(isActiveSticky(virtualItem.index)
                  ? { position: "sticky" }
                  : {
                      position: "absolute",
                      transform: `translateY(${virtualItem.start}px)`
                    }),
                top: 0,
                left: 0,
                width: "100%",
                height: `${item}px`
              }}
            >
              {getHtmlElement(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualListWithStickyHeaders;
