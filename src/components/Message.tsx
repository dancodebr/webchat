import { Divider } from "@nextui-org/divider";
import { useContext, useEffect, useState } from "react";
import { ContextTsx } from "@/Context/Context";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface MessageProps {
  msg: string;
  userReceive: string;
  userFrom: string;
  from: string;
  receive: string;
}

interface DecodedToken {
  id: string;
  name :string

}

export default function Message({ msg, userReceive, userFrom, from, receive }: MessageProps) {
  const token: string | undefined = Cookies.get('token');
  const decoded: DecodedToken | null = token == undefined ? null : jwtDecode<DecodedToken>(token); // Decodifica o token e verifica se está logado
  const { setChat, setDataUser } = useContext(ContextTsx);
  const [showCheck, setShowCheck] = useState(false);
  const id = from == decoded?.id ? receive : from;
  const name = userReceive == decoded?.name ? userFrom : userReceive;

  useEffect(() => {
    setShowCheck(decoded?.id === from);
  }, [decoded, from]);

  const goChat = () => {
    setDataUser({ id, name });
    setChat(true);
  };

  return (
    <div className="cont-message" onClick={goChat}>
      <div className="flex items-center">
        <img src="profile.png" alt="profile" width={100} />
        <div>
          <h1>{name}</h1>
          <p>{msg}</p>
        </div>
        {showCheck && <span className="check"><ion-icon name="checkmark-outline"></ion-icon> </span>}
      </div>
      <Divider orientation="horizontal" />
    </div>
  );
}
