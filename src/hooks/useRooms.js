import useApp from "./useApp";

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