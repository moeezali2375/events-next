import axios from "axios";
export async function getAllEvents() {
  // return fetch('https://aslam-aa561-default-rtdb.firebaseio.com/events.json').then(res=>res.json()).then(data=>{
  //     const events=[]
  //     for(const key in data)
  //     {
  //         events.push({
  //             id:key,
  //             ...data[key]
  //         })
  //     }
  //     return events
  // })
  const res = await axios.get("http://localhost:4000/events");
  return res.data.events;
}

export async function getFeaturedEvents() {
  const arr = await getAllEvents();
  return arr.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const arr = await getAllEvents();
  return arr.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const arr = await getAllEvents();
  let filteredEvents = arr.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
