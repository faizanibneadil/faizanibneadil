import Image from "next/image";

export function Branding(props:{imageSrc:string}){
    return <img src={props?.imageSrc} alt="Open Shelf Logo" width='100%' />
}