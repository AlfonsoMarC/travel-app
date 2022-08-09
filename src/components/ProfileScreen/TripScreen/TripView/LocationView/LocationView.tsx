import React from "react";
import styled from "styled-components";
import { ListRowProps, CellMeasurerProps } from "react-virtualized";
import { CellMeasurerCacheInterface } from "react-virtualized/dist/es/CellMeasurer";
import { Post } from "types/types";
import VirtualList from "components/shared/VirtualList/VirtualList.js";

const location = {
  name: "Wroclaw",
  coordinates: [1, 2],
  posts: [
    {
      img: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg",
      title: "very nice place1",
      comment: "very nice"
    },
    {
      img: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg",
      title: "very nice place2",
      comment: "very nice"
    },
    {
      img: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg",
      title: "very nice place3",
      comment: "very nice"
    },
    {
      img: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg",
      title: "very nice place4",
      comment: "very nice"
    },
    {
      img: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg",
      title: "very nice place5",
      comment: "very nice"
    },
    {
      img: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg",
      title: "very nice place6",
      comment: "very nice"
    },
    {
      img: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg",
      title: "very nice place7",
      comment: "very nice"
    }
  ]
};

const StyledLocationViewContainer = styled.div`
  .ReactVirtualized__List {
    scrollbar-gutter: stable both-edges;
  }
  .no-posts-view {
    border: 1px solid black;
    height: 100%;
    width: 100%;
  }
`;

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 4px;
  margin-bottom: 4px;
  padding-right: 30%;

  .container {
    display: inline-block;
    position: relative;
    width: 100%;
    height: fit-content;
    padding: 0;
  }
  .dummy {
    margin-top: 100%;
  }
  .element {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

interface Props {
  posts: Post[];
  locations?: Location[];
}

const LocationView: React.FC<Props> = ({ posts }) => {
  const rows: Post[][] = [];
  for (let i = 0; i < posts.length; i += 3) {
    rows.push(posts.slice(i, i + 3));
  }

  const rowRenderer = (
    params: ListRowProps,
    CellMeasurer: React.FC<CellMeasurerProps>,
    cacheInstance: CellMeasurerCacheInterface,
    rows: Post[][]
  ) => {
    const { index, parent, style } = params;
    const row = rows[index];
    return (
      <CellMeasurer
        cache={cacheInstance}
        rowIndex={index}
        columnIndex={0}
        key={`CellMeasurerRow_${index}`}
        parent={parent}
      >
        <div key={`item_${index}`} style={style}>
          <RowContainer>
            {row?.map((post: Post, key: number) => (
              <div key={key} className="container">
                <div className="dummy" />
                <div className="element">
                  <img src={post.img} alt="..." />
                </div>
              </div>
            ))}
          </RowContainer>
        </div>
      </CellMeasurer>
    );
  };

  return (
    <StyledLocationViewContainer>
      {posts.length ? (
        <VirtualList
          items={rows}
          rowRenderer={(params, CellMeasurer, cacheInstance) =>
            rowRenderer(params, CellMeasurer, cacheInstance, rows)
          }
        />
      ) : (
        <div className="no-posts-view" />
      )}
    </StyledLocationViewContainer>
  );
};

export default LocationView;
