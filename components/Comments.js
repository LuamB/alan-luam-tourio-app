import styled from "styled-components";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton.js";
import { useState } from "react";

export default function Comments({ locationName, comments }) {
  console.log("comments: ", comments);
  const [commentData, setCommentData] = useState({ name: "", text: "" });

  const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid black;
    border-radius: 0.8rem;
    padding: 0.5rem;
    text-align: center;
    p {
      border-bottom: solid 1px black;
      padding: 20px;
    }
  `;

  async function handleSubmitComment(e) {
    e.preventDefault();
    if (commentData.name.trim() === "" && commentData.text.trim() === "") {
      return;
    }

    try {
      const response = await fetch(`/api/places/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        setCommentData({ name: "", text: "" });
      }
    } catch (e) {
      console.error("Error submitting comment: ", e);
    }

    // const commentFormData = new FormData(comment.target);
    // const placeData = Object.fromEntries(commentFormData);
  }

  return (
    <Article>
      <FormContainer onSubmit={() => handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" name="name" placeholder="name" />
        <Label htmlFor="comment">Your Comment</Label>
        <Input type="text" name="comment" placeholder="comment here..." />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
      {comments && (
        <>
          <h1> {comments.length} fans commented on this place:</h1>
          {comments.map(({ name, comment }, idx) => {
            return (
              <>
                <p key={idx}>
                  <small>
                    <strong>{name}</strong> commented on {locationName}
                  </small>
                </p>
                <span>{comment}</span>
              </>
            );
          })}
        </>
      )}
    </Article>
  );
}
