import { useState, useEffect, useCallback } from 'react';
import { getGameWidth, getGameHeight, GROUND_HEIGHT, DINO_HEIGHT, CACTUS_WIDTH, CACTUS_HEIGHT, JUMP_FORCE, GRAVITY, detectCollision,loadImage } from './helper';
import { GetRandomNumber } from '@/app/utils/random';

export function useGameLogic() {
  const [gameWidth, setGameWidth] = useState(getGameWidth());
  const [gameHeight, setGameHeight] = useState(getGameHeight());
  const [dinoY, setDinoY] = useState(gameHeight - GROUND_HEIGHT - DINO_HEIGHT(gameHeight));
  const [cactusX, setCactusX] = useState(gameWidth);
  const [isJumping, setIsJumping] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [currentCactusImage, setCurrentCactusImage] = useState(null);
  const [cactusImage, setCactusImage] = useState(null);
  const [cactusImage1, setCactusImage1] = useState(null);
  const [cactusImage2, setCactusImage2] = useState(null);

  const [currentDinoImage, setCurrentDinoImage] = useState(null);
  const [dinoImage, setDinoImage] = useState(null);
  const [dinoImage1, setDinoImage1] = useState(null);
  
  const [animationFrame, setAnimationFrame] = useState(0);
 

  const jump = useCallback(() => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setVelocity(JUMP_FORCE);
    }
  }, [isJumping, gameOver]);

  const resetGame = useCallback(() => {
    setDinoY(gameHeight - GROUND_HEIGHT - DINO_HEIGHT(gameHeight));
    setCactusX(gameWidth);
    setIsJumping(false);
    setVelocity(0);
    setScore(0);
    setGameOver(false);
  }, [gameWidth, gameHeight]);

  useEffect(() => {
    const handleResize = () => {
      setGameWidth(getGameWidth());
      setGameHeight(getGameHeight());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        if (gameOver) {
          resetGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump, gameOver, resetGame]);


  useEffect(() => {

    loadImage("/images/trexrun/h1.png?height=80&width=40")
      .then((img) => setCactusImage(img))
      .catch((err) => console.error("Failed to load cactus image:", err));
    loadImage("/images/trexrun/h2.png?height=80&width=40")
      .then((img) => setCactusImage1(img))
      .catch((err) => console.error("Failed to load cactus image:", err));
    loadImage("/images/trexrun/h3.png?height=80&width=40")
      .then((img) => setCactusImage2(img))
      .catch((err) => console.error("Failed to load cactus image:", err));

    loadImage("/images/trexrun/d1_2.png?height=80&width=40")
      .then((img) => setDinoImage(img))
      .catch((err) => console.error("Failed to load dino image:", err));
    loadImage("/images/trexrun/d1_1.png?height=80&width=40")
      .then((img) => setDinoImage1(img))
      .catch((err) => console.error("Failed to load dino image:", err));

  }, []);

  useEffect(() => {
    if (gameOver) return;
    const gameLoop = setInterval(() => {
      setScore((prevScore) => prevScore + 1);
      setAnimationFrame((prevFrame) => (prevFrame + 1) % 10);
      setCurrentDinoImage(animationFrame < 5 ? dinoImage : dinoImage1);
      
      if(cactusX <= -CACTUS_WIDTH(gameWidth)){
         var r = GetRandomNumber(1,3)
         setCurrentCactusImage(r % 3 == 0 ? cactusImage : r % 2 == 0 ? cactusImage1 : cactusImage2)
      }


      // Update dino position
      if (isJumping) {
        setDinoY((prevY) => {
          const newY = prevY + velocity;
          setVelocity((prevVelocity) => prevVelocity + GRAVITY);

          if (newY >= gameHeight - GROUND_HEIGHT - DINO_HEIGHT(gameHeight)) {
            setIsJumping(false);
            setVelocity(0);
            return gameHeight - GROUND_HEIGHT - DINO_HEIGHT(gameHeight);
          }
          return newY;
        });
      }

      // Update cactus position
      setCactusX((prevX) => {
        if (prevX <= -CACTUS_WIDTH(gameWidth)) {
          return gameWidth;
        }
        return prevX - (gameWidth / 120); // Adjust speed based on game width
      });

      // Check for collision
      if (
        detectCollision(
          gameWidth / 5,
          dinoY,
          cactusX,
          gameHeight - GROUND_HEIGHT - CACTUS_HEIGHT(gameHeight),
          gameWidth,
          gameHeight
        )
      ) {
        setGameOver(true);
      }
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [dinoY, cactusX, isJumping, velocity, gameOver, gameWidth, gameHeight, cactusImage, dinoImage, animationFrame, dinoImage1, cactusImage1, cactusImage2]);

  return { gameWidth, gameHeight, dinoY, cactusX, score, gameOver,currentCactusImage,currentDinoImage, jump, resetGame };
}

