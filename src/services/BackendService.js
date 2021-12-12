import axios from "axios";

//let token = ''

// if(localStorage.getItem('user')) {
//     let userStorage = localStorage.getItem('user')
//     let userStorageJson = JSON.parse(userStorage)
//     token = userStorageJson['token']
// }else{
//     token = ''
// }

const BackendService = axios.create({
  baseURL: process.env.VUE_APP_URL_API,
  withCredentials: true,
  headers: {
    "Content-type": "multipart/form-data",
    "Accept": "application/json",
    //"Authorization": `Bearer ${token}`
  },
});

//ใช้ interceptors เพื่อแทรก token เข้าไปมน header
BackendService.interceptors.request.use(config => {

  //อ่าน token จาก localstorage
  let token = ''

  try{
    let userStorage = localStorage.getItem('user')
    let userStorageJson = JSON.parse(userStorage)
    token = userStorageJson['token']
  }catch(error){
    console.log(error)
  }

  if(token) {
    config.headers.Authorization = "Bearer "+ token
  }

  return config


})


export default BackendService;