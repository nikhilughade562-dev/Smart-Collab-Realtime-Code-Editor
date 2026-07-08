import { createContext,useContext,useState } from "react";

const AppContext = createContext();
export const AppContextProvider = ({children}) => {
  const [loadCode,setloadCode]=useState("")
  const [username, setaUsername] = useState(
    localStorage.getItem("username") || ""
);
  const[output,setOutput]=useState("")
  const[clientsList,setclientsList]=useState([]);

  const value = {
    loadCode,setloadCode,clientsList,setclientsList,username,setaUsername,output,setOutput
  };
  

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export const useAppContext=()=>useContext(AppContext);