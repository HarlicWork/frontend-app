import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";

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

  //   console.log(data);

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
          <Card key={fellow.id}>
            <h1>{fellow.name}</h1>
            <label htmlFor="expertise">Area of Expertise</label>
            <span>
              <h5>{fellow.area_of_expertise}</h5>
            </span>
            <label htmlFor="discipline">Discipline</label>
            <span>
              <h5>{fellow.discipline}</h5>
            </span>
            <Link to={`/fellow/${fellow.id}`}>More Information</Link>
          </Card>
        ))}
    </div>
  );
};

export default FellowList;
