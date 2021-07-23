import React, { useState } from "react";
// import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import SearchBar from "../components/SearchBar";

const REVIEWS = gql`
  query GetReviews {
    reviews {
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

const HomePage = () => {
  // const { data, error, loading } = useFetch("http://localhost:1337/reviews");
  const { data, error, loading } = useQuery(REVIEWS);
  const [searchTitle, setSearchTitle] = useState("");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  console.log(data);

  return (
    <div>
      <SearchBar onChange={(e) => setSearchTitle(e.target.value)} />
      {data.reviews
        .filter((review) => {
          if (review.title.toLowerCase().includes(searchTitle.toLowerCase())) {
            return review;
          }
          return "";
        })
        .map((review) => (
          <div key={review.id} className="review-card">
            <div className="rating">{review.rating}</div>
            <h2>{review.title}</h2>

            {review.categories.map((c) => (
              <small key={c.id}>{c.name}</small>
            ))}

            <p>{review.body.substring(0, 200)}...</p>
            <Link to={`/details/${review.id}`}>Read More</Link>
          </div>
        ))}
    </div>
  );
};

export default HomePage;
