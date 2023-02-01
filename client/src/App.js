import abi from "./contract/BuyCoffee.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/buy";
import GetMemos from "./components/getMemos";
import coffee from "./coffee.png";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      // Deployed Contract Address
      const contractAddress = "0x781413c0126F931E27F9Db7E0646A1Be6C079E0D";
      // Contract's Abi
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          // Reload the page when chain id is changed
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Reload the page when account is changed
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
          // Get provider to communicate with the blockchain
          const provider = new ethers.providers.Web3Provider(ethereum);

          // get signer, signer is an object that represents an ethereum account
          // Its used to send transactions to smart contracts and other accounts
          const signer = provider.getSigner();

          // Create a new Instance of contract so we can interact with it
          // require contract address, its abi and signer/provider
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please Insatall Metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <img src={coffee} className="img-fluid" alt=".." width="100%" />
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <GetMemos state={state} />
      </div>
    </div>
  );
}

export default App;
