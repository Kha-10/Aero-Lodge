export const addAdultsHandler = (adult,setAdult) => {
    if (adult < 30) {
      setAdult( prevAdult => prevAdult +1);
     
    }
  };

export const removeAdultsHandler = (adult,setAdult) => {
    if (adult > 1) {
      setAdult ( prevAdult => prevAdult - 1);
     }
  };