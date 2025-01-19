'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useGameLogic } from './game';
import { GROUND_HEIGHT, DINO_WIDTH, DINO_HEIGHT, CACTUS_WIDTH, CACTUS_HEIGHT } from './helper';

export default function TRexGame() {
  const [canvasRef, setCanvasRef] = useState(null);
  const { gameWidth, gameHeight, dinoY, cactusX, score, gameOver,currentCactusImage,currentDinoImage, jump, resetGame } = useGameLogic();

  const canvasCallback = useCallback((canvas) => {
    if (canvas) {
      setCanvasRef(canvas);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef) return;

    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, gameWidth, gameHeight);

    // Draw ground
    ctx.fillStyle = '#000';
    ctx.fillRect(0, gameHeight - GROUND_HEIGHT, gameWidth, GROUND_HEIGHT);

    // Draw dino
    ctx.fillStyle = '#333';
    ctx.fillRect(gameWidth / 5, dinoY, DINO_WIDTH(gameWidth), DINO_HEIGHT(gameHeight));

    if (currentDinoImage) {
        ctx.drawImage(
            currentDinoImage,
          gameWidth / 5,
          dinoY,
          DINO_WIDTH(gameWidth),
          DINO_HEIGHT(gameHeight)
        );
      } else {
        // Fallback to rectangle if image is not loaded
        ctx.fillStyle = '#333';
        ctx.fillRect(gameWidth / 5, dinoY, DINO_WIDTH(gameWidth), DINO_HEIGHT(gameHeight));
      }

    // Draw cactus
    if (currentCactusImage) {
        ctx.drawImage(
          currentCactusImage,
          cactusX,
          gameHeight - GROUND_HEIGHT - CACTUS_HEIGHT(gameHeight),
          CACTUS_WIDTH(gameWidth),
          CACTUS_HEIGHT(gameHeight)
        );
      } else {
        // Fallback to rectangle if image is not loaded
        ctx.fillStyle = '#0a0';
        ctx.fillRect(
          cactusX,
          gameHeight - GROUND_HEIGHT - CACTUS_HEIGHT(gameHeight),
          CACTUS_WIDTH(gameWidth),
          CACTUS_HEIGHT(gameHeight)
        );
      }


    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = `${gameHeight * 0.13}px Arial`;
    ctx.fillText(`Score: ${score}`, 10, gameHeight * 0.2);

    // Draw game over message
    if (gameOver) {
      ctx.fillStyle = '#f00';
      ctx.font = `${gameHeight * 0.27}px Arial`;
      ctx.fillText('Game Over', gameWidth / 2 - gameWidth * 0.17, gameHeight / 2);
      ctx.font = `${gameHeight * 0.13}px Arial`;
      ctx.fillText('Press Space to Restart', gameWidth / 2 - gameWidth * 0.17, gameHeight / 2 + gameHeight * 0.27);
    }
  }, [canvasRef, gameWidth, gameHeight, dinoY, cactusX, score, gameOver, currentDinoImage, currentCactusImage]);

  return (
    <>
        <div className='container'>
            <div className='row'>
                <div className='col'>
                <canvas
                    ref={canvasCallback}
                    width={gameWidth}
                    height={gameHeight}
                    className="border border-gray-300"
                    onClick={gameOver ? resetGame : jump}
                />
                    <p className="mt-4 text-lg">Press Space to Jump</p>
                </div>
            </div>
        </div>
    </>

  );
}

