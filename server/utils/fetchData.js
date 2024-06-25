/**
 * Middleware function that serves as a utility for API requests
 * @param { String } endpoint the endpoint to be called 
 * @param { Object } queryParams The query Parameters of the request
 * @returns 
 */
const fetchData = async(endpoint, queryParams = {}) => {
    const url = new URL(`${process.env.API_BASE}${endpoint}`)
    Object.keys(queryParams)
        .forEach((param) => { 
            if (queryParams[param] !== undefined) {
                    if (param === 'sortBy') url.searchParams.append('sort-by', queryParams[param])
                    else url.searchParams.append(param, queryParams[param])
                }
            })
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