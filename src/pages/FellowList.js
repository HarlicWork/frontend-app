import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import SearchBar from "../components/SearchBar";

import classes from "./FellowList.module.css";

const FELLOWS = gql`
  query GetFellows {
    fellows {
      id
      name
      discipline
      area_of_expertise
      email
      secondary_email
      official_address
      date_of_election
      gender
      phone
      mobile_number
      biography
      image {
        id
        name
        url
      }
    }
  }
`;

const FellowList = () => {
  const { data, error, loading } = useQuery(FELLOWS);
  const [searchFellow, setSearchFellow] = useState("");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching fellow list</p>;
  }

  console.log(data);

  return (
    <div>
      <SearchBar onChange={(e) => setSearchFellow(e.target.value)} />
      {data.fellows
        .filter((fellow) => {
          if (fellow.name.toLowerCase().includes(searchFellow.toLowerCase())) {
            return fellow;
          }
          return "";
        })
        .map((fellow) => (
          <div key={fellow.id} className={classes.fellowlist}>
            <img
              src={`http://localhost:1337${fellow.image.url}`}
              alt="fellow_img"
              className={classes.fellowImg}
            />
            <h2>{fellow.name}</h2>
            <h5>{fellow.discipline}</h5>
            <p>{fellow.biography.substring(0, 200)} ...</p>
            <Link to="#">Read More</Link>
          </div>
        ))}
    </div>
  );
};

export default FellowList;
