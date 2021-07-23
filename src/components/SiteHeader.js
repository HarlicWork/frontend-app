import React from "react";
import { Link } from "react-router-dom";

const SiteHeader = () => {
  return (
    <div className="site-header">
      <Link to="/">
        <h1>App Review</h1>
      </Link>
    </div>
  );
};

export default SiteHeader;