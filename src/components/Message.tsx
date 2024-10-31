import {Divider} from "@nextui-org/divider";
import { useContext, useEffect, useState } from "react";
import { ContextTsx } from "@/Context/Context";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Message({msg, userReceive, userFrom, from, receive} :any) {

  const token: any = Cookies.get('token');
  const decoded: any = token == undefined ? null : jwtDecode(token);        //decodifica o token e verifica se esta logado

  const {setChat, setDataUser} = useContext(ContextTsx)
  const [showCheck, setShowcheck] = useState(false)

  const id = from == decoded?.id ? receive : from
  const name = userReceive == decoded?.name ? userFrom : userReceive

  useEffect(()=> {

    setShowcheck(decoded.id == from ? true : false)

  },[])
  
  const goChat = () => {
    setDataUser({id, name})
    setChat(true)
  }

  return (
    <div className=  {`cont-message`} onClick={goChat}>
     <div className="flex items-center">
     <img src="profile.png" alt="profile" width={100} />
     <div>
     <h1>
        {name}
      </h1>
      <p>
       {msg}
      </p>
     </div>
    {showCheck && <span className="check"><ion-icon  name="checkmark-outline"></ion-icon> </span>}
     </div>
   
     <Divider orientation="horizontal"/>
    </div>
  )
}
