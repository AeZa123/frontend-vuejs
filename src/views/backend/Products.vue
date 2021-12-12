<template>
    <div class="flex items-center justify-between my-5">
        <h2 class="my-6 text-sm font-semibold text-gray-700 md:text-xl dark:text-gray-200">
            Products {{ products.total }}
        </h2>

         <div class="flex justify-center flex-1 lg:mr-32">
            <div class="relative w-full max-w-xl ml-4 mr-6 focus-within:text-gray-500">
                <div class="absolute inset-y-0 flex items-center pl-2">
                    <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"></path>
                    </svg>
                </div>
                <form @submit.prevent="onSubmit">
                    <input
                        v-model="keyword"
                        class="w-full py-2 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                        type="text"
                        placeholder="ป้อนชื่อสินค้าที่ต้องการค้นหา"
                        aria-label="Search"
                    />
                    <button @click="submitSearchForm" type="submit" class="hidden">Submit</button>
                </form>
            </div>

            <div>
                <button @click="submitSearchForm" class="flex items-center justify-between px-4 py-1.5 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
                    <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>ค้นหา</span>
                </button>
            </div>

            <div>
                <button @click="resetSearchForm" class="flex items-center justify-between px-4 py-1.5 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-yellow-700 focus:outline-none focus:shadow-outline-purple">
                    <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>ล้าง</span>
                </button>
            </div>
        </div>

        <button @click="openAndCloseAddmodal" class="flex items-center justify-between px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-purple">
            <svg class="w-4 h-4 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>เพิ่ม</span>
        </button>

    </div>

     <div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
         <div class="w-full overflow-x-auto">
             <table class="w-full whitespace-no-wrap">
                 <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th class="px-4 py-3">ID</th>
                      <th class="px-4 py-3">Product</th>
                      <th class="px-4 py-3">Price</th>
                      <th class="px-4 py-3">By</th>
                      <th class="px-4 py-3">Manage</th>
                    </tr>
                  </thead>

                  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">

                      <tr v-for="product in products.data" :key="product.id" class="text-gray-700 dark:text-gray-400">
                        <td class="px-4 py-3 text-sm">{{ product.id }}</td>
                        <td class="px-4 py-3">
                          <div class="flex items-center text-sm">
                            <!-- Avatar with inset shadow -->
                            <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                              <img class="object-cover w-full h-full rounded-full" :src="product.image" alt="" loading="lazy"/>
                              <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                            </div>
                            <div>
                              <p class="font-semibold">{{ product.name }}</p>
                              <p class="text-xs text-gray-600 dark:text-gray-400">Created {{ format_date(product.created_at) }}</p>
                            </div>
                          </div>
                        </td>
                      <td class="px-4 py-3 text-sm">{{ formatPrice(product.price) }}</td>
                      <td class="px-4 py-3 text-xs">
                        <div class="flex items-center text-sm">
                          <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                            <img class="object-cover w-full h-full rounded-full" :src="product.users.avatar" alt="" loading="Lazy">
                            <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div>
                          <div>
                            <p class="font-semibold">{{ product.users.fullname }}</p>
                            <p class="text-xs text-gray-600 dark:text-gray-400">Updated {{ format_date(product.updated_at) }} </p>
                          </div>

                        </div>

                      </td>
                      <td class="px-4 py-3 text-sm">
                          <button @click="openModalEditProduct(product.id)" class="px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-400 border border-transparent rounded-lg active:bg-purple-600 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-purple">
                                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                          </button>
                          <button @click="onClickDelete(product.id)" class="px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple">
                                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                          </button>
                      </td>
                    </tr>

                  </tbody>
             </table>

              <VueTailwindPagination 
                :current="currentPage"
                :total="total"
                :per-page="perPage"
                @page-changed="onPageClick($event)"
              />

         </div>
     </div>

    <!-- 
        ************************ Popup สำหรับเพิ่มรายการสินค้าใหม่ *************************
    -->

    <div v-if="showAddModal" id="addProductModal" class="fixed top-0 left-0 flex items-center justify-center w-full h-full modal">
        <div class="absolute w-full h-full bg-gray-900 opacity-70 modal-overlay"></div>
         <div class="z-50 w-11/12 p-5 mx-auto overflow-y-auto bg-white rounded shadow-lg h-4/5 modal-container md:max-w-md">
            <!-- Header -->
            <div class="flex items-center justify-center w-full h-auto">
                <div class="flex items-start justify-start w-full h-auto py-2 text-xl font-bold">
                    เพิ่มสินค้าใหม่
                </div>
                <div @click="openAndCloseAddmodal" class="flex justify-center w-1/12 h-auto cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
            <!--Header End-->
            </div>
            <!-- Modal Content-->
            <div class="w-full h-auto mb-4">
                <form ref="addProductForm" @submit.prevent="onSubmit" enctype="multipart/form-data">
                    
                    <label class="block my-3 text-gray-700 text-md" for="name">ชื่อสินค้า</label>
                    <input v-model="name" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="Product name">
                    <div v-if="v$.name.$error" class="mt-2 text-sm text-red-500">
                        {{ v$.name.$errors[0].$message }}
                    </div>


                    <label class="block my-3 text-gray-700 text-md" for="slug">สลัก</label>
                    <input v-model="slug" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="product-name">
                    <div v-if="v$.slug.$error" class="mt-2 text-sm text-red-500">
                        {{ v$.slug.$errors[0].$message }}
                    </div>

                    <label class="block my-3 text-gray-700 text-md" for="description">รายละเอียด</label>
                    <textarea
                    v-model="description"
                    class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
                    rows="5"
                    placeholder="Product description"
                    ></textarea>

                    <label class="block my-3 text-gray-700 text-md" for="price">ราคา</label>
                    <input v-model="price" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="0.00">
                    <div v-if="v$.price.$error" class="mt-2 text-sm text-red-500">
                        {{ v$.price.$errors[0].$message }}
                    </div>
                
                    <div class="mt-4">
                        <img v-if="imgUrl" :src="imgUrl" class="w-ful" />
                    </div>

                    <label class="block my-3 text-gray-700 text-md" for="image">ภาพสินค้า</label>
                    <input ref="fileupload" @change="onFileChange" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="file">
         
                    <div class="grid grid-cols-3 gap-4">
                        
                        <div class="col-span-2">
                            <button @click="submitForm" class="w-full px-4 py-2 mt-4 font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg text-md active:bg-purple-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
                                บันทึกรายการ
                            </button>
                        </div>

                        <div>
                            <button @click="onResetForm" class="w-full px-4 py-2 mt-4 font-medium leading-5 text-white transition-colors duration-150 bg-gray-500 border border-transparent rounded-lg text-md active:bg-purple-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-purple">
                                ล้าง
                            </button>
                        </div>

                        
                        
                    </div>
                </form>
            </div>
         </div>
    </div>


    <!--
        **************  popup การแก้ไขสินค้า  ************** 
    -->
    <div v-if="showEditModal" id="editeProductModal" class="fixed top-0 left-0 flex items-center justify-center w-full h-full modal">
        <div class="absolute w-full h-full bg-gray-900 opacity-70 modal-overlay"></div>
         <div class="z-50 w-11/12 p-5 mx-auto overflow-y-auto bg-white rounded shadow-lg h-4/5 modal-container md:max-w-md">
            <!-- Header -->
            <div class="flex items-center justify-center w-full h-auto">
                <div class="flex items-start justify-start w-full h-auto py-2 text-xl font-bold">
                    แก้ไขสินค้า
                </div>
                <div @click="closeModalEditProduct" class="flex justify-center w-1/12 h-auto cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
            <!--Header End-->
            </div>
            <!-- Modal Content-->
            <div class="w-full h-auto mb-4">
                <form @submit.prevent="onSubmit" enctype="multipart/form-data">
                    
                    <label class="block my-3 text-gray-700 text-md" for="name">ชื่อสินค้า</label>
                    <input v-model="ename" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="Product name">
                    


                    <label class="block my-3 text-gray-700 text-md" for="slug">สลัก</label>
                    <input v-model="eslug" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="product-name">
                   

                    <label class="block my-3 text-gray-700 text-md" for="description">รายละเอียด</label>
                    <textarea
                    v-model="edescription"
                    class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
                    rows="5"
                    placeholder="Product description"
                    ></textarea>

                    <label class="block my-3 text-gray-700 text-md" for="price">ราคา</label>
                    <input v-model="eprice" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="0.00">
                    
                
                    <div class="mt-4">
                        <img v-if="eimgUrl" :src="eimgUrl" class="w-ful" />
                    </div>

                    <label class="block my-3 text-gray-700 text-md" for="image">ภาพสินค้า</label>
                    <input ref="fileupload" @change="onFileChange" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="file">
         
                    
                    <button @click="submitFormEdit(eid)" class="w-full px-4 py-2 mt-4 font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg text-md active:bg-purple-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
                        อัพเดทข้อมูล
                    </button>
                        
                </form>
            </div>
         </div>
    </div>

