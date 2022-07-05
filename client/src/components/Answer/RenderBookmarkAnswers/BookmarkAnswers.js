import { useState, useEffect } from "react";

import { IconTrash } from "@tabler/icons";
//react-bootstrap
import { Spinner } from "react-bootstrap";

import bookmarkInstance from "../../../axios/bookmarkInstance";
import { getToken } from "../../../store/localStorage";

const RenderAnswers = () => {
  const token = getToken();
  const [reload, setReload] = useState(false);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookmarkData = async () => {
      try {
        setLoading(true);
        const bookmarkResponse = await bookmarkInstance.get(
          `/get-bookmark-answers`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        console.log(bookmarkResponse.data.data);
        setBookmarkData(bookmarkResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    getBookmarkData();
  }, [token, reload]);

  const removeBookmarkAnswer = async (e, answerId) => {
    e.preventDefault();
    try {
      setLoading(true);
      const bookmarkResponse = await bookmarkInstance.post(
        "/remove-bookmark-answer",
        {
          answerId: answerId,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setLoading(false);
      setReload(!reload);
      console.log(bookmarkResponse.data.data);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  return (
    <div className="question-container my-4 w-100 d-flex align-items-center justify-content-center">
      <div className="spinner-container">
        {loading && <Spinner animation="border" variant="warning"></Spinner>}
      </div>

      <div className="question-lists">
        <div className="question-header">
          <div className="current-question  d-flex d-flex align-items-center justify-content-between">
            <h5>Bookmarked Answers</h5>
          </div>
        </div>
        <div className="question-data my-5">
          {bookmarkData &&
            bookmarkData.map((value) => {
              return (
                <div className="question-content-container bg-white shadow w-100 my-4 py-4 px-5">
                  <div
                    className="answer-btns d-flex w-100 justify-content-end"
                    style={{ margin: "1rem 0" }}
                  >
                    <IconTrash
                      size={40}
                      color="red"
                      onClick={(e) =>
                        removeBookmarkAnswer(e, value.answerId._id)
                      }
                    />
                  </div>
                  <div className="ans-detail">
                    <div className="left-col">
                      <div className="votes">
                        <span>{value?.answerId.votes}</span>
                        <span>votes</span>
                      </div>
                    </div>
                    <div className="right-col">
                      <div className="ask-question">
                        <p className="question-detail my-4">
                          {value?.answerId.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RenderAnswers;
