import React from "react";
import PropTypes from "prop-types";

const StatComparerContainer = ({ children, className }) => {
  return (
    <div className={`rounded-lg shadow-lg w-full ${className}`}>
      <h2 className="text-3xl font-semibold text-blue-400 mb-10 text-center">
        Stats Comparer
      </h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 shadow-inner grid place-items-center w-full"
        style={{
          boxShadow: "inset 0 6px 12px rgba(0, 0, 0, 0.7), inset 0 -6px 12px rgba(0, 0, 0, 0.7)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

StatComparerContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StatComparerContainer;


