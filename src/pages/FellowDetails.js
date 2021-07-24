import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

import Card from "../components/Card";

const FELLOW = gql`
  query GetFellow($id: ID!) {
    fellow(id: $id) {
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

const FellowDetails = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(FELLOW, {
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
      <Card>
        <div className="fellow-detail">
          <h1>{data.fellow.name}</h1>
          <img
            src={`http://localhost:1337${data.fellow.image.url}`}
            alt="fellow_img"
          />

          <label htmlFor="expertise">Area of Expertise:</label>
          <span>
            <h4 className="textData">{data.fellow.area_of_expertise}</h4>
          </span>

          <label htmlFor="discipline">Discipline:</label>
          <span>
            <h4 className="textData">{data.fellow.discipline}</h4>
          </span>

          <label htmlFor="email">Email:</label>
          <span>
            <h4 className="textData">
              <a href={`mailto:${data.fellow.email}`}>{data.fellow.email}</a>
            </h4>
          </span>

          <label htmlFor="address">Address:</label>
          <span>
            <h4 className="textData">{data.fellow.official_address}</h4>
          </span>

          <label htmlFor="electionYear">Year of Election:</label>
          <span>
            <h4 className="textData">
              {new Date(data.fellow.date_of_election).getFullYear()}
            </h4>
          </span>

          <label htmlFor="gender">Gender:</label>
          <span>
            <h4 className="textData">{data.fellow.gender}</h4>
          </span>

          <label htmlFor="phone">Phone:</label>
          <span>
            <h4 className="textData">{data.fellow.phone}</h4>
          </span>

          <label htmlFor="mobile_phone">Mobile Phone:</label>
          <span>
            <h4 className="textData">{data.fellow.mobile_number}</h4>
          </span>

          <label htmlFor="biography">Biography</label>
          <span>
            <ReactMarkdown>{data.fellow.biography}</ReactMarkdown>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default FellowDetails;
