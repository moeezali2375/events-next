import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";
import { getAllEvents } from "@/helpers/api-util";

export default function AllEventsPage(props) {
  const arr = props.events;
  return (
    <div>
      <h1>All Events Page</h1>
      <EventSearch />
      <EventList list={arr} />
    </div>
  );
}

export const getStaticProps = async () => {
  const arr = await getAllEvents();
  return {
    props: { events: arr },
  };
};
