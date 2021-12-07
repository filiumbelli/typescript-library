import axios from "axios";

const baseURL = "http://localhost:3000/users";

export const usersApi = axios.create({
    baseURL,
    withCredentials: false,
    headers: { 'Access-Control-Allow-Origin': '*' }
})



