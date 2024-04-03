
import { AppUrl } from "./AppUrl";
import  axios  from "axios";
import store from '../scenes/state/store';
var token = store.getState().user.token;

const axiosInstanceConfig = {
    baseURL: AppUrl.BaseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};
if(token){
    axiosInstanceConfig.headers['Authorization'] = `Bearer ${token}`;
}
store.subscribe(()=>{
    const newToken = store.getState().user.token;
    axiosInstanceConfig.headers['Authorization'] = newToken ? `Bearer ${newToken}` : delete axiosInstanceConfig.headers['Authorization'];;
});
export const axiosInstance = axios.create(axiosInstanceConfig);
