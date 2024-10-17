import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/helpers/api-util";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

function Home(props) {
  const arr = props.fevents;
  return (
    <div>
      <h1>Home Page</h1>
      <EventList list={arr} />
    </div>
  );
}

export async function getStaticProps() {
  console.log("Home Page Rendering");
  const arr = await getFeaturedEvents();
  return {
    props: {
      fevents: arr,
    },
  };
}
export default Home;
