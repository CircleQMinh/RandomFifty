"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation'

export default function Icon(props) {
  const router = useRouter()
  var src = props.src;
  var alt = props.alt;
  var id = `/${props.id}`;
  return (
    <div className="position-relative bg-dark rounded overflow-hidden shadow-sm hover-shadow-lg transition">
      <Image src={src} alt={alt} width={100} height={100} className="pixelated" />
      <div className="row display-flex justify-content-center">
        <button className="btn btn-success" onClick={() => router.push(id)} >Play</button>
      </div>
    </div>
  );
}