</template>

<script>

import http from '@/services/BackendService'
import "@ocrv/vue-tailwind-pagination/dist/style.css"
import VueTailwindPagination from '@ocrv/vue-tailwind-pagination' //ใช้จัดการการแบ่งหน้าข้อมูล
import useValidate from '@vuelidate/core' // ใช้ validate form
import {required, helpers} from '@vuelidate/validators' //ใช้ validate form
import moment from 'moment' //ใช้จัดรูปแบบ วันเดือนปี



export default {
  
  components:{
        VueTailwindPagination,
  },

  data(){
     return {
            /** ตัวแปรสำหรับเรียกใช้งาน Validation */
            v$: useValidate(),


            /** ตัวแปรสำหรับเก็บข้อมูลสินค้าที่อ่านจาก API */
            products: [],
            currentPage: 0,
            perPage: 0,
            total: 0,


            /** ตัวแปรสำหรับเปิด/ปิด popup */
            showAddModal: false, // popup เพิ่มสินค้า
            showEditModal: false, // popup แก้ไขสินค้า


            /** ตัวแปรสำหรับผูกกับฟอร์มเพิ่มสินค้า */
            name: '',
            description: '',
            slug: '',
            price: '',
            imgSrc: '',
            fileName: '',
            imgUrl: '',
            file: null,


            //ตัวแปรสำหรับการแก้ไขสินค้า
            eid: '',
            ename: '',
            edescription: '',
            eslug: '',
            eprice: '',
            eimgUrl: '',
            

            //ตัวแปรสำหรับค้นหาข้อมูล
            keyword: '',
            
        }
  },

  

  methods:{

      /****************************************************************
       * ส่วนการอ่านข้อมูลจาก api และแสดงผลในตาราง
       *****************************************************************/
        // ฟังก์ชันสำหรับดึงรายการสินค้าจาก api ทั้งหมด
        async getProducts(pageNumber){
            let response = await http.get(`products?page=${pageNumber}`)
            let responseProduct = response.data
            this.products = responseProduct
            this.currentPage = responseProduct.current_page
            this.perPage = responseProduct.per_page
            this.total = responseProduct.total
        },

         // ฟังก์ชันสำหรับดึงรายการสินค้าจาก api โดยการค้นหาตามชื่อสินค้า
        async getProductsSearch(pageNumber){
            let response = await http.get(`products/search/${this.keyword}?page=${pageNumber}`)
            let responseProduct = response.data
            this.products = responseProduct
            this.currentPage = responseProduct.current_page
            this.perPage = responseProduct.per_page
            this.total = responseProduct.total
        },

        //ฟังก์ชันสำหรับการคลิกเลขหน้า
        onPageClick(event){

            this.currentPage = event

            //เช็คว่า ตัวแปร keyword มีค่าอยู่หรือไม่
            if(this.keyword == '' ){
                this.getProducts(this.currentPage)
            }else{
                this.getProductsSearch(this.currentPage)
            }

            
        },

        


        /****************************************************************
       * ส่วนการเพิ่มข้อมูลสินค้า
       *****************************************************************/

        //ฟังก์ชันสำหรับ เปิด-ปิด modal การเพิ่มสินค้า
        openAndCloseAddmodal(){
            this.showAddModal = !this.showAddModal
            this.onResetForm() 
        },


        // สร้างฟังก์ชันเมื่อผู้ใช้มีการเลือกรูปภาพในช่องภาพสินค้า
       onFileChange(e){
           const file = e.target.files[0]
           this.file = e.target.files[0]
           this.imgUrl = URL.createObjectURL(file)
           this.eimgUrl = URL.createObjectURL(file)
       },

        // สร้างฟังก์ชันสำหรับเคลียร์ข้อมูลในฟอร์มเพิ่มสินค้า
       onResetForm(){
           // การเคลียร์ค่าทั้งหมดในฟอร์ม เราจะต้อง ref
           // ล้างข้อมูลในฟอร์ม
           this.$refs.addProductForm.reset()
           this.name = ''
           this.description = ''
           this.slug = ''
           this.price = ''
           this.imgSrc = ''
           this.fileName = ''
           this.imgUrl = ''
           this.file = ''
           this.$refs.fileupload.value = null
       },

       // สร้างฟังก์ชันสำหรับ submit form สินค้า
       submitForm(){
           this.v$.$validate()
           if(!this.v$.$error){ // ถ้าไม่มี error ในฟอร์ม
               
                //alert('succcess')
                let data = new FormData()
                data.append('name', this.name)
                data.append('description', this.description)
                data.append('slug', this.slug)
                data.append('price', this.price)
                data.append('file', this.file)

                //console.log(data)
                //ส่งค่าไปยัง laravel API Product Add
                http.post('products', data).then((response)=>{
                    console.log(response)

                    //เพิ่มเสร็จทำการเคลียร์ค่าในฟอร์ม
                    this.onResetForm()

                    //เมื่อเพิ่มสินค้าเสร็จแล้วให้ดึงรายการใหม่อีกครั้ง
                    this.getProducts(this.currentPage)

                    

                    //เรียกใช้งาน popup ของ sweetalert 2
                    const Toast = this.$swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 7000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', this.$swal.stopTimer)
                            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'เพิ่มข้อมูลสำเร็จ'
                    })

                    //ปิดหน้าฟอร์มเพิ่มข้อมูล
                    this.closeAddModal()
                })
               
           }
       },



    /****************************************************************
    * ส่วนของการแก้ไขข้อมูลสินค้า
    *****************************************************************/

    //ฟังก์ชัน เปิด modal สำหรับแก้ไขสินค้า
      openModalEditProduct(id){

          http.get(`products/${id}`).then(response => {
              console.log(response.data)

              this.eid = response.data.id
              this.ename = response.data.name
              this.edescription = response.data.description
              this.eslug = response.data.slug
              this.eprice = response.data.price
              this.eimgUrl = response.data.image


              this.showEditModal = !this.showEditModal
          })


          
         // this.eid = id
          
      },

    //ฟังก์ชัน เปิด modal สำหรับแก้ไขสินค้า
      closeModalEditProduct(){
          this.showEditModal = !this.showEditModal
      },

    //สร้างฟังก์ชัน สำหรับอัพเดทข้อมูล
    submitFormEdit(id){
        //console.log(id)

        let data = new FormData()
        data.append('name', this.ename)
        data.append('description', this.edescription)
        data.append('slug', this.eslug)
        data.append('price', this.eprice)
        data.append('file', this.file)

        //send put request to laravel
        data.append('_method', 'PUT')

        //ส่งข้อมูลไปยัง backend
        http.post(`products/${id}`, 
            data
        ).then(response => {
            console.log(response.data)

            //เมื่อแก้ไขสินค้าเสร็จแล้วให้ดึงรายการใหม่อีกครั้ง
            if(this.keyword == ''){
                this.getProducts(this.currentPage)
            }else{
                this.getProductsSearch(this.currentPage)
            }
            

            //เรียกใช้งาน popup ของ sweetalert 2
            const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 7000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'แก้ไขข้อมูลสำเร็จ'
            })

            //ปิดหน้าต่าง modal
            this.showEditModal = !this.showEditModal

        }).catch(error => {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        })

    },


    /****************************************************************
    * ส่วนของการลบสินค้า
    *****************************************************************/
        onClickDelete(id){
            this.$swal.fire({
                title: 'ยืนยันการลบรายการนี้',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: `ยืนยัน`,
                cancelButtonText: `ปิดหน้าต่าง`,
            }).then((result) => {
                
                if(result.isConfirmed) {
                    
                    http.delete(`products/${id}`).then(() => {
                        this.$swal.fire('ลบรายการเรียบร้อย', '', 'success')

                        //เมื่อแก้ไขสินค้าเสร็จแล้วให้ดึงรายการใหม่อีกครั้ง
                        if(this.keyword == ''){
                            this.getProducts(this.currentPage)
                        }else{
                            this.getProductsSearch(this.currentPage)
                        }

                    }).catch(error => {
                        console.log(error.response.data)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    })
                }
            });
        },


        /****************************************************************
        * ส่วนของการค้นหาสินค้า
        *****************************************************************/

        submitSearchForm(){
            
            if(this.keyword != ''){
                //
                http.get(`products/search/${this.keyword}`).then(response => {
                    let responseProduct = response.data
                    this.products = responseProduct
                    this.currentPage = responseProduct.current_page
                    this.perpage = responseProduct.per_page
                    this.total = responseProduct.total
                })
            }else{
                this.$swal.fire('ป้อนชื่อสินค้าที่ต้องการค้นหาก่อน')
            }
        },


        resetSearchForm(){
            this.currentPage = 1
            this.getProducts(this.currentPage)
            this.keyword = ''
        },




       // สร้างฟังก์ชั่นสำหรับการจัดรูปแบบวันที่ด้วย moment.js
       format_date(value){
           if(value){
               return moment(String(value)).format('DD/MM/YYYY hh:mm:ss')
           }
       },


       //สร้างฟังก์ชันแปลงยอดเงินให้มี , คั่น เช่น 10,000
        formatPrice(value){
            let val = (value/1).toFixed(2).replace(',', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },

  },

        //ฟังก์ชันการ ตรวจสอบข้อมูลในฟอร์มเพิ่มข้อมูล
        validations(){
            return{
                name: { 
                    required: helpers.withMessage('ป้อนชื่อสินค้าก่อน', required),
                },
                slug: { 
                    required: helpers.withMessage('ป้อนสลักก่อน', required),
                },
                price: { 
                    required: helpers.withMessage('ป้อนราคาก่อน', required),
                },
                    
            }
        },


  mounted(){
    this.currentPage = 1;
    
    this.getProducts(this.currentPage)
  }

}
</script>

<style>

</style>