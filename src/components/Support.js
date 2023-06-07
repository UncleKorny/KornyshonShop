import axios from "axios";
import { useContext, useState } from "react";
import { Store } from "../Store";
export default function Support(){
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;
    const [message, setMessage] = useState('');
    const handlerChange = (e) =>{
        setMessage(e.target.value);
    }
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
      });
    const handlerSend = async (e)=>{
        e.preventDefault();
        const email = userInfo.email;
        await instance.post('/api/send-mail/', {message, email}).then(
            response => console.log(response.data)
        ).catch(err=>{console.log(err)});
    }
    return(
        <div>
            <form>
                <input
                id="text"
                type="text"
                name="text"
                onChange={handlerChange}
                value={message}
                >
                
                </input>
                <button
                onClick={handlerSend}
                >
                    отправить
                </button>
            </form>
        </div>
    )
}