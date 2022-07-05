import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IconArrowBarDown, IconArrowBarUp } from "@tabler/icons";

import PostAnswer from "../../layouts/Modals/PostAnswer";
import AnswerDetail from "../Answer/AnswerDetail";

import { Spinner, Form } from "react-bootstrap";

import { getToken } from "../../store/localStorage";
import questionInstance from "../../axios/questionInstance";

const QuestionDetail = () => {
  const [open, setOpen] = useState(false);
  const token = getToken();
  const [questionData, setQuestionData] = useState({});
  const [questionVote, setQuestionVote] = useState(0);
  const [answerOfQuestion, setAnswerOfQuestion] = useState([]);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const { questionId } = useParams();

  useEffect(() => {
    const getQuestionData = async () => {
      setQuestionLoading(true);
      try {
        const questionResponse = await questionInstance.get(
          `/get-question/${questionId}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        console.log(questionResponse.data.data);
        setQuestionData(questionResponse.data.data.questionDetail);
        setAnswerOfQuestion(questionResponse.data.data.answersOfQuestion);
        setQuestionLoading(false);
      } catch (error) {
        console.log(error.message);
        setQuestionLoading(false);
      }
    };

    getQuestionData();
  }, [token, questionId, reload]);

  useEffect(() => {
    setQuestionVote(questionData.votes);
  }, [token, questionId, questionData, reload]);

  const handleUpVotes = async (e, questionId) => {
    e.preventDefault();
    try {
      const voteResponse = await questionInstance.post(
        "/update-up-vote",
        {
          questionId: questionId,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setQuestionVote(questionVote + 1);
      console.log(voteResponse.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDownVotes = async (e, questionId) => {
    e.preventDefault();
    try {
      const voteResponse = await questionInstance.post(
        "/update-down-vote",
        {
          questionId: questionId,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      setQuestionVote(questionVote - 1);
      console.log(voteResponse.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <PostAnswer showAsk={open} setShowAsk={setOpen} setReload={setReload} />
      <div className="spinner-container">
        {questionLoading && (
          <Spinner animation="border" variant="warning"></Spinner>
        )}
      </div>
      <div className="question-detail-section">
        <div className="question-detail-container">
          <div className="question-detail-header">
            <h3
              style={{
                marginBottom: "1rem",
                background: "#F67328",
                color: "white",
                width: "min-content",
                padding: ".2rem .8rem",
                borderRadius: "8px",
              }}
            >
              Question:
            </h3>
            <h4 className="question-heading">{questionData?.title}</h4>
            <div className="time w-100 d-flex justify-content-end align-items-center">
              <span>by {questionData?.userId?.firstName} {questionData?.userId?.lastName}</span>
              <span className="mx-2" style={{ fontSize: ".9rem" }}>
               at ({questionData && new Date(questionData?.createdAt).toDateString()})
              </span>
            </div>
          </div>
          <div className="divider my-4"></div>
          <div className="question-detail-body w-100 d-flex">
            <div className="votes-btn d-flex flex-column align-items-center mx-2">
              <IconArrowBarUp
                onClick={(e) => handleUpVotes(e, questionId)}
                style={{ cursor: "pointer" }}
              />
              <span className="my-2">{questionVote}</span>
              <IconArrowBarDown
                onClick={(e) => handleDownVotes(e, questionId)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <p className="mx-2">{questionData?.description}</p>
          </div>
          <div className="divider my-4"></div>

          <div className="answers">
            <div className="answer-header d-flex align-items-center justify-content-between">
              <h4
                style={{
                  textAlign: "center",
                  marginBottom: "1rem",
                  background: "#F67328",
                  color: "white",
                  width: "220px",
                  padding: ".4rem .8rem",
                  borderRadius: "8px",
                }}
              >
                Total Answers {questionData?.totalAnswers}
              </h4>
              <Form.Select
                aria-label="Default select example"
                style={{ width: "250px" }}
              >
                <option value="0">Highest Score (default)</option>
                <option value="1">Date Modified (newest first)</option>
                <option value="2">Date Created (old first)</option>
              </Form.Select>
            </div>
            {answerOfQuestion &&
              answerOfQuestion.map((value, index) => (
                <AnswerDetail key={index} answer={value} />
              ))}

            <div className="divider my-4"></div>
            <h4
              onClick={() => setOpen(true)}
              style={{
                textAlign: "center",
                marginBottom: "1rem",
                background: "#F67328",
                color: "white",
                width: "220px",
                padding: ".4rem .8rem",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Post Answer
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionDetail;
