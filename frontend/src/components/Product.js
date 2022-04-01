import React from 'react'
import logo from '../logos/StylishYou_Logo_Main.png';
import { useState, useEffect, Redirect } from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
	const [brand, setBrand] = useState("Any")
	const [colour, setColour] = useState("Any")
	const [gender, setGender] = useState("Any")
	const [minPrice, setMinPrice] = useState("0.01")
	const [maxPrice, setMaxPrice] = useState("5000")
	const [size, setSize] = useState("Any")
	const [options, setOptions] = useState()
	const [sizes, setSizes] = useState()
	const [searchType] = useState("product")


	useEffect(() => {


	}, [])
	

    return (
		<div class='flex justify-center py-10'>
			<div class='bg-white w-96 shadow-xl rounded px-5 py-5'>
                <img src={logo} alt="" className='pb-5 max-h-20'/>
				<form>
					{/* gender */}
					<div class="relative z-0 mb-6 w-full group">
						<label for="product_gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Gender</label>
						<select id="product_gender" onChange={e => setGender(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option>Any</option>
							<option>Mens</option>
							<option>Ladies</option>
							<option>Boys</option>
							<option>Girls</option>
						</select>
					</div>

					{/* prod type */}
					<div class="relative z-0 mb-6 w-full group">
						<label for="product_brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Brand</label>
						<select id="product_brand" onChange={e => setBrand(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option>Any</option>
							<option>Nike</option>
							<option>GUCCI</option>
							<option>Louis Vuitton</option>
							<option>Adidas</option>
							<option>ASOS</option>
							<option>Levi's</option>
						</select>
					</div>

					{/* size */}
					<div class="relative z-0 mb-6 w-full group">
						<label for="product_size" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Size</label>
						<select id="product_size" onChange={e => setSize(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option>Any</option>
							<option>S</option>
							<option>M</option>
							<option>L</option>
							<option>XL</option>
							<option>XXL</option>
						</select>
					</div>

					{/* colour */}
					<div class="relative z-0 mb-6 w-full group">
						<label for="product_colour" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Colour</label>
						<select id="product_colour" onChange={e => setColour(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
							<option>Any</option>
							<option>Beige</option>
							<option>Black</option>
							<option>Blue</option>
							<option>Green</option>
							<option>Grey</option>
							<option>Multi</option>
							<option>Orange</option>
							<option>Pink</option>
							<option>Purple</option>
							<option>Red</option>
							<option>Silver</option>
							<option>White</option>
							<option>Yellow</option>
							<option>Gold</option>
						</select>
					</div>

					{/* pricing */}
					<div class="grid xl:grid-cols-2 xl:gap-6">
						<div class="relative z-0 mb-6 w-full group">
							<input type="number" onChange={e => setMinPrice(e.target.value)} name="price_min" id="price_min" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600" placeholder=" " />
							<label for="price_min" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price Min.</label>
						</div>
						<div class="relative z-0 mb-6 w-full group">
							<input type="number" onChange={e => setMaxPrice(e.target.value)} name="price_max" id="price_max" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600" placeholder=" " />
							<label for="price_max" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price Max.</label>
						</div>
					</div>
					<div class="grid xl:grid-cols-2 xl:gap-6">
						<Link to="/" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</Link>
						<Link 
							to={"/results"} 
							state= {{ 
								product: "Any",
								brand: brand,
								colour: colour,
								gender: gender,
								minPrice: minPrice,
								maxPrice: maxPrice,
								size: size,
								searchType: searchType
							}}
							class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
						</Link>			
					</div>
				</form>
			</div>
		</div>
	)
}


export default Product