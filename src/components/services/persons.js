import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log(request)
    console.log('get all')
    return request.then(response => 
    	response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    console.log('creating')
    return request.then(response => 
    	response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    console.log('updating')
    return request.then(response => 
    	response.data)
}
const del = id => {
    console.log(id)
    const request = axios.delete(`${baseUrl}/${id}`)
    console.log('deleting')
    return request.then(response => 
    	response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  del: del
}
