import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const PostDetail: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    
    return (
        <div>
            <p>Post Details {postId}</p>
        </div>
    )
}

export default PostDetail;
