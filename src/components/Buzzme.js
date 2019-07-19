import React, { Component } from 'react';
import Navigation from './Navigation';
import QuestionSet from './quesDisplay'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormCheck from 'react-bootstrap/FormCheck'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios'
import { isEmpty } from 'lodash';

class Buzzme extends Component {
  constructor(props) {
    super(props);
    this.data = '';
    this.state = {
      qustionData: [],
      Index: 0,
      selectedOption:'',
      Questionnumber:'',
      correctedAnswer:false,
      incorrectanswer:false,
      context:[],
      reinforcement:[],
      checkBtn:true,
      goodJobtext:[],
      sorrytext:[],
      scorebuttonVisible:false

    };
    this.checkAnswerHandler = this.checkAnswerHandler.bind(this);
  }

  componentDidMount() {
    axios.get('/questionData.json') // JSON File Path
      .then(response => {
        const qustionData = response.data.questions
       this.setState({
          qustionData,
        });
       
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  nextQuestionHandler = () => {

  this.data = ''
 if (this.state.Index == this.state.qustionData.length - 1) {
      // this.setState({
      //   scorebuttonVisible:true
      // })
    return;
    }
  this.setState({
      Index: (this.state.Index + 1) % this.state.qustionData.length,
       context:"",
      reinforcement:"",
      goodJobtext:"",
      sorrytext:"",
      checkBtn: !this.state.checkBtn,
      selectedOption: ''
 })
    document.getElementById("create-course-form").reset();
  }

  radioselectHandler = function (answer, ques) {
   console.log("answerrrrrr", answer, ques)
    const selectedOptionssss = answer;
    const Questionnumber = ques;
    this.setState({
      selectedOption: selectedOptionssss,
      Questionnumber: Questionnumber
    });

  }
  
 checkAnswerHandler = function (answeroption, questionopt) {
   console.log('#############', answeroption, typeof(answeroption), this.state.checkBtn);
   if ((answeroption)) {
     console.log('$$$$$$$$$$$$$$$$$', this.state.checkBtn)
      const context = this.state.qustionData[questionopt].context;
   const reinforcement = this.state.qustionData[questionopt].reinforcement
  if (this.state.qustionData[questionopt].Answer == answeroption) {
     this.setState({
       correctedAnswer: true,
       context: context,
       goodJobtext:"Good Job!",
     });
console.log('aaaaaaaaaaaaaa');
   } else {
     this.setState({
       incorrectanswer: true,
       reinforcement: reinforcement,
       sorrytext:"Sorry!"
     });

   };
  //   this.setState({
  //   checkBtn: false
  // })
  console.log('bbbbbbbbbbbb');
  this.setState({
    checkBtn: !this.state.checkBtn 
  })
   }

  
 }
  
 correctanswerHandler = () => (
   <Col md={12} className="text-left martop20 nopadding correctfeedback">
      <span className="text-success"> {this.state.goodJobtext}</span>
     <p>
       {this.state.context ? this.state.context : ''}
     </p>
   </Col>
 )


 incorrectAnswerHandler = () => (
   <Col md={12} className="text-left martop20 nopadding correctfeedback">
      {/* <span className="text-success">Sorry</span>  */}
    <span className="text-success">  {this.state.sorrytext}</span>
     <p>
       {this.state.reinforcement ? this.state.reinforcement : ''}
     </p>
   </Col>
 )

deleteElement=()=>{
  console.log("remove");
}


 render() {
    const item = this.state.qustionData[this.state.Index];
    // let answerstatus = this.state.correctedAnswer
    let data;
   if (typeof (item) == "undefined") {
      return false
    }
    // console.log("item",item.QuestionNo)
    const questionNumber = this.state.Index;
    let optiondata;
 
  if(item.quesType == 'mcq'){
       optiondata = item.options.map((option, i, selected) => {
      return <div className="col-md-12 col-xs-12 radiocheck col-centered"><Form.Check
        key={i}
        type="radio"
        label={option}
        id={"radio" + i}
        name="formHorizontalRadios"
        value={i}
        className="radiocheck"
        onChange={() => this.radioselectHandler(i + 1, questionNumber)} /></div>

    })
    }
  else{
      optiondata = item.options.map((option, i, selected) => {
      return <div className="col-md-12 col-xs-12 radiocheck col-centered"><Form.Check
        key={i}
        type="checkbox"
        label={option}
        id={"radio" + i}
        name="formHorizontalRadios"
        value={i}
        className="radiocheck"
        onChange={() => this.radioselectHandler(i + 1, questionNumber)} /></div>

    })
}

 return (
      <div className="Buzzpage">
        <Navigation />
        <div className="buzzes">
          <span className="buzzbreadcrum">BUZZ ME</span>
        </div>
    
     <div className="content-bg">
      <Container className="buzz-screen">
          <Row className="justify-content-md-center">
          <Col md={6}>
          <QuestionSet id={item.QuestionNo} question={item.Question} totalquestions={this.state.qustionData.length}/>
                  <Form id="create-course-form">
                    <fieldset>
                      <Form.Group as={Row}>
                        <Col md={12} xs={12} className="col-centered">
                       {optiondata}
                        </Col>
                      </Form.Group>
                    </fieldset>

                  </Form>
                  <div className="clearfix"></div>
                   
                   {this.state.checkBtn ?(<Col md={6} xs={12} className="col-centered checkbutton text-center">
                <div className="checkbtn" onClick={this.checkAnswerHandler.bind(this,this.state.selectedOption,this.state.Questionnumber)}>Check</div>
                  </Col>):(<div className="col-md-12 col-xs-12 col-centered nextbutton text-center">
                  <div className="nextbtn" onClick={this.nextQuestionHandler} > NEXT </div> 
                  </div>) }
      
                {this.state.correctedAnswer ? this.correctanswerHandler():undefined}
                {this.state.incorrectanswer ? this.incorrectAnswerHandler():undefined}
                
              <Col md={6} className="text-right nopadding">
                    <Link to="/score">
                        <Button block size="large"className="scorebtn">Score</Button>
                    </Link>
                  </Col></Col>
          </Row>
           </Container>
           </div>
              </div>
       
    
    );
  }
}

export default Buzzme;