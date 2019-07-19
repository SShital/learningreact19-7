import React from 'react';
import {Row,Col} from 'react-bootstrap'

const QuestionSet = (props) => (

<div className="Questionsdiv">
     <Col md={12} xs={12} className="question-number col-centered">
	Total Questions : <span>{props.totalquestions} </span>
	</Col>
    <div className="col-lg-8 col-xs-12 questionText">Q.{props.id}. {props.question} </div>
</div>

);

export default QuestionSet;

