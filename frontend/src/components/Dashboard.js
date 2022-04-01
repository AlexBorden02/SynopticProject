import React from 'react'
import { useState, useEffect, Link, Fragment } from 'react'

const Dashboard = () => {
  return (
    <div>
        <div className='grid grid-rows-2'>

            <div className='grid grid-cols-3 py-20'>
				<div class='dark:text-white items-center text-center mx-auto pt-3 h-20 w-full px-20'>
					<a href="/mens">
						<div class=" max-w-screen-2xl px-8 py-4 mx-auto bg-[#2ec4b6]/40 rounded-lg shadow-md dark:bg-gray-800">
							Mens
						</div>
					</a>
				</div>
				
				<div class='dark:text-white items-center text-center mx-auto pt-3 w-full px-20'>
					<a href="/womens">
						<div class=" max-w-screen-2xl px-8 py-4 mx-auto bg-[#e71d36]/40 rounded-lg shadow-md dark:bg-gray-800">
							Ladies
						</div>
					</a>
				</div>

				<div class='dark:text-white items-center text-center mx-auto pt-3 w-full px-20'>
					<a href="/product">
						<div class=" max-w-screen-2xl px-8 py-4 mx-auto bg-[#011627]/40 rounded-lg shadow-md dark:bg-gray-800">
							Product Type
						</div>
					</a>
				</div>
            </div>

            <div className='grid grid-cols-3'>
				<div class='dark:text-white items-center text-center mx-auto pt-3 w-full px-20'>
					<a href="/girls">
						<div class="max-w-screen-2xl px-8 py-4 mx-auto bg-[#ff9f1c]/40 rounded-lg shadow-md dark:bg-gray-800">
							Girls
						</div>
					</a>
				</div>
			
				<div class='dark:text-white items-center text-center mx-auto pt-3 w-full px-20'>
					<a href="/boys">
						<div class=" max-w-screen-2xl px-8 py-4 mx-auto bg-[#ff9f1c]/40 rounded-lg shadow-md dark:bg-gray-800">
							Boys
						</div>
					</a>
				</div>

				<div class='dark:text-white items-center text-center mx-auto pt-3 w-full px-20'>
					<a href="/brand">
						<div class=" max-w-screen-2xl px-8 py-4 mx-auto bg-[#011627]/40 rounded-lg shadow-md dark:bg-gray-800">
							Brand
						</div>
					</a>
				</div>
				
            </div>
        </div>
    </div>
  )
}

export default Dashboard