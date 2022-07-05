import { useState, useEffect } from "react";

import { Spinner } from "react-bootstrap";

import {
  IconArrowBarDown,
  IconArrowBarUp,
  IconBookmark,
  IconBookmarkOff,
} from "@tabler/icons";

import bookmarkInstance from "../../axios/bookmarkInstance";
import answerInstance from "../../axios/answerInstance";
import { getToken } from "../../store/localStorage";

const AnswerDetail = ({ answer }) => {
  const token = getToken();
  const [answerVote, setAnswerVote] = useState(answer?.votes);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [bookmarkAnswers, setBookmarkAnswers] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setAnswerVote(answer?.votes);
  }, [answer]);

  useEffect(() => {
    const getBookmarkData = async () => {
      try {
        const bookmarkResponse = await bookmarkInstance.get(
          `/get-bookmark-answers`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        console.log(bookmarkResponse.data.data);
        setBookmarkAnswers(bookmarkResponse.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getBookmarkData();
  }, [token, answer]);

  useEffect(() => {
    const checkBookmark = () => {
      for (let i = 0; i <= bookmarkAnswers.length; i++) {
        if (answer._id === bookmarkAnswers[i]?.answerId._id) {
          setIsBookmarked(true);
          return;
        }
      }
      setIsBookmarked(false);
      return;
    };
    checkBookmark();
  }, [answer, bookmarkAnswers]);

  const bookmarkAnswer = async (e) => {
    e.preventDefault();
    try {
      setBookmarkLoading(true);
      const bookmarkResponse = await bookmarkInstance.post(
        "/bookmark-answer",
        {
          answerId: answer?._id,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setBookmarkLoading(false);
      setIsBookmarked(true);
      console.log(bookmarkResponse.data.data);
    } catch (err) {
      setBookmarkLoading(false);
      console.log(err.message);
    }
  };

  const removeBookmarkAnswer = async (e) => {
    e.preventDefault();
    try {
      setBookmarkLoading(true);
      const bookmarkResponse = await bookmarkInstance.post(
        "/remove-bookmark-answer",
        {
          answerId: answer?._id,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setBookmarkLoading(false);
      setIsBookmarked(false);
      console.log(bookmarkResponse.data.data);
    } catch (err) {
      setBookmarkLoading(false);
      console.log(err.message);
    }
  };

  const handleUpVotes = async (e, operation) => {
    e.preventDefault();
    try {
      const voteResponse = await answerInstance.post(
        "/update-up-vote",
        {
          answerId: answer?._id
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (operation === "inc") {
        setAnswerVote(answerVote + 1);
      } else {
        setAnswerVote(answerVote - 1);
      }
      console.log(voteResponse.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDownVotes = async (e, operation) => {
    e.preventDefault();
    try {
      const voteResponse = await answerInstance.post(
        "/update-down-vote",
        {
          answerId: answer?._id
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (operation === "inc") {
        setAnswerVote(answerVote + 1);
      } else {
        setAnswerVote(answerVote - 1);
      }
      console.log(voteResponse.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="answer-section">
        <div className="divider my-4"></div>
        <div className="answer-content d-flex  justify-content-between">
          <div className="votes-btn d-flex flex-column align-items-center px-5 mx-3">
            <IconArrowBarUp
              onClick={(e) => handleUpVotes(e, "inc")}
              style={{ cursor: "pointer" }}
            />
            <span className="my-2">{answerVote}</span>
            <IconArrowBarDown
            onClick={(e) => handleDownVotes(e, "dec")}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="answer-body w-100">
            <div className="btn-groups w-100 d-flex justify-content-end mr-3">
              {!isBookmarked &&
                (bookmarkLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <IconBookmarkOff
                    color="green"
                    size={35}
                    onClick={bookmarkAnswer}
                  />
                ))}
              {isBookmarked && (bookmarkLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <IconBookmark
                    color="red"
                    size={35}
                    onClick={removeBookmarkAnswer}
                  />
                ))}
            </div>
            <p
              className="answer-heading"
              style={{ width: "90%", marginLeft: "3rem" }}
            >
              {answer?.description}
            </p>
            <div
              className="answer-btns d-flex justify-content-between"
              style={{ marginTop: "2rem", marginLeft: "3rem" }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnswerDetail;
