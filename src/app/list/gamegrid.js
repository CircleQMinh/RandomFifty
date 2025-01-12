import Icon from "./icon"
import styles from './styles.module.css'
 

const gameIcons = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    src: `/images/placeholder.svg?height=96&width=96`,
    alt: `Game Icon ${i + 1}`
  }))

  gameIcons[0] = {
    id: 1,
    src: `/images/icons/card01.jpg?height=96&width=96`,
    alt: `Game Icon 1`
  }
  
  export function GameGrid() {
    return (
      <div className={`container py-4 ${styles.fullscreen}`}>
        <h1 className="display-4 text-center mb-4 text-neon-pink">Random Fifty Games</h1>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-2">
          {gameIcons.map((icon) => (
            <div key={icon.id} className="col">
              <Icon src={icon.src} alt={icon.alt} />
            </div>
          ))}
        </div>
      </div>
    )
  }