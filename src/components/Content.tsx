import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Content({id, date, msg}: any) {

  const token: any = Cookies.get('token');
  const decoded: any = token == undefined ? null : jwtDecode(token);        //decodifica o token e verifica se esta logado

  const data = new Date(date).toLocaleTimeString('pt-BR');

const position = decoded.id == id ? "justify-end" : "justify-start";     //poe na direita ou esquerda

  return (
    <div className={`msg ${position}`}>
      <div className="color-msg">
      {msg}<span className="text-gray-300">{data}</span>
      </div>
    </div>
  )
}
