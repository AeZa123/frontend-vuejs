import { createRouter, createWebHistory } from 'vue-router'

// Import Layouts frontend and backend
import FrontendLayout from '@/layouts/Frontend.vue'
import BackendLayout from '@/layouts/Backend.vue'

//import frontend
import Home from '@/views/frontend/Home.vue'
import About from '@/views/frontend/About.vue'
import Contact from '@/views/frontend/Contact.vue'
import ForgotPassword from '@/views/frontend/ForgotPassword.vue'
import Login from '@/views/frontend/Login.vue'
import Portfolio from '@/views/frontend/Portfolio.vue'
import Register from '@/views/frontend/Register.vue'
import Service from '@/views/frontend/Service.vue'
import NotFound404 from '@/views/frontend/NotFound404.vue'


//import backend
import Dashbaord from '@/views/backend/Dashboard.vue'
import Products from '@/views/backend/Products.vue'


//ตัวแปรเซ็คล็อกอิน
//let state = false



//สร้างฟังก์ชันเช็ค router
function authGuard(to, from, next){

  let isAuthenticated = false

  if(localStorage.getItem('user')){

    isAuthenticated = true

  }else{
    isAuthenticated = false
  }

  if(isAuthenticated){
    next()
  }else{
    next({name:'Login'})
  }

}




const routes = [

  //frontend router
  {
    path: '/',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      }
    ],
    meta: {
      title: 'Home',
      description: 'รุ่นทดลอง'
    }
  },
  {
    path: '/about',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'About',
        component: About
      }
    ],
    meta: {
      title: 'About',
      description: 'รุ่นทดลอง'
    }
  },
  {
    path: '/contact',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'Contact',
        component: Contact
      }
    ],
    meta: {
      title: 'Contact',
      description: 'รุ่นทดลอง'
    }
  },
  {
    path: '/forgotpassword',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'ForgotPassword',
        component: ForgotPassword
      }
    ],
    meta: {
      title: 'ForgotPassword',
      description: 'รุ่นทดลอง'
    }
  },
  {
    path: '/login',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login
      }
    ],
    meta: {
      title: 'Login',
      description: 'รุ่นทดลอง'
    }
  },
  {
    path: '/portfolio',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'Portfolio',
        component: Portfolio
      }
    ],
    meta: {
      title: 'Portfolio',
      description: 'รุ่นทดลอง'
    }
  },
  {
    path: '/register',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'Register',
        component: Register
      }
    ],
    meta: {
      title: 'Register',
      description: 'รุ่นทดลอง'
    }
  },
  {
    path: '/service',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'Service',
        component: Service
      }
    ],
    meta: {
      title: 'Service',
      description: 'รุ่นทดลอง'
    }
  },

  {
    path: "/:catchAll(.*)",
    component: NotFound404,
    meta: {
      title: '404 Not Found',
      description: 'รุ่นทดลอง'
    }
  },


  //backend router

  {
    path: '/backend',
    component: BackendLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashbaord,
        beforeEnter: authGuard
        // beforeEnter (to, from, next) {
        //   // ...
        //   if(state){
        //     next()
        //   }else{
        //     next({name:'Login'})
        //   }
        // }
      }
    ],
    meta: {
      title: 'Dashboard'
    }
  },

  {
    path: '/backend/products',
    component: BackendLayout,
    children: [
      {
        path: '',
        name: 'Products',
        component: Products,
        beforeEnter: authGuard
        // beforeEnter (to, from, next) {
        //   // ...
        //   if(state){
        //     next()
        //   }else{
        //     next({name:'Login'})
        //   }
        // }
      }
    ],
    meta: {
      title: 'Products'
    }
  }






]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
