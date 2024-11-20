

const getState = ({ getStore, getActions, setStore }) => {
	
	return {
		store: {
			message: null,
			userToken: null,
			userEmail: null,
			userId: null,
			userPassword: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			createUser: (email, password) => {
				fetch("https://fuzzy-bassoon-7vvw4xvvrwqxcx55w-3001.app.github.dev/users", {
					method: 'POST',
					body: JSON.stringify(
						{
							"email": email,
							"password": password
						}
					),
					headers: {
						'Content-type': 'application/json'
					}
				})
					.then(res => {
						if (!res.ok) throw Error("user not created");
						return res.json();
					})
					.then((response) => null)
					.catch(error => console.error(error));
			},

			login: (email, password) => {
				fetch("https://fuzzy-bassoon-7vvw4xvvrwqxcx55w-3001.app.github.dev/token", {
					method: 'POST',
					body: JSON.stringify(
						{
							"email": email,
							"password": password
						}
					),
					headers: {
						'Content-type': 'application/json'
					}
				})
					.then(res => {
						if(!res.ok) throw Error("There was a problem in the login request")

						if(res.status === 401){
							 throw("Invalid credentials")
						}
						if(res.status === 400){
								throw ("Invalid email or password format")
						}
						return res.json()
					})
					.then(response => {
						console.log("response", response);
						localStorage.setItem('token', response.token);
						
						setStore({ userToken: response.token, userEmail: response.email })
					})
					.catch(error => console.error(error));
			},

			userInfo: () => {
				// let token = getStore().userToken
				let token = localStorage.getItem('token');
				console.log("token", token);
				
				fetch("https://fuzzy-bassoon-7vvw4xvvrwqxcx55w-3001.app.github.dev/private", {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token
					}
				})
					.then(res => {
						// if(!res.ok) {
						// 	throw Error("There was a problem in the login request")
						// } 
						// if(res.status === 403) {
						// 	throw Error("Missing or invalid token");
						// } 
						return res.json()
					})
					.then(response => {
						setStore({ userId: response.id, userPassword: response.password})
					})
					.catch(error => console.error(error))
			}
		}
	};
};

export default getState;
