import axios from "axios";
const URL="http://localhost:3000/studies";
export const get=()=>axios.get(URL).then(r=>r.data);
export const post=(d:any)=>axios.post(URL,d).then(r=>r.data);
export const patch=(id:number,d:any)=>axios.patch(`${URL}/${id}`,d).then(r=>r.data);
export const del=(id:number)=>axios.delete(`${URL}/${id}`);
