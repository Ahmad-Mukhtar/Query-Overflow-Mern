import React, { useState, useEffect } from "react";

//react-bootstrap
import { Spinner } from "react-bootstrap";

import QuestionList from "../QuestionList/QuestionList";

import questionInstance from "../../../axios/questionInstance";
import { getToken } from "../../../store/localStorage";

const Question = () => {
  const token = getToken();
  const [reload, setReload] = useState(false);
  const [questionData, setQquestionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuestionData = async () => {
      setLoading(true);
      try {
        const questionResponse = await questionInstance.get(
          "/get-user-questions",
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        console.log(questionResponse.data.data);
        setQquestionData(questionResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    getQuestionData();
  }, [token, reload]);

  return (
    <>
      <div className="question-container my-4 w-100 d-flex align-items-center justify-content-center">
        <div className="spinner-container">
          {loading && <Spinner animation="border" variant="warning"></Spinner>}
        </div>

        <div className="question-lists">
          <div className="question-header">
            <div className="current-question  d-flex d-flex align-items-center justify-content-between"></div>
          </div>
          <div className="question-data my-5">
            {questionData &&
              questionData.map((value) => {
                return (
                  <QuestionList
                    key={value._id}
                    question={value}
                    setReload={setReload}
                    showBtns={true}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
