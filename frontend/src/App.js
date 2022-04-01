import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect, Redirect } from 'react'
//import './App.css';

import Navigation from './components/Navbar'
import Dashboard from './components/Dashboard';
import Product from './components/Product';
import Mens from './components/Mens';
import Brand from './components/Brand';
import Boys from './components/Boys';
import Womens from './components/Womens';
import Girls from './components/Girls';
import Results from './components/Results';
import Login from './components/Login';
import Auth from './components/Auth';

function App() {
	const [Authed, setAuthed] = useState(false)
	const [loading, setLoading] = useState(true);

	// Authentication before any route is loaded.
	useEffect(() => {
		const getAuth = async() => {
		  const result = await Auth()
		  console.log(result)
		  setAuthed(result)
		}
	
		getAuth()
	
		.finally(() => {
		  setLoading(false);
		})
	
	}, [])

	if (loading) return "Loading" // If the API request takes longer than the page load time, a loading message will appear.
	if(!Authed) return <Login /> // If authentication fails, return to login page
	
	return (
		<div class="flex flex-col h-screen justify-between bg-[#fdfffc] dark:bg-gray-900">

			<div class=''>
				<Router>
					<Navigation />
					<Routes>
						<Route path="/" exact element={<Dashboard />} />
						<Route path="/product" exact element={<Product />} />
						<Route path="/mens" exact element={<Mens />} />
						<Route path="/boys" exact element={<Boys />} />
						<Route path="/womens" exact element={<Womens />} />
						<Route path="/girls" exact element={<Girls />} />
						<Route path="/brand" exact element={<Brand />} />
						<Route path="/results" exact element={<Results/>} />
					</Routes>
				</Router>
			</div>

			<footer class='relative left-0 bottom-0 py-2 bg-[#011627] w-full text-[#ff9f1c] text-center h-10'>
                <div>
                    <p>Stylish You - Stock</p>
                </div>
            </footer>
		</div>
	);
}

export default App;
