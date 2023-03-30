import { $authhost, $host } from ".";


export const getUsers = async () =>{
  const {data} = await $authhost.get('/api/us')
   return data
}
export const getUser = async (email, username, id) =>{
    const {data} = await $authhost.post('api/ur', {username, email, id})
    return data
  }

export const deleteUser = async (id) =>{
    const {data} = await $authhost.delete('/api/du/' + id)
    
    return data
  }

