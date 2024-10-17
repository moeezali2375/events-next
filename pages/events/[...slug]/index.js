import EventList from "@/components/events/EventList";
import { getFilteredEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FilteredEventsPage(props) {
  const [events, setEvents] = useState(props.events);
  const router = useRouter();

  useEffect(() => {
    const { slug } = router.query;

    if (slug && slug.length === 2) {
      const year = Number(slug[0]);
      const month = Number(slug[1]);

      if (
        !isNaN(year) &&
        !isNaN(month) &&
        year >= 1 &&
        month >= 1 &&
        month <= 12
      ) {
        async function fetchEvents() {
          const fetchedEvents = await getFilteredEvents({ year, month });
          setEvents(fetchedEvents);
        }
        fetchEvents();
      } else {
        router.push("/no-data");
      }
    }
  }, [router.query.slug, router]);

  return (
    <div>
      <h1>Filtered Events Page</h1>
      <EventList list={events} />
    </div>
  );
}

export async function getServerSideProps(context) {
  if (context.query.length < 2) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  const year = Number(context.query.slug[0]);
  const month = Number(context.query.slug[1]);

  if (isNaN(year) || isNaN(month) || year < 1 || month < 1 || month > 12) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  const filteredEvents = await getFilteredEvents({ year, month });
  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  return {
    props: {
      events: filteredEvents,
    },
  };
}
