import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function VerifiedRefugees({ contract }) {
  const [verifiedRefugees, setVerifiedRefugees] = useState([]);

  useEffect(() => {
    const getVerifiedRefugees = async () => {
      try {
        const refugees = await contract.getAllVerifiedRefugees();
        const formattedRefugees = refugees.map((refugee) => ({
          name: refugee.name,
          currentAddress: refugee.currentAddress,
          unhrcID: refugee.unhrcID.toString(), // Convert BigNumber to string
          accountAddress: refugee.accountAddress, // Assuming it's a string
        }));
        setVerifiedRefugees(formattedRefugees);
      } catch (error) {
        console.error("Error fetching verified refugees:", error);
      }
    };

    getVerifiedRefugees();
  }, [contract]);

  return (
    <div>
      <h2>Verified Refugees</h2>
      <ul>
        {verifiedRefugees.map((refugee, index) => (
          <li key={index}>
            <strong>Name:</strong> {refugee.name}, <strong>Address:</strong>{" "}
            {refugee.currentAddress}, <strong>UNHRC ID:</strong>{" "}
            {refugee.unhrcID}, <strong>Account Address:</strong>{" "}
            {refugee.accountAddress}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VerifiedRefugees;
