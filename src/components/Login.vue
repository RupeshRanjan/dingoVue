<template>
	<v-app id="inspire">
		<v-content>
			<v-container
				class="fill-height"
				fluid
			>
				<v-row
					align="center"
					justify="center"
				>
					<v-col
						cols="12"
						sm="8"
						md="4"
					>
						<v-card class="elevation-12">
							<v-toolbar
								color="primary"
								dark
								flat
							>
								<v-toolbar-title>Login</v-toolbar-title>
								<div class="flex-grow-1"></div>
							</v-toolbar>
							<v-card-text>
								<v-form>
									<v-text-field
										label="Email"
										name="email"
										type="text"
										v-model="email"
									></v-text-field>

									<v-text-field
										id="password"
										label="Password"
										name="password"
										type="password"
										v-model="password"
									></v-text-field>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<div class="flex-grow-1"></div>
								<v-btn color="primary" @click="handleSubmit">Login</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
	import axios from 'axios';
	export default {
		props: {
			source: String,
		},
		data: () => ({
			email : "",
			password : ""
		}),
		methods : {
			handleSubmit(e){
				e.preventDefault();
				if(this.password.length > 0){
					axios.post('http://localhost/api/public/api/login',{
						email : this.email,
						password : this.password
					})
					.then(response => {
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        localStorage.setItem('jwt',response.data.token)

                        if (localStorage.getItem('jwt') != null){
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else 
                            {
                                this.$router.push('home')
                            }
                        }
	                })
	                .catch(function (error) {
	                    console.error(error.response);
	                });
				}
			}
		}

	}
</script>