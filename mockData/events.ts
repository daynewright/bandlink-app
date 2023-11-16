import { BandEvent } from "@/types/events";

const getRandomNumber = () => Math.floor(Math.random() * 800) + 1;

const events = [
  {
    id: 1,
    imageUri: `https://picsum.photos/id/${getRandomNumber()}/200/300`,
    title: "Marching Band Practice",
    description: "Regular practice session for the marching band.",
    location: {
      name: "Football Field",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    startTime: "2023-12-01T18:00:00.000Z",
    endTime: "2023-12-01T20:00:00.000Z",
    eventType: "Practice",
    organizer: "Marching Band Director",
    userId: 123,
  },
  {
    id: 2,
    imageUri: `https://picsum.photos/id/${getRandomNumber()}/200/300`,
    title: "Concert in the Park",
    description: "Annual marching band concert in the city park.",
    location: {
      name: "City Park Amphitheater",
      latitude: 37.7694,
      longitude: -122.4862,
    },
    startTime: "2023-12-10T15:00:00.000Z",
    endTime: "2023-12-10T17:00:00.000Z",
    eventType: "Concert",
    organizerGroup: "Marching Band Association",
    userId: 456,
  },
  {
    id: 3,
    imageUri: `https://picsum.photos/id/${getRandomNumber()}/200/300`,
    title: "Marching Band Parade",
    description: "Participating in the city's holiday parade.",
    location: {
      name: "City Streets",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    startTime: "2023-12-15T12:00:00.000Z",
    endTime: "2023-12-15T14:00:00.000Z",
    eventType: "Parade",
    organizerGroup: "City Events Committee",
    userId: 789,
  },
  {
    id: 4,
    imageUri: `https://picsum.photos/id/${getRandomNumber()}/200/300`,
    title: "Homecoming Game Performance",
    description:
      "Marching band halftime show during the homecoming football game.",
    location: {
      name: "School Stadium",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    startTime: "2023-11-28T19:00:00.000Z",
    endTime: "2023-11-28T21:00:00.000Z",
    eventType: "Performance",
    organizerGroup: "School Athletics Department",
    userId: 101,
  },
  {
    id: 5,
    imageUri: `https://picsum.photos/id/${getRandomNumber()}/200/300`,
    title: "Band Banquet",
    description:
      "Annual banquet to celebrate the marching band's achievements.",
    location: {
      name: "Community Center",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    startTime: "2024-01-05T18:30:00.000Z",
    endTime: "2024-01-05T21:30:00.000Z",
    eventType: "Reception",
    organizerGroup: "Marching Band Boosters",
    userId: 202,
  },
] as BandEvent[];

export default events;
