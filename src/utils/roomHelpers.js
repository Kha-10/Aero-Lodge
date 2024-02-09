import useApp from "../hooks/useApp";

const roomHandlers = () => {

  const { room,setRoom } = useApp();

  const addRoomHandler = () => {
    if (room < 30 ) {
      setRoom(prevRoom => prevRoom+1);
    }
  }

  const removeRoomHandler = () => {
    if (room > 1 ) {
      setRoom(prevRoom => prevRoom-1 );
    }
  }

  return {
    addRoomHandler,
    removeRoomHandler
  };
};

export default roomHandlers;

// export const addRoom = (room,setRoom) => {
//     if (room < 30 ) {
//       setRoom(prevRoom => prevRoom+1);
//     }
//   }

// export const removeRoom = (room,setRoom) => {
//     if (room > 1 ) {
//       setRoom(prevRoom => prevRoom-1 );
//     }
//   }