import { IconEditCircle, IconTrash } from "@tabler/icons";
import { useState } from "react";

import EditAnswer from "../../../layouts/Modals/EditAnswer";
import { getToken } from "../../../store/localStorage";

import answerInstance from "../../../axios/answerInstance";

const AnswerList = ({ answer, setReload }) => {
  const [open, setOpen] = useState(false);
  const token = getToken();
  const handleAnswerDelete = async (e) => {
    e.preventDefault();
    try {
      const deleteAnswerResponse = await answerInstance.delete(
        "/delete-answer/" + answer._id,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      console.log(deleteAnswerResponse);
      setReload((prev) => !prev);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <EditAnswer
        answer={answer}
        showAsk={open}
        setShowAsk={setOpen}
        setReload={setReload}
      />
      <div className="question-content-container bg-white shadow w-100 my-4 py-4 px-5">
        <div
          className="answer-btns d-flex w-100 justify-content-end"
          style={{ margin: "1rem 0"}}
        >
          <IconTrash size={35} color="red" style={{marginRight:'2rem'}} onClick={handleAnswerDelete} />

          <IconEditCircle
            size={35}
            color="#F67328"
            onClick={(e) => setOpen(true)}
          />
        </div>
        <div className="ans-detail">
          <div className="left-col">
            <div className="votes">
              <span>{answer?.votes}</span>
              <span>votes</span>
            </div>
          </div>
          <div className="right-col">
            <div className="ask-question">
              <p className="question-detail my-4">{answer?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnswerList;
