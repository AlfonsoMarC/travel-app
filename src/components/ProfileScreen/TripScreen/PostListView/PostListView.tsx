import React from "react";
import styled from "styled-components";
import VirtualListWithStickyHeaders, {
  StickyHeader
} from "components/shared/VirtualListWithStickyHeaders/VirtualListWithStickyHeaders";
import { Post, Trip } from "types/types";
import PostItem from "./PostItem/PostItem";
import PostHeaderItem from "./PostHeaderItem/PostHeaderItem";

const StyledPostListViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const getItems = (trip: Trip) => {
  let items: Item[] = [];
  trip.locations?.forEach(location => {
    const locationPosts =
      trip.posts?.filter(post => post.location === location._id) ?? [];
    items = [
      ...items,
      { isHeader: true, title: `${trip.title}: ${location.name}` },
      ...locationPosts
    ];
  });
  const noLocationPosts = trip.posts?.filter(post => !post.location) ?? [];
  return noLocationPosts.length
    ? [...items, { isHeader: true, title: `${trip.title}` }, ...noLocationPosts]
    : items;
};

const renderPost = (post: Post) => <PostItem post={post} />;

const renderPostHeader = (item: StickyHeader) => (
  <PostHeaderItem title={item.title} />
);

interface Props {
  trip: Trip;
}

type Item = Post | StickyHeader;

const PostListView: React.FC<Props> = ({ trip }) => {
  return (
    <StyledPostListViewContainer>
      <VirtualListWithStickyHeaders
        items={getItems(trip)}
        renderElement={renderPost}
        renderHeader={renderPostHeader}
      />
    </StyledPostListViewContainer>
  );
};

export default PostListView;
