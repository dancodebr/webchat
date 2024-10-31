import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Message from "@/components/Message";
import Nav from "@/components/Nav";
import { useContext, useEffect, useState } from "react";
import Chat from "@/components/Chat";
import { useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/react";
import { ContextTsx } from "@/Context/Context";
import { ApiControll } from "@/Controllers";

export default function Home() {

const router = useRouter()

const [user, setUser] = useState<any>(null)
const {setWidth, update, setChat, setDataUser} = useContext(ContextTsx)
const [data, SetData] = useState<any>()
const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.key === 'Escape') {
        // Ação a ser realizada quando 'Esc' for pressionado
        setChat(false)
        // Coloque aqui a ação que você deseja executar
      }
    };

    window.addEventListener('keydown', handleEsc);

    // Limpeza do evento ao desmontar o componente
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);


useEffect(()=> {

  function getUser () {
    const token: any = Cookies.get('token');
    const decoded: any = token == undefined ? null : jwtDecode(token);        //decodifica o token e verifica se esta logado
    
    if (decoded === null) {
      router.push('/')
      return
    }
    setUser(decoded)
  }

  getUser()

},[router])

useEffect(()=> {

  async function getMessages() {
    if (!user) return
    
    try {
      setLoading(true)
      const res: any = await ApiControll.getMessages(user.id)
      const sortedData = res.data.sort((a: any, b: any) => new Date(b.message.createdAt).getTime() - new Date(a.message.createdAt).getTime())
      SetData(sortedData)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  getMessages()
    

},[user, update])

const showUsers = () => {
  setWidth("100%")
}

const logout = () => {
  setDataUser({
    id: '',
    name: '',
  })
  Cookies.remove('token')
 
  setChat(false)
  setUser(null)
  router.push('/')
}

  return (
    <div className="cont-home">
      <div className="inbox"> 
      <Nav/>
    <div className="header bg-blue-700 mb-3">
      <h1 className="flex items-center gap-3">
      <ion-icon size='large' name="person-circle-outline"></ion-icon> <p>{user && user?.name}</p>
      </h1>
      <span className="flex gap-3">
        <Tooltip content="Nova Conversa">
        <button onClick={showUsers} >
        <ion-icon size='large' name="add-circle-outline"></ion-icon>
        </button>
        </Tooltip>
      <Tooltip content="Sair">
        <button onClick={logout}>
        <ion-icon size='large' name="log-out-outline"></ion-icon>
        </button>
        </Tooltip>
      </span>
    </div>
  
    <div className="messages">

    {
  loading ? <h1 className="start">CARREGANDO...</h1> : 
  data && data.length > 0 ? (
    data.map((d: any) => (
      <Message key={d.id} msg={d.message.data} userReceive={d.userReceive} userFrom={d.userFrom} from={d.message.from} receive={d.message.receive}  />
    ))
  ) : (
    <div className="start">
      <h1 className="empty">VOCÊ AINDA NÃO TEM CONVERSAS!</h1>
      <p onClick={showUsers}>CLIQUE AQUI E INICIE UMA CONVERSA</p>
    </div>
  )
}

    </div>

      </div>
      <Chat/>
    </div>
  )
}