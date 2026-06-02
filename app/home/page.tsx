import Image from "next/image";
import Hero from "@/components/Hero";
import { Content } from "@/components/Content";

export default function Home() {
  
  return (
    <main>
      <Hero isLoggedIn={true} />
      <Content />
    </main>
  );
}
