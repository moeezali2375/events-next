import Event from "./Event";
import styles from './EventList.module.css';

export default function EventList(props) {
   
    return (
      
        <div className={styles.list}>
          <ul>
          {
            props.list.map(event=>{
                return <Event id={event.id}key={event.id} t={event.title} i={event.image} d={event.date} loc={event.location}/>
            })
          }
          </ul>
        </div>
      
    );
  }