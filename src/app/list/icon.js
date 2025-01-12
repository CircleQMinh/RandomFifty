import Image from "next/image";

export default function Icon(props) {
  var src = props.src;
  var alt = props.alt;
  return (
    <div className="position-relative bg-dark rounded overflow-hidden shadow-sm hover-shadow-lg transition">
      <Image src={src} alt={alt} width={100} height={100} className="pixelated" />
      <div className="row display-flex justify-content-center">
        <button className="btn btn-success">Play</button>
      </div>
    </div>
  );
}
