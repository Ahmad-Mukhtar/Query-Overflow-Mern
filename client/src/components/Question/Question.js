import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//mui
import { Pagination } from "@mui/material";
//react-bootstrap
import { Spinner } from "react-bootstrap";

import QuestionList from "./QuestionList/QuestionList";
import AskQuestion from "../../layouts/Modals/AskQuestion";

import questionInstance from "../../axios/questionInstance";
import { getToken } from "../../store/localStorage";

const Question = () => {
  const token = getToken();
  const [showAsk, setShowAsk] = useState(false);
  const [reload, setReload] = useState(false);

  const [questionData, setQquestionData] = useState([]);
  const [questionCount, setQuestionCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const limit = 5;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuestionData = async () => {
      setLoading(true);
      try {
        const questionResponse = await questionInstance.get("/get-questions", {
          params: {
            page: pageNumber,
            limit: limit,
          },
          headers: {
            "x-access-token": token,
          },
        });

        console.log(questionResponse.data);
        setQquestionData(questionResponse.data.data);
        setQuestionCount(
          Math.ceil(questionResponse.data.totalQuestions / limit)
        );
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    getQuestionData();
  }, [token, reload, pageNumber]);

  return (
    <>
      <AskQuestion
        showAsk={showAsk}
        setShowAsk={setShowAsk}
        setReload={setReload}
      />
      <div className="question-container my-4 w-100 d-flex align-items-center justify-content-center">
        <div className="spinner-container">
          {loading && <Spinner animation="border" variant="warning"></Spinner>}
        </div>

        <div className="question-lists">
          <div className="question-header">
            <div className="current-question  d-flex d-flex align-items-center justify-content-between">
              <h5>ALL Questions</h5>
              <button className="btn ask" onClick={(e) => setShowAsk(true)}>
                Ask Question
              </button>
            </div>
          </div>
          <div className="question-data my-5">
            {questionData &&
              questionData.map((value) => {
                return (
                  <Link
                    key={value._id}
                    to={`/main/question-detail/${value._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <QuestionList question={value} />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
      <div className="pagination w-100 my-5 d-flex justify-content-center">
        <Pagination
          count={questionCount}
          color="primary"
          onChange={(event, value) => setPageNumber(value)}
          page={pageNumber}
        />
      </div>
    </>
  );
};

export default Question;
