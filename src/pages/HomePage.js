import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data, error, loading } = useFetch("http://localhost:1337/reviews");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  console.log(data);

  return (
    <div>
      {data.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          {/* <img src={`http://localhost:1337${review.image.formats.thumbnail.url}`} alt="img" /> */}

          <small>console list</small>

          <p>{review.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
