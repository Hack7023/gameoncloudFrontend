import './Shapes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../Footer.js";
function Shapes() {
  return (
    <div className="Shapes">
      <header><h1>CHANGING SHAPES</h1></header>
      <div className="subhheader"><h5>Hover over any shape and see it changing.</h5></div>
      <div className="change">
      {/* <Container>
        <Row>     
      <Col> */}
      <div className="circle shape">Hover over here</div>
       {/* </Col>
       <Col> */}
       <div className="triangle shape">Hover over here</div>
        {/* </Col>
        <Col> */}
        <div className="square shape">Hover over here</div>
         {/* </Col>
         <Col> */}
        <div className="rectangle shape">Hover over here</div>
         {/* </Col>
        
      </Row>
      </Container> */}
      </div>
      <Footer />
    </div>
  );
}

export default Shapes;