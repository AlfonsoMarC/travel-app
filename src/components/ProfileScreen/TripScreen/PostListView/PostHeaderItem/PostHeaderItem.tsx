import React from "react";
import styled from "styled-components";

const StyledPostHeaderContainer = styled.div`
  background: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid ${({ theme }) => theme.color.primary50};
  .icon {
    font-family: "Material Icons";
  }
`;

interface Props {
  title: string;
}

const PostHeaderItem: React.FC<Props> = ({ title }) => {
  return (
    <StyledPostHeaderContainer>
      <span className="icon">pin</span>
      {title}
    </StyledPostHeaderContainer>
  );
};

export default PostHeaderItem;
