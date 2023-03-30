import { $authhost, $host } from ".";


export const createType = async (type) =>{
  const {data} = await $authhost.post('api/type', type)
  return data
}

export const getTypes = async () =>{
    const {data} = await $host.get('api/type')
    return data
  }
export const createBrand = async (brand) =>{
    const {data} = await $authhost.post('api/brand', brand)
    return data
  }
  
export const getBrands = async () =>{
      const {data} = await $host.get('api/brand')
      return data
    }
export const createDevice = async (device) =>{
        const {data} = await $authhost.post('api/device', device)
        return data
      }
      
export const getDevices = async (typeId, brandId, page, limit = 5) =>{
          const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
          return data
        }
export const getDevice = async (id) =>{
          const {data} = await $host.get('api/device/' + id )
          return data
}

export const searchDevice = async (name)=>{
    const {data} = await $host.post('api/device/search', name)
    return data
}