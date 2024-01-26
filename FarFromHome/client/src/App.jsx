import { useState, useEffect } from "react";
import abi from "./contracts/contracts/FFH.sol/FFH.json";
import { ethers } from "ethers";
import RegisterAsRefugee from "./components/RegisterAsRefugee";
import VerifyRefugee from "./components/VerifyRefugee";
import RejectRefugee from "./components/RejectRefugee";
import NonVerifiedRefugees from "./components/NonVerifiedRefugees";
import VerifiedRefugees from "./components/VerifiedRefugees";
import ActualBalance from "./components/ActualBalance";
import ContractBalance from "./components/ContractBalance";

import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  useEffect(() => {
    const template = async () => {
      const contractAddress = "0xf4E89a276F1cCbA2fd2F1d57B82A5a0f42891348";
      const contractABI = abi.abi;
      try {
        // MetaMask part
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("accountsChanged", (accounts) => {
          setAccount(accounts[0]);
        });
        setAccount(account[0]);

        // Ethers part
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        // Contract instance part
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(contract);
        setState({ provider, signer, contract });
      } catch (err) {
        alert(err);
      }
    };
    template();
  }, []);
  return (
    <div className="App">
      <h1>FarFromHome</h1>
      <h2>App for refugees</h2>
      <p>Connected Account: {account}</p>
      {state.contract && <RegisterAsRefugee contract={state.contract} />}
      <br />
      <br />
      {state.contract && <VerifyRefugee contract={state.contract} />}
      <br />
      <br />
      {state.contract && <RejectRefugee contract={state.contract} />}
      <br />
      <br />
      {state.contract && <NonVerifiedRefugees contract={state.contract} />}
      <br />
      <br />
      {state.contract && <VerifiedRefugees contract={state.contract} />}
      <br />
      <br />
      {state.contract && <ActualBalance contract={state.contract} />}
      <br />
      <br />
      {state.contract && <ContractBalance contract={state.contract} />}
    </div>
  );
}

export default App;
