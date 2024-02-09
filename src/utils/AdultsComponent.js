import useApp from "../hooks/useApp";

const AdultsComponent = () => {
  // Call the useApp hook inside the functional component
  const { adult, setAdult } = useApp();

  console.log(adult)

  // Define functions that use the child state and its setter
  const addAdultsHandler = () => {
    if (adult < 30) {
      setAdult(prevAdult => prevAdult + 1);
    }
  };

  const removeAdultsHandler = () => {
    if (adult > 1) {
      setAdult(prevAdult => prevAdult - 1);
    }
  };

  // Export the functions if needed
  return {
    addAdultsHandler,
    removeAdultsHandler
  };
};

export default AdultsComponent;
