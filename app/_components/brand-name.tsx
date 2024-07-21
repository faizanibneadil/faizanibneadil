import { Lobster } from "next/font/google";
import Link from "next/link";

const lora = Lobster({
  subsets: ["latin"],
  weight: ["400"],
});
export default function BrandName() {
  return (
    <h1 className={lora.className}>
      <Link href="/" className="text-2xl">
        Faizan Adil
      </Link>
    </h1>
  );
}
