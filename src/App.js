import React, { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";

import "./App.css";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const tokenAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

const App = () => {
  const [greeting, setGreetingValue] = useState("");
  const [userAccount, setUserAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [uiAmount, setUiAmount] = useState(0);
  const [uiBalance, setUiBalance] = useState(100000);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log("Balnce: ", balance.toString());
      setUiBalance(balance.toString());
    }
  }

  async function sendCoin() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      alert(`${amount} coins successfully sent to ${userAccount}`);
      setUiAmount(amount);
    }
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );

      try {
        const data = await contract.greet();
        console.log("data", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
    }
  }

  return (
    <div className="App">
      <div className="center_bgd">
        <h1 style={{ color: "whitesmoke", textTransform: "uppercase" }}>
          react Dapp App
        </h1>

        <div className="exchange_content">
          <p className="header_text">You Send</p>

          <div className="num_symbol">
            <h3 className="nubSymbol">{uiAmount}</h3>
            <h3 className="nubSymbol">NDT</h3>
          </div>

          <div className="line" />
        </div>

        <div className="exchange_content">
          <p className="header_text">You Recieved</p>

          <div className="num_symbol">
            <h3 className="nubSymbol">0.000</h3>
            <h3 className="nubSymbol">NDT</h3>
          </div>

          <div className="line" />
        </div>

        <div className="exchange_content">
          <p className="header_text">Available balance</p>
          <div
            style={{
              border: "1px solid rgb(249, 249, 249,.5)",
              width: "100%",
              padding: "15px",
              borderRadius: "20px",
            }}
          >
            <div className="num_symbol">
              <h3 className="nubSymbol">{uiBalance}</h3>
              <h3 className="nubSymbol">NDT</h3>
            </div>
          </div>
        </div>

        <div className="btn_container">
          <div className="input_box">
            <input
              className="input"
              placeholder="Address ID"
              onChange={(e) => setUserAccount(e.target.value)}
            />
            <input
              className="input"
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="btn_box">
            <button className="btn" onClick={getBalance}>
              Get Balance
            </button>
            <button className="btn btnCoin" onClick={sendCoin}>
              Send Coins
            </button>
          </div>
        </div>

        {/* <button onClick={fetchGreeting}>fetch Greeting</button>
        <button onClick={setGreeting}>Reset greeting</button>
        <input
          placeholder="set greeting"
          value={greeting}
  background: #3e414b;
          onChange={(e) => setGreetingValue(e.target.value)}1a1d25 
        />

        */}
      </div>
    </div>
  );
};
export default App;
