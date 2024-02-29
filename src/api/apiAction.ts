import { BASE_URL } from "./apiUrls"

const fetchData=async (apiURL:string)=>{
    let repsonse=await fetch(apiURL)
    repsonse= await repsonse.json()
    return repsonse
    
    
}
export default fetchData