import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function NonVerifiedRefugees({ contract }) {
  const [nonVerifiedRefugees, setNonVerifiedRefugees] = useState([]);

  useEffect(() => {
    const getNonVerifiedRefugees = async () => {
      try {
        const refugees = await contract.getAllNonVerifiedRefugees();
        setNonVerifiedRefugees(refugees);
      } catch (error) {
        console.error("Error fetching non-verified refugees:", error);
      }
    };

    getNonVerifiedRefugees();
  }, [contract]);

  return (
    <div>
      <h2>Non-Verified Refugees</h2>
      <ul>
        {nonVerifiedRefugees.map((refugee, index) => (
          <li key={index}>
            <strong>Name:</strong> {refugee.name}, <strong>Address:</strong>{" "}
            {refugee.currentAddress}, <strong>UNHRC ID:</strong>{" "}
            {refugee.unhrcID.toString()}, <strong>Account Address:</strong>{" "}
            {refugee.accountAddress}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NonVerifiedRefugees;
