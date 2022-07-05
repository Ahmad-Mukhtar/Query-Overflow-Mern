import { useState } from "react";
import { IconEditCircle, IconTrash } from "@tabler/icons";
import { Link } from "react-router-dom";

import EditQuestion from "../../../layouts/Modals/EditQuestion";

import questionInstance from "../../../axios/questionInstance";
import { getToken } from "../../../store/localStorage";

const QuestionList = ({ question, setReload, showBtns }) => {
  const token = getToken();

  const [open, setOpen] = useState(false);

  const handleQuestionDelete = async (e) => {
    e.preventDefault();
    try {
      const deleteQuestionResponse = await questionInstance.delete(
        "/delete-question/" + question._id,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      console.log(deleteQuestionResponse);
      setReload((prev) => !prev);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <EditQuestion
        question={question}
        setReload={setReload}
        showAsk={open}
        setShowAsk={setOpen}
      />
      <div className="question-content-container bg-white shadow w-100 my-4 py-4 px-3">
        {showBtns && (
          <div
            className="answer-btns d-flex w-100 justify-content-end"
            style={{ margin: "1rem 0" }}
          >
            <IconTrash
              size={35}
              color="red"
              style={{ marginRight: "2rem" }}
              onClick={handleQuestionDelete}
            />

            <IconEditCircle
              size={35}
              color="#F67328"
              onClick={(e) => setOpen(true)}
              sx={{ marginLeft: "1rem" }}
            />
          </div>
        )}
        <Link
          to={`/main/question-detail/${question._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="d-flex">
            <div className="left-col mx-3">
              <div className="votes">
                <span>{question?.votes}</span>
                <span>votes</span>
              </div>
              <div className="votes my-2">
                <span>{question.totalAnswers}</span>
                <span>answers</span>
              </div>
            </div>
            <div className="right-col mx-3">
              <div className="ask-question">
                <h5 className="question-heading">{question?.title}</h5>
                <p className="question-detail my-4">{question?.description}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default QuestionList;
