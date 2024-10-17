import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import { getEventById } from "@/helpers/api-util";
import { getAllEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";

export default function DetailedEventPage(props) {
  const event = props.event;
  if (!event) {
    return <p>Event doesnt exists</p>;
  }
  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>Event Detail Page</h1>
      <EventSummary title={event.title} />
      <EventLogistics
        t={event.title}
        d={event.date}
        ad={event.location}
        i={event.image}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </div>
  );
}

export async function getStaticProps(context) {
  console.log(context);
  const id = context.params.id;
  const event = await getEventById(id);
  if (!event) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  return {
    props: { event: event },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const ids = events.map((e) => e.id);
  const paths = ids.map((i) => ({
    params: {
      id: i,
    },
  }));
  return {
    paths: paths,
    fallback: true,
  };
}
