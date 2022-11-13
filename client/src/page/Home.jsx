import React from "react";
import { useState, useEffect } from "react";
import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();
  const handleClick = async () => {
    if (playerName === "") {
      setShowAlert({
        status: true,
        type: "failure",
        message: "invalid player name",
      });
      return;
    }
    try {
      const isPlayer = await contract.isPlayer(walletAddress);
      if (!isPlayer) {
        await contract.registerPlayer(playerName, "AXGOD");
        setShowAlert({
          status: true,
          type: "info",
          message: "player has commited the game",
        });
      } else {
        setShowAlert({
          status: true,
          type: "info",
          message: "your were a player",
        });
      }
    } catch (error) {
      setShowAlert({
        status: true,
        type: "failure",
        message: `transaction went something wrong`,
      });
    }
  };

  useEffect(() => {
    const createPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);

      if (playerExists && playerTokenExists) navigate("/create-battle");
    };

    if (contract) createPlayerToken();
  }, [contract]);
  return (
    <div className="flex flex-col">
      <CustomInput
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />

      <CustomButton
        title="Register"
        handleClick={handleClick}
        restStyles="mt-6"
      />
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card
    Game
  </>
);
