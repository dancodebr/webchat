import { ContextTsx } from "@/Context/Context"
import { useContext } from "react"

export default function Users({id, name}: any) {


  const {setWidth, setChat, setDataUser} = useContext(ContextTsx)


  const goChat = () => {
    
    setDataUser({id, name})
    setWidth("0%")
    setChat(true)
    

  }

  return (
    <div className="flex items-center" onClick={goChat}>
           <img src="profile.png" width={100} alt="User"/>
           <h1>{name}</h1>
    </div>
  )
}
