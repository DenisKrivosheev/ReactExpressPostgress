import { $authhost, $host } from ".";
import jwt_decode from 'jwt-decode'

export const registration = async (email, username, password) =>{
  const {data} = await $host.post('/api/uc', {username, email, password, role:'USER'})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const login = async (email, username,  password) =>{
    const {data} = await $host.post('/api/ul', { username, email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
  }

export const check = async () =>{
    const {data} = await $authhost.get('/api/ua',)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
    
  }
  
