import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
  query GetCategories {
    categories {
      name
      id
    }
  }
`;

const SiteHeader = () => {
  const { data, error, loading } = useQuery(CATEGORIES);

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
        {data.categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SiteHeader;
