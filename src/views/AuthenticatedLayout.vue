<template>
	<v-app id="inspire">
		<v-app-bar
			app
			color="indigo"
			dark
		>
			<v-toolbar-title>Application</v-toolbar-title>
			<v-btn color="blue darken-1" text @click="logout">Logout</v-btn>
		</v-app-bar>

		<v-content>
			<v-container
				class="fill-height"
				fluid
			>
				<v-row
					align="center"
					justify="center"
				>
					<v-col class="text-center">
						<router-view></router-view>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
		<v-footer
			color="indigo"
			app
		>
			<span class="white--text">&copy; 2019</span>
		</v-footer>
	</v-app>
</template>

<script>
	export default {
		props: {
			source: String,
		},
		data: () => ({
			drawer: null,
		}),
		methods : {
			logout(){
				localStorage.setItem('jwt',null)
				this.$router.push('login');
			}
		}
	}
</script>