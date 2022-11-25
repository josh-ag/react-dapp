import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";

const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const tokenAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";

function App() {
  const [greeting, setGreetingValue] = useState("");
  const [userAccount, setUserAccount] = useState("");
  const [amount, setAmount] = useState("");

  //request account from wallet #metamask
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        Greeter.abi,
        provider
      );

      try {
        const data = await contract.greet();
        console.log("Data: ", data);
      } catch (err) {
        if (err) {
          console.log("Error: ", err);
        }
      }
    } else {
      console.log("Your browser doesn't provide support for Ethereum");
    }
  }

  async function setGreeting() {
    if (!greeting) return;

    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        Greeter.abi,
        signer
      );
      const transaction = await contract.setGreeting(greeting);
      setGreetingValue(null);
      await transaction.wait();
      fetchGreeting();
    }
  }

  //Get Token Balc
  async function getTokenBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);

      console.log("Account Balance: ", balance.toString());
    }
  }

  //Send Coins
  async function sendCoins() {
    if (!userAccount) {
      alert("Account ID Required For This Transaction!");
      return;
    }
    if (!amount) {
      alert("Amount Is Required!");
      return;
    }

    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);

      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();

      console.log(`${amount} was successfully send to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      <h2>Welcome To My First React Dapp</h2>
      <hr />
      <br />
      <br />
      <section>
        <input
          type="text"
          value={greeting}
          placeholder="set greeting"
          onChange={(e) => setGreetingValue(e.target.value)}
        />

        <div style={{ marginTop: 10 }}>
          <button onClick={fetchGreeting}>Get Greeting</button>
          <button onClick={setGreeting}>Set Greeting</button>
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <input
          type="text"
          value={userAccount}
          placeholder="Account ID"
          onChange={(e) => setUserAccount(e.target.value)}
        />

        <input
          type="text"
          value={amount}
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <div style={{ marginTop: 10 }}>
          <button onClick={getTokenBalance}>Get Coin Balance</button>
          <button onClick={sendCoins}>Send Coin</button>
        </div>
      </section>
    </div>
  );
}

export default App;
