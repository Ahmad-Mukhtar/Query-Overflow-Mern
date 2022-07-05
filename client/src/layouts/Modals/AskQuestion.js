import { useState } from "react";

import { Modal, Form } from "react-bootstrap";

import questionInstance from "../../axios/questionInstance";

//redux
import { getToken } from "../../store/localStorage";

const AskQuestion = ({ showAsk, setShowAsk, setReload }) => {
  const token = getToken();

  const [questionDetail, setQuestionDetail] = useState({
    title: "",
    description: "",
  });

  const handleDetailChange = (e) => {
    setQuestionDetail({ ...questionDetail, [e.target.name]: e.target.value });
    console.log(questionDetail);
  };

  const postQuestion = async (e) => {
    e.preventDefault();
    try {
      const postQuestionResponse = await questionInstance.post(
        "/create-question",
        {
          title: questionDetail.title,
          description: questionDetail.description,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      console.log(postQuestionResponse);
      setReload((prev) => !prev);
      setShowAsk(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal show={showAsk} onHide={() => setShowAsk(false)}>
      <Modal.Header closeButton>
        <Modal.Title color="#F67328">Ask Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Question : </Form.Label>
            <Form.Control
              type="text"
              placeholder="How can I "
              name="title"
              onChange={handleDetailChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Detail</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              onChange={handleDetailChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={() => setShowAsk(false)}>
          Cancel
        </button>
        <button className="btn ask px-4" onClick={postQuestion}>
          Ask
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AskQuestion;
