<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
	methods : {
		logout(){
			localStorage.setItem('jwt',null)
		}
	}
}
</script>