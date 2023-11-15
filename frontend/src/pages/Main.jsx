import React, { useEffect, useState } from "react";
import "../Styles/Main.css";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { SiLevelsdotfyi } from "react-icons/si";
import { MdOutlineChangeCircle } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";


import { showQuestionsRoute, submitAnswerRoute } from "../APIRoutes";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [serial, setserial] = useState(undefined);
  const [options, setoptions] = useState([]);
  const [questions, setquestions] = useState([]);
  const [currentQuestion, setcurrentQuestion] = useState("1");
  const [questionid, setquestionid] = useState(0);
  const [option1, setoption1] = useState("");
  const [option2, setoption2] = useState("");
  const [option3, setoption3] = useState("");
  const [option4, setoption4] = useState("");
  const [answerId, setanswerId] = useState(undefined);
  const [Points, setPoints] = useState(undefined);
  const [clickedshowans, setclickedshowans] = useState(false);
  const [clickedoption, setclickedoption] = useState(0);
  const User = JSON.parse(localStorage.getItem(`User`));
  const { difficulty, language } = User;


  const navigate = useNavigate();

  useEffect(() => {
    //this is to set serial according to chosen difficulty
    if (difficulty === "Easy") {
      setserial(1);
    } else if (difficulty === "Medium") {
      setserial(31);
    } else if (difficulty === "Hard") {
      setserial(51);
    }
    
  }, []);
  useEffect(() => {
    //to change difficulty according to the serial
    if (serial !== undefined) {
      if (serial > 50) {
        User.difficulty = "Hard";
      } else if (serial > 0) {
        User.difficulty = "Easy";
      } else if (serial > 30 && serial < 51) {
        User.difficulty = "Medium";
      }
    }
  }, [serial]); //this hook will keep rendering everytime we change serial
  useEffect(() => {
    //fetching all the quesitns useing showQuestionsRoute in first load
    async function showquestions() {
      try {
        const { data } = await axios.post(showQuestionsRoute, {
          //from all the response we recieve from post request, we are destructuring data
          language,
        });
        setquestions(data.questions); //from data we are only taking questions out
      } catch (error) {
        console.log(error);
      }
    }
    showquestions();
    console.log("this is user in first load",User)
  }, [ serial]);

  useEffect(() => {
    //now after the question are fetched, filtering them to get 1 question
    if (questions.length !== 0) {
      const temp = questions.filter(
        (question) => question.questionId === serial //filtering question on basis of serial
      ); //questions was an array, so after filtering we get an array
      // console.log("this is the filtered question for required serial", temp); //this gives an array of 1 element which contains our questions data

      setcurrentQuestion(temp[0].question); //this gives us the question statement
      setanswerId(temp[0].answerId);
      setoptions(temp[0].options);
      setquestionid(temp[0].questionId);
      setclickedshowans(false);
      setclickedoption(0);
    }
  }, [serial, questions]);

  useEffect(() => {
    if (options?.length > 0) {
      //so that options is loaded before
      setoption1(options[0]);
      setoption2(options[1]);
      setoption3(options[2]);
      setoption4(options[3]);
    }
  }, [options]);
  const handleclick = (event) => {
    setclickedoption(parseInt(event.target.id));
    console.log(event.target.id);
    console.log(answerId);

    if (event.target.id !== answerId.toString()) {
      //i.e. if clicked button id doesnot matches with answerId
      console.log("not equal");
      setPoints(0); //means wrong answer
    } else {
      //if given right answer

      if (difficulty === "Easy") {
        setPoints(1);
      } else if (difficulty === "Medium") {
        setPoints(3);
      } else if (difficulty === "Hard") {
        setPoints(5);
      }
    }
  };
  
  useEffect(() => {
    console.log("points in useeffect",Points);

    if (Points !== undefined) {
      console.log(Points);
      async function sub() {
        const userid = User._id;
        console.log(userid);
        const { data } = await axios.post(submitAnswerRoute, {
          userid,
          questionid,
          Points,
        });
        console.log("updated user",data.updatedUser)
        if (data.status !== 200) {
          //status code 200 means ok
          localStorage.setItem("User",JSON.stringify(data.updatedUser))
          console.log("updated local storage",User);
        }
      }
      sub();
    }
  }, [Points]);

  const handleclicknextqn = () => {
    if(serial < 70 ){
      setserial((serial) => serial + 1);
    }    
  };
  const handleclickprevqn = () => {
    if (serial > 1) {
      setserial((serial) => serial - 1);
    }
  };
  useEffect(() => {
    console.log("newserial", serial);
  }, [serial]);

  const showProfile = () => {
    navigate('/myProfile')
  };
  const changemylanguage = () => {
    navigate('/chooseLang');
  };
  
  const changemydifficulty = () => {
    navigate('/difficulty')
  };
  const logmeout = () => {
        localStorage.clear();
        navigate("/login");
  };

  return (
    <div className="mainpage">
      <div className="dashboard">
        <div className="dash-text">MA-LANG</div>
        <div className="dash-in">
          <div className="dash-item" onClick={showProfile}>
            <div className="mypro-icon">
              {<CgProfile size={30}/>}
            </div>
            <div>
              MY PROFILE
            </div>
          </div>
          
          <div className="dash-item" onClick={changemydifficulty}>
            <div>
              <SiLevelsdotfyi size={25}/>
            </div>
            <div>
              CHANGE DIFFICULTY
            </div>
          </div>
          <div className="dash-item" onClick={changemylanguage}>
            <div>
              <MdOutlineChangeCircle size={30}/>
            </div>
            <div>
              CHANGE LANGUAGE
            </div>
          </div>
          <div className="dash-item" onClick={logmeout}>
            <div>
              <RiLogoutCircleLine size={28}/>
            </div>
            <div>

            </div>
            LOGOUT
          </div>
        </div>
      </div>
      <div className="container">
        <div className="container-in">
          <h2>Questions</h2>
          <div className="qn-container">
            <div className="serial">{`Ques.${serial}`}</div>
            <div className="question-div">
              <div className="question">{currentQuestion}</div>
            </div>
          </div>
          <div className="option-container">
            <div className="option-set">
              {option1 ? ( //so that button will only appear when option is loaded
                <button
                  className={`option1
                                 ${
                                   (clickedshowans && answerId === 1) ||
                                   (clickedoption === 1 && answerId === 1)
                                     ? "correct-answer"
                                     : ""
                                 }
                                 ${
                                   clickedoption === 1 && answerId !== 1
                                     ? "wrong-answer"
                                     : ""
                                 }`} //correct-answer class is applied when we click on show answer and it is this is the answer, or if we clicked on this option and this is the answer
                  //class wrong answer is applied when we click on this option and answerid doesnot matches with this option
                  id="1"
                  onClick={(e) => {
                    handleclick(e);
                  }}
                >
                  {option1.optionText}
                </button>
              ) : null}
              {option3 ? (
                <button
                  className={`option3
                               ${
                                 (clickedshowans && answerId === 3) ||
                                 (clickedoption === 3 && answerId === 3)
                                   ? "correct-answer"
                                   : ""
                               }
                               ${
                                 clickedoption === 3 && answerId !== 3
                                   ? "wrong-answer"
                                   : ""
                               }`}
                  id="3"
                  onClick={(e) => {
                    handleclick(e);
                  }}
                >
                  {option3.optionText}
                </button>
              ) : null}
            </div>
            <div className="option-set">
              {option2 ? ( //so that button will only appear when option is loaded
                <button
                  className={`option2
                                 ${
                                   (clickedshowans && answerId === 2) ||
                                   (clickedoption === 2 && answerId === 2)
                                     ? "correct-answer"
                                     : ""
                                 }
                                 ${
                                   clickedoption === 2 && answerId !== 2
                                     ? "wrong-answer"
                                     : ""
                                 }`} //correct-answer class is applied when we click on show answer and it is this is the answer, or if we clicked on this option and this is the answer
                  //class wrong answer is applied when we click on this option and answerid doesnot matches with this option
                  id="2"
                  onClick={(e) => {
                    handleclick(e);
                  }}
                >
                  {option2.optionText}
                </button>
              ) : null}
              {option4 ? (
                <button
                  className={`option4 ${
                    (clickedshowans && answerId === 4) ||
                    (clickedoption === 4 && answerId === 4)
                      ? "correct-answer"
                      : ""
                  }
                    ${
                      clickedoption === 4 && answerId !== 4
                        ? "wrong-answer"
                        : ""
                    }`}
                  id="4"
                  onClick={(e) => {
                    handleclick(e);
                  }}
                >
                  {option4.optionText}
                </button>
              ) : null}
            </div>
          </div>
          <div className="subans">
            <button
              className="subans-btn submit-answer"
              onClick={() => handleclickprevqn()}
            >
              PREVIOUS QUESTION
            </button>
            <button
              className="subans-btn submit-answer"
              onClick={() => handleclicknextqn()}
            >
              NEXT QUESTION
            </button>
            <button
              className="subans-btn show-answer"
              onClick={() => setclickedshowans(true)}
            >
              SHOW ANSWER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
