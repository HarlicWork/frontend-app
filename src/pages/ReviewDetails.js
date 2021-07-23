import React from "react";
import { useParams } from "react-router-dom";
// import useFetch from "../hooks/useFetch";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      id
      title
      rating
      body
      categories {
        name
        id
      }
    }
  }
`;

const ReviewDetails = () => {
  const { id } = useParams();
  // const { data, error, loading } = useFetch(
  //   "http://localhost:1337/reviews/" + id
  // );

  const { data, error, loading } = useQuery(REVIEW, {
    variables: { id: id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(data);

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <div>
      <div className="review-card">
        <div className="rating">{data.review.rating}</div>
        <h2>{data.review.title}</h2>

        {data.review.categories.map((c) => (
          <small key={c.id}>{c.name}</small>
        ))}

        <ReactMarkdown>{data.review.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ReviewDetails;
