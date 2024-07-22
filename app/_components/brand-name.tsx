import { Sacramento } from "next/font/google";
import Link from "next/link";

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
});
export default function BrandName() {
  return (
    <h1 className={sacramento.className}>
      <Link href="/" className="text-3xl font-thin">
        Faizan Adil
      </Link>
    </h1>
  );
}
