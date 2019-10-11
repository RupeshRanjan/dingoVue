<template>
	<v-data-table
		:headers="headers"
		:items="users"
		sort-by="calories"
		class="elevation-1"
	>
		<template v-slot:top>
			<v-toolbar flat color="white">
				<v-toolbar-title>User CRUD</v-toolbar-title>
				<v-divider
					class="mx-4"
					inset
					vertical
				></v-divider>
				<div class="flex-grow-1"></div>
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on }">
						<v-btn color="primary" dark class="mb-2" v-on="on">New User</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span class="headline">{{ formTitle }}</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" sm="6" md="4">
										<v-text-field v-model="editedItem.id" label="Id" readonly></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="4">
										<v-text-field v-model="editedItem.name" label="Name"></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="4">
										<v-text-field v-model="editedItem.email" label="Email"></v-text-field>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<div class="flex-grow-1"></div>
							<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
							<v-btn color="blue darken-1" text @click="save">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<template v-slot:item.action="{ item }">
			<v-icon
				small
				class="mr-2"
				@click="editItem(item)"
			>
				edit
			</v-icon>
			<v-icon
				small
				@click="deleteItem(item)"
			>
				delete
			</v-icon>
		</template>
	</v-data-table>
</template>

<script>
	import axios from 'axios';
	export default {
		data: () => ({
			dialog: false,
			headers: [
				{
					text: 'Id',
					align: 'left',
					sortable: false,
					value: 'id',
				},
				{ text: 'Name', value: 'name' },
				{ text: 'Email', value: 'email' },
				{ text: 'Created_at', value: 'created_at' },
				{ text: 'Updated_at', value: 'updated_at' },
				{ text: 'Actions', value: 'action', sortable: false },
			],
			users: [],
			editedIndex: -1,
			editedItem: {
				id: '',
				name: 0,
				email: 0,
				created_at: 0,
				updated_at: 0,
			},
			defaultItem: {
				id: '',
				name: 0,
				email: 0,
				created_at: 0,
				updated_at: 0,
			},
		}),

		computed: {
			formTitle () {
				return this.editedIndex === -1 ? 'New User' : 'Edit User'
			},
		},

		watch: {
			dialog (val) {
				val || this.close()
			},
		},

		created () {
			this.initialize()
		},

		methods: {
			initialize () {
				axios.get('http://localhost/api/public/api/user',{
					headers: {
						"Authorization" : "Bearer "+localStorage.getItem('jwt'),
						"Accept":"application/json"
					}
				}).then((response) => {
					console.log(response);
					this.users = response.data;
				})
			},

			editItem (item) {
				this.editedIndex = this.users.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialog = true
			},

			deleteItem (item) {
				const index = this.users.indexOf(item)
				confirm('Are you sure you want to delete this item?') && this.users.splice(index, 1)
			},

			close () {
				this.dialog = false
				setTimeout(() => {
					this.editedItem = Object.assign({}, this.defaultItem)
					this.editedIndex = -1
				}, 300)
			},

			save () {
				if (this.editedIndex > -1) {
					Object.assign(this.users[this.editedIndex], this.editedItem)
				} else {
					this.users.push(this.editedItem)
				}
				this.close()
			},
		},
	}
</script>