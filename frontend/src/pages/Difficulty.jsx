import React, { useEffect, useState } from "react";
import { chooseDifficulty } from "../APIRoutes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Styles/Difficulty.css'
export default function Difficulty() {
  const navigate = useNavigate();

  const [currentDifficulty, setcurrentDifficulty] = useState("");
  const handleClick = async (event) => {
    setcurrentDifficulty(event.target.className); //this set the difficulty according to the targeted button's className
  };
  useEffect(() => {
    const changedifficinbackend = async () => {
      try {
        console.log(currentDifficulty);
      const User = JSON.parse(localStorage.getItem("User")); //destructuring username and userid form localstorage
      if (!User) {
        console.log("user not found in local storage");
      } else if (User && currentDifficulty) {
        //i.e. only when we have a user and a currentLanguage, so this executes after changes
        const { username, _id } = User; //sending _id without having in our model cause it is by default generated
        console.log(User);
        const { data } = await axios.post(chooseDifficulty, {
          //updating user data in database
          username,
          currentDifficulty,
          _id,
        });
        console.log(data, "kkkkk");
        if (data === false) {
          console.log("error setting difficulty");
        }

        const updatedUser = data.updatedUser; //
        localStorage.setItem("User", JSON.stringify(updatedUser)); //updating user in local storage
        navigate("/main");
      }
      } catch (error) {
        console.log(error);
      }
      // You can perform other actions that depend on the updated state here
    };
    changedifficinbackend();
  }, [currentDifficulty]);
  return (
    <div className="outer">
      <div className="Diffcontent">
        <div className="difficulty-text">CHOOSE DIFFICULTY</div>
        <div className="difficulty-button">
          <button
            type="button"
            className="Easy"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            EASY
          </button>
        </div>
        <div className="difficulty-button">
          <button
            type="button"
            className="Medium"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            MEDIUM
          </button>
        </div>
        <div className="difficulty-button">
          <button
            type="button"
            className="Hard"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            HARD
          </button>
        </div>
      </div>
    </div>
  );
}
