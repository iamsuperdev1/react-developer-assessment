import React from 'react';
import { CardBodySummary, CardBodyTitle, CardContainer, CardFooter, CardHeader, CardHeaderImage, CardHeaderName, StyledLink } from './style';

type CardProps = {
    post: IPost;
}

export const Card: React.FC<CardProps> = ({ post }) => {
    return (
        <CardContainer>
            <CardHeader>
                <CardHeaderImage src={post.author.avatar} alt="" width={100} height={100} />
                <StyledLink to={`/posts/${post.id}`}>
                <CardHeaderName>
                    {post.author.name}
                </CardHeaderName>
                </StyledLink>
            </CardHeader>
            <CardBodyTitle>{post.title}</CardBodyTitle>
            <CardBodySummary>{post.summary}</CardBodySummary>
            <CardBodyTitle>Category:</CardBodyTitle>
            <ul>{post.categories.map(cate => {
                return <li key={cate.id}>{cate.name}</li>
            })}</ul>
            <CardFooter>
                <p>{new Date(post.publishDate).toDateString()}</p>
            </CardFooter>
        </CardContainer>
    )
}
