"use client"
import { Container, Row, Col, Button } from "react-bootstrap";
import { GetRandomItem } from "./utils/random";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()
  const bg = ["home_background_1","home_background_2"]
  var random_bg = GetRandomItem(bg)

  const handleClick = (event) => {
    MoveToListGame()
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      MoveToListGame()
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  function MoveToListGame(){
    router.push('/list')
  }
  return (
    <>
      <div className={`wrapper ${random_bg}`} onClick={handleClick}>
        <Container fluid>
          <Row>
            <Col>
              <p className="title animate__animated  animate__pulse animate__infinite	">
                Random Fifty
              </p>
              <p className="sub_tit">A collection of games</p>
            </Col>
          </Row>
        </Container>
        <p className="press_any animate__animated  animate__flash animate__slow animate__infinite">Press Any Button!</p>
        <p className="copy_right">
          © Minh Vu Tran Quoc 2025
        </p>
      </div>
    </>
  );
}
