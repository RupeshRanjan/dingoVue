import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import VueRouter from 'vue-router'
import AuthenticatedLayout from './views/AuthenticatedLayout.vue';
import UnauthenticatedLayout from './views/UnauthenticatedLayout.vue';

const routes = [
	{
		path : '/home',
		component : AuthenticatedLayout,
		children : [
			{ 
				path: '/home', 
				component: Home ,
				name : 'home',
				meta: { 
					requiresAuth: true
				}
			}
		]
	},
	{
		path : '/',
		component : UnauthenticatedLayout,
		children : [
			{ 
				path: '/register',
				component: Register, 
				meta: { 
					guest: true
				}
			},
			{ 
				path: '/login', 
				component: Login,
				meta: { 
					guest: true
				}
			},
		]
	}
];

const router = new VueRouter({mode: 'history', routes});

router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.requiresAuth)) {
		if (localStorage.getItem('jwt') == null) {
			next({
				path: '/login',
				params: { nextUrl: to.fullPath }
			})
		} else {
			let user = JSON.parse(localStorage.getItem('user'))
			if(to.matched.some(record => record.meta.is_admin)) {
				if(user.is_admin == 1){
					next()
				}
				else{
					next({ name: 'home'})
				}
			}else {
				next()
			}
		}
	} else if(to.matched.some(record => record.meta.guest)) {
		console.log(localStorage.getItem('jwt'));
		if(localStorage.getItem('jwt') == null){
			next()
		}
		else{
			next({ name: 'home'})
		}
	}else {
		next() 
	}
});

export default router