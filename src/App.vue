<template>
  <router-view/>
</template>

<script>

  let brand = ' | ' + process.env.VUE_APP_TITLE;

  export default {
    name: 'App',
    watch:{
      $route(to){
        document.title = to.meta.title + brand
        document.description = to.meta.description
      }
    }
  }
</script>

