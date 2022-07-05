import { useState, useEffect } from "react";

//react-bootstrap
import { Spinner } from "react-bootstrap";

import AnswerList from "../AnswerList/AnswerList";
import EditQuestion from "../../../layouts/Modals/EditQuestion"

import answerInstance from "../../../axios/answerInstance";
import { getToken } from "../../../store/localStorage";


const RenderAnswers = () => {
  const token = getToken();
  const [reload, setReload] = useState(false);
  const [answerData, setAnswerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAnswerData = async () => {
      setLoading(true);
      try {
        const answerResponse = await answerInstance.get("/get-user-answers", {
          headers: {
            "x-access-token": token,
          },
        });

        console.log(answerResponse.data.data);
        setAnswerData(answerResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    getAnswerData();
  }, [token, reload]);

  return (
    <div className="question-container my-4 w-100 d-flex align-items-center justify-content-center">
      <div className="spinner-container">
        {loading && <Spinner animation="border" variant="warning"></Spinner>}
      </div>

      <div className="question-lists">
        <div className="question-header">
          <div className="current-question  d-flex d-flex align-items-center justify-content-between">
            <h5>User's Answers</h5>
          </div>
        </div>
        <div className="question-data my-5">
          {answerData &&
            answerData.map((value) => {
              return (
                <AnswerList
                  answer={value}
                  showbtns={true}
                  setReload={setReload}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RenderAnswers;
