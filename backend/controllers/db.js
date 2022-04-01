exports.results = async(req, res) => {

    // Creates the query from the request body
    let query = {
        brand: req.body.brand,
        colour: req.body.colour,
        price: {$gt: req.body.minPrice-1+1, $lt: req.body.maxPrice-1+1},
        size: req.body.size
    }

    // If the query has "Any" then it is not needed
    for(const key in query){
        if (query[key] === "Any"){
            delete query[key]
        }
    }

    let dbc = db.db("stock");
    let result = [];

    // This is for the product type search, which is the only one that can receive an "Any" for the product.
    // In this case, all collections are searched and returns the searched results
    if(req.body.product === "Any"){
        let colList = await dbc.listCollections().toArray();

        // If the gender is male, then the dresses and leggings collections do not need to be searched.
        if(req.body.gender === "Mens" || req.body.gender === "Boys"){
            let mappedArray = colList.map(function(obj) { return obj.name})
            let index = mappedArray.indexOf("dresses & skirts")
            colList.splice(index, 1);
            index = mappedArray.indexOf("leggings & tights")
            colList.splice(index, 1);
        }

        //console.log(colList)

        // Searches each collection then adds the results to the response array.
        for (let index = 0; index < colList.length; index++) {
            let col = await dbc.collection(colList[index].name)
            let res = await col.find(query).toArray()
            result = result.concat(res)
        }

    }

    else{
        let col = dbc.collection(req.body.product.toLowerCase());
        result = await col.find(query).toArray()
    }

    // If the product doesn't appear in any locations, the availability is marked as "N"
    for (let index = 0; index < result.length; index++) {
        if(result[index].locations.length === 0){
            result[index].locations = "N"
        } else{
            result[index].locations = "Y"
        }
        
    }

    res.json({"data": result})
}