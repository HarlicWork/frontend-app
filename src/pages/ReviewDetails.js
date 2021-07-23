import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const ReviewDetails = () => {
  const { id } = useParams();
  const { data, error, loading } = useFetch(
    "http://localhost:1337/reviews/" + id
  );

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
        <div className="rating">{data.rating}</div>
        <h2>{data.title}</h2>

        <small>console list</small>

        <p>{data.body}</p>
      </div>
    </div>
  );
};

export default ReviewDetails;
