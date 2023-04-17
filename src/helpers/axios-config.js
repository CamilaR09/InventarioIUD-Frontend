import axios from 'axios';

const axiosInstance = axios.create({
   // baseURL:'http://localhost:9000/'
    baseURL:'https://inventarios-b-iud-p2jy.onrender.com/'
})
export{
    axiosInstance
}