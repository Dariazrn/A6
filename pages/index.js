/*********************************************************************************
*  WEB422 – Assignment 5
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Daria Zyrianova Student ID: 121782205 Date: November 18, 2022
*
*
********************************************************************************/ 


import { Image, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <Row>
        <Col>
          <Image
            alt='Image'
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
            rounded
            fluid
          />
        </Col>
      </Row>
    
      <Row>
        <Col lg={6}>
          <p>The Metropolitan Museum of Art of New York City&quot; colloquially &apos;the Met&apos; &quot; is the largest art museum in the Americas. Its permanent collection contains over two million works &quot; divided among 17 curatorial departments.  The main building at 1000 Fifth Avenue&quot; along the Museum Mile on the eastern edge of Central Park on Manhattan&apos;s Upper East Side&quot; is by area one of the world&apos;s largest art museums. A much smaller second location&quot; The Cloisters at Fort Tryon Park in Upper Manhattan&quot; contains an extensive collection of art&quot; architecture&quot; and artifacts from medieval Europe.</p>
          <p>The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum&apos;s permanent collection consists of works of art from classical antiquity and ancient Egypt&quot; paintings&quot; and sculptures from nearly all the European masters&quot; and an extensive collection of American and modern art. The Met maintains extensive holdings of African&quot; Asian&quot; Oceanian&quot; Byzantine&quot; and Islamic art. The museum is home to encyclopedic collections of musical instruments&quot; costumes&quot; and accessories&quot; as well as antique weapons and armor from around the world. Several notable interiors&quot; ranging from 1st-century Rome through modern American design&quot; are installed in its galleries.</p>
        </Col>
        <Col md={6}>
          <p>The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic in New York City, the museum attracted 1,958,000 visitors, ranking fourth on the list of most-visited art museums in the world.</p>
         
          <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art</a>
        </Col>
      </Row>
    </>
  )
}