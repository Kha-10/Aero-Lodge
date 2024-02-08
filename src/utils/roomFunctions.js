export const addRoom = (room,setRoom) => {
    if (room < 30 ) {
      setRoom(prevRoom => prevRoom+1);
    }
  }