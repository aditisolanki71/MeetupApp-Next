import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { connectToDatabase } from "../helper/db";

function HomePage(props) {
  return (
    <Fragment>
        <MeetupList meetups={props.meetups}/>
    </Fragment>
  )
}
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await connectToDatabase();
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1
  }; 
}
export default HomePage;
