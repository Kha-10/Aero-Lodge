import { createContext , useState, useRef} from "react";
import { useTranslation } from "react-i18next";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const {t} = useTranslation()
    const [adult, setAdult] = useState(1);
    const [child, setChild] = useState(0);
    const [selectedOption, setSelectedOption] = useState([]);
    const [room, setRoom] = useState(1);
    const options =[];
    for (let i = 0; i < 18; i++) {
     options.push({
      value : `${i}`,
      label : t('age.label',{count:i})
    }) 
  }
  const [array,setArray] = useState([]);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: 'selection'
    }
  ]);

  
const checkinDate = new Date (date[0].startDate) ;
console.log(checkinDate)

const checkInYear = checkinDate.getFullYear();

const checkInMonth = (checkinDate.getMonth()+1).toString().padStart(2,0);

const checkInDay = checkinDate.getDate().toString().padStart(2,0)

const formattedCheckinDate = `${checkInYear}-${checkInMonth}-${checkInDay}`;

const checkoutDate = new Date (date[0].endDate);

const checkOutYear = checkoutDate.getFullYear();

const checkOutMonth = (checkoutDate.getMonth()+1).toString().padStart(2,0);

const checkOutDay = checkoutDate.getDate().toString().padStart(2,0);

const formattedCheckoutDate = `${checkOutYear}-${checkOutMonth}-${checkOutDay}`;

const [currency, setCurrency] = useState("USD");

const [updatedCurrency, setUpdatedCurrency] = useState([
  {fullName : "US Dollar",shortName : "USD"},
  {fullName : "Euro",shortName : " €"},
  {fullName : "Baht",shortName : "฿"},
  {fullName : "Yen",shortName : "¥"},
]);   

const person = adult+child;

const [latitude,setLatitude] = useState(null);
const [longitude,setLongitude] = useState(null);

const [location, setLocation] = useState('');

const [imageurl,setImageurl] = useState('');

const [history, setHistory] = useState({
  recent :[]
});

const toggle = useRef(false);


    return(
        <AppContext.Provider value={{adult,setAdult,child,setChild,selectedOption,setSelectedOption,
        room,setRoom,options,array,setArray,address,setAddress,
        formattedCheckinDate,formattedCheckoutDate,date,setDate,currency,setCurrency,updatedCurrency,person,latitude,setLatitude,longitude,setLongitude,location,setLocation,imageurl,setImageurl,history,setHistory,toggle}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext,AppContextProvider}