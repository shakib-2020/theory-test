import React from "react";
import { Col, Row } from "react-bootstrap";

function ResultDetailsOptions() {
  return (
    <>
      <div className="result_options">
        <Row>
          <Col>
            <label htmlFor="option1">
              <input id="option1" type="checkbox" value="1" name="option" />
              The driver intends to turn left.
            </label>
          </Col>
          <Col>
            <label htmlFor="option2">
              <input id="option2" type="checkbox" value="2" name="option" />
              The driver intends to move straight ahead.
            </label>
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="option3">
              <input id="option3" type="checkbox" value="3" name="option" />
              The driver intends to move out or turn right.
            </label>
          </Col>
          <Col>
            <label htmlFor="option4">
              <input id="option4" type="checkbox" value="4" name="option" />
              The driver intends to slow down or stop.
            </label>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ResultDetailsOptions;
