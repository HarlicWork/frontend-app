import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const DISCIPLINES = gql`
  query GetDisciplines {
    disciplines {
      name
      id
    }
  }
`;

const SiteHeader = () => {
  const { data, error, loading } = useQuery(DISCIPLINES);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error fetching categories</p>;
  }

  return (
    <div className="site-header">
      <Link to="/">
        <h1>ASM Fellow List</h1>
      </Link>
      <nav className="categories">
        <span>Filter fellow by discipline:</span>
        {data.disciplines.map((discipline) => (
          <Link key={discipline.id} to={`/discipline/${discipline.id}`}>
            {discipline.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SiteHeader;
