import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const Results = () => {
	const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

	var location = useLocation()

    for(const key in location.state){
        if (location.state[key] === undefined){
            location.state[key] = "Any"
        }
    }

    // Fetch data from API using the states from the search page.
    const fetchData = async() => {
        const res = await fetch(`http://localhost:4000/data/results`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
			body:JSON.stringify({
				brand: location.state.brand,
                colour: location.state.colour,
                maxPrice: location.state.maxPrice,
                minPrice: location.state.minPrice,
                product: location.state.product,
                size: location.state.size,
                gender: location.state.gender
			})
        })

        const data = await res.json()
        return data.data
    }

    const navigate = useNavigate();

    console.log(location.state)

    // Makes the API request and sets the data state.
	useEffect(() => {
        
        const getData = async () => {
            const dataFromApi = await fetchData()
            setData(dataFromApi)
        }

        getData()

        .finally(() => {
            setLoading(false);
        });

	}, [])
		
    // Columns for datatable
	const columns = [
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,

        },
        {
            name: 'Available in Store',
            selector: row => row.locations,
            sortable: true,
        },
    ]	

    // When the brand column is needed, it is spliced into the second position of the columns array
    if(location.state.searchType === "gender" || location.state.searchType === "product"){
        columns.splice(1, 0, {
            name: 'Brand',
            selector: row => row.brand,
            sortable: true,
        })
    }

    // Table options
    const tableData = {
        columns,
        data,
        print: false,
        export: false,
        filterPlaceholder: "Search"
    }

    if (loading) return (
        
        <svg role="status" class="items-center text-center mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        
    )

    function convertArrayOfObjectsToCSV(array) {
        let result;
    
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(data[0]);
    
        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;
    
        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;
    
                result += item[key];
                
                ctr++;
            });
            result += lineDelimiter;
        });
    
        return result;
    }

    function downloadCSV(array) {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;
    
        const filename = 'export.csv';
    
        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }
    
        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }

	return (
		<div class='pt-3'>  
            <div class=" max-w-screen-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div class="grid grid-cols-2 content-start gap-4">
                    <button onClick={() => navigate(-1)} class="text-white max-w-fit justify-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</button>
                    <button onClick={() => downloadCSV(data)} class="text-white max-w-fit bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Export</button>
                </div>  
                <DataTableExtensions {...tableData} class='dark:bg-gray-800'>
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        highlightOnHover
                        class='dark:bg-gray-800'
                    />
                </DataTableExtensions>
            </div>
        </div>
	)
}

export default Results