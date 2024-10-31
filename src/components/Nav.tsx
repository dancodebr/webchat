import { useContext, useEffect, useState } from "react"
import Users from "./Users"
import { ContextTsx } from "@/Context/Context"
import { ApiControll } from "@/Controllers";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Nav({id}: any) {

  const { width, setWidth } = useContext(ContextTsx);
  const [users, setUsers] = useState<any>()
  const token: any = Cookies.get('token');
  const decoded: any = token == undefined ? null : jwtDecode(token);  

  const exitNav = () => {
    setWidth("0%")
  }

  useEffect (()=> {


    async function getUsers () {

      try {

        const res: any = await ApiControll.getUsers(decoded.id)
        setUsers(res.data)
        
      } catch (error) {
        console.log(error)
      }

    }

    getUsers()
  },[])

  return (
    <div className="cont-nav" style={{
      width: width,
    }}>
       <div className="header-nav bg-blue-700 flex mb-3">
       <button onClick={exitNav}><ion-icon size='large' name="arrow-back-outline"></ion-icon></button>
      <h1>
        Nova Conversa
      </h1>
       </div>
       <div className="users">
  {users && users.map((user: any) => {
    return <Users key={user.id} id={user.id} name={user.name} /> // Adiciona cada user à lista de Users
  })}
</div>

     
    </div>
  )
}
