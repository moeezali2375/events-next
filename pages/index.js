import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/helpers/api-util";

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
  console.log("Home Page Rendering using SSG");
  const arr = await getFeaturedEvents();
  return {
    props: {
      fevents: arr,
    },
    revalidate: 30,
  };
}
export default Home;
