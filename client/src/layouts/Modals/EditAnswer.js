import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";

import answerInstance from "../../axios/answerInstance";

//redux
import { getToken } from "../../store/localStorage";

const EditAnswer = ({ showAsk, setShowAsk, setReload, answer }) => {
  const token = getToken();
  const { questionId } = useParams();

  const [answerDetail, setAnswerDetail] = useState({
    description: "",
  });

  useEffect(() => {
    setAnswerDetail(answer.description);
  }, [answer]);

  const handleDetailChange = (e) => {
    setAnswerDetail({ ...answerDetail, [e.target.name]: e.target.value });
    console.log(answerDetail.description)
  };

  const postAnswer = async (e) => {
    e.preventDefault();
    try {
      const postAnswerResponse = await answerInstance.post(
        "/edit-answer",
        {
          description: answerDetail.description,
          questionId: questionId,
          answerId: answer._id,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      console.log(postAnswerResponse);
      setReload((prev) => !prev);
      setShowAsk(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal show={showAsk} onHide={() => setShowAsk(false)}>
      <Modal.Header closeButton>
        <Modal.Title color="#F67328">Edit Answer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Detail : </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              defaultValue={answer.description}
              onChange={handleDetailChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={() => setShowAsk(false)}>
          Cancel
        </button>
        <button className="btn ask px-4" onClick={postAnswer}>
          Edit
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAnswer;
