export const addRoom = (room,setRoom) => {
    if (room < 30 ) {
      setRoom(prevRoom => prevRoom+1);
    }
  }

export const removeRoom = (room,setRoom) => {
    if (room > 1 ) {
      setRoom(prevRoom => prevRoom-1 );
    }
  }