import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIService from "../../services/api.services";
import LoadingIndicatorV2 from "../LoadingIndicatorV2";
import {
  PabelBackBtn, Panel, PanelFooter, PanelImage,
  PanelLeft, PanelLi, PanelParagraph, PanelRight, PanelSpan, PanelUL
} from './styles';

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  
  useEffect(() => {
    const fetchPost = async (id: string) => {
      const res = await APIService.getPostById(id);
      if (res) {
        setPost(res);
      }
    };
    
    fetchPost(postId);
  }, [postId])
  
  return (
    <> 
    { !post ? (
        <LoadingIndicatorV2 />
      ): (
        <Panel>
          <PanelLeft>
            <PanelImage src={post.author.avatar} alt="" width={100} height={100}></PanelImage>
          </PanelLeft>
          <PanelRight>
            <PanelParagraph>{post.author.name}</PanelParagraph>
            <PanelParagraph>{post.publishDate}</PanelParagraph>
            <PanelParagraph>{post.title}</PanelParagraph>
            <PanelParagraph>{post.summary}</PanelParagraph>
            <PanelParagraph>Categories</PanelParagraph>
            <PanelUL>
              {post.categories.map((category, index) => (
                <PanelLi >{category.name}</PanelLi>
              ))}
            </PanelUL>
            <PanelSpan>Publish Date: {post.publishDate}</PanelSpan>
            <PanelFooter>
              <PabelBackBtn>Back</PabelBackBtn>
            </PanelFooter>
          </PanelRight>
        </Panel>
      )}
    </>
  )
};
      
export default PostDetail;
      