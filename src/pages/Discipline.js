import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

const DISCIPLINE = gql`
  query GetDiscipline($id: ID!) {
    discipline(id: $id) {
      id
      name
      fellows {
        id
        name
        discipline
        area_of_expertise
      }
    }
  }
`;

const Discipline = () => {
  const { id } = useParams();
  const [searchFellow, setSearchFellow] = useState("");
  const { data, error, loading } = useQuery(DISCIPLINE, {
    variables: { id: id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  //   console.log(data);

  return (
    <div>
      <SearchBar onChange={(e) => setSearchFellow(e.target.value)} />
      {data.discipline.fellows
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

export default Discipline;
