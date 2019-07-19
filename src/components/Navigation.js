import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import  './Navbar.css';

class Navigation extends React.Component {
  render() {
return (
<Navbar collapseOnSelect expand="lg" variant="dark">
  <Navbar.Brand href="/dashboard">
   <i className="fa fa-home" aria-hidden="true"></i>
</Navbar.Brand>
 
  <Navbar>

<Nav className="ml-auto">
   <Image src="/images/usericon.png" style= {{maxWidth:'1.75rem'}} alt=""  className="img-fluid rounded-circle shadow userimg" />
  </Nav>
 </Navbar>
</Navbar>
    )
  }
}
export default Navigation;



