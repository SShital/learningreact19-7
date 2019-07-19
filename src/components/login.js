import React from "react";
import { Button, Container, Row, Col, FormGroup, FormControl} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import "./login.css";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = event => {
        // event.preventDefault();
        this.props.history.push('/dashboard');
    }

  handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <div className="Login">
                <Container>
                    <Row>
                    <Col xs={12} lg={12}>
                        <div className="loginform">
                               <h3 className="loginhead">Log in</h3>
                              <form onSubmit={this.handleSubmit}>
                                  <FormGroup controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <FormControl
                                            autoFocus
                                            type="email"
                                            value={this.state.email}
                                            placeholder="Email"
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <FormControl
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </FormGroup>
                                    <Button
                                        block
                                        size="large"
                                        disabled={!this.validateForm()}
                                        type="submit"
                                        className="login-btn"
                                    >
                                        Login
                                  </Button>

                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

export default Login;
