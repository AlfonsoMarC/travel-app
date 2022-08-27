import React from "react";
import styled from "styled-components";
import { Post } from "types/types";

const StyledPostItemContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.space4} 0;
`;

interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = ({ post }) => {
  return (
    <StyledPostItemContainer>
      <img
        src={post.img}
        alt={post.title}
        width="100%"
        height="auto"
        loading="lazy"
      />
      {post.title && <div className="post-title">{post.title}</div>}
      {post.comment && <div className="post-comment">{post.comment}</div>}
    </StyledPostItemContainer>
  );
};

export default PostItem;
