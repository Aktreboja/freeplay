const fetchData = async(endpoint, queryParams = {}) => {
    console.log(queryParams)
    
    const url = new URL(`${process.env.API_BASE}${endpoint}`)
    Object.keys(queryParams)
        .forEach((param) => { 
            if (queryParams[param] !== undefined) {
                    if (param === 'sortBy') url.searchParams.append('sort-by', queryParams[param])
                    else url.searchParams.append(param, queryParams[param])
                }
            })

    console.log(url)
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error(`unable to fetch from ${url}: `, error)
        return []
    } 
}


module.exports = fetchData