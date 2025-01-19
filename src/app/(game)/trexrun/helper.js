export function getGameWidth() {
  if (typeof window !== 'undefined') {
    return Math.min(window.innerWidth * 0.9, 1000);
  }
  return 1000; // Fallback for server-side rendering
}

export function getGameHeight() {
  return getGameWidth() * 0.25;
}

export const GROUND_HEIGHT = 20;
export const DINO_WIDTH = (width) => width * 0.067; 
export const DINO_HEIGHT = (height) => height * 0.4; 
export const CACTUS_WIDTH = (width) => width * 0.033; 
export const CACTUS_HEIGHT = (height) => height * 0.2; 
export const JUMP_FORCE = -15;
export const GRAVITY = 0.6;

export function detectCollision(
  dinoX,
  dinoY,
  cactusX,
  cactusY,
  gameWidth,
  gameHeight
) {
  const dw = DINO_WIDTH(gameWidth);
  const dh = DINO_HEIGHT(gameHeight);
  const cw = CACTUS_WIDTH(gameWidth);
  const ch = CACTUS_HEIGHT(gameHeight);

  return (
    dinoX < cactusX + cw &&
    dinoX + dw > cactusX &&
    dinoY < cactusY + ch &&
    dinoY + dh > cactusY
  );
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
