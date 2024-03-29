export const capitalizeFirstWord=(text:string) =>{
    
    if (text.length === 0) {
      return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

export const getRandomData=(data:any[])=>{
   const randomNo= Math.floor(Math.random() * 10) + 1
   console.log("randomNo",randomNo)
   let randomData=[]
   try {
    for(let i=0;i<=randomNo;i++){
      let randomNo:number= Math.floor(Math.random() * 10) + 1
      let allNo:any={}
        if(randomNo<=data?.length && !allNo[randomNo]){
          randomData.push(data[randomNo])
          allNo[randomNo]=randomNo
        }else{
          getRandomData(data)
        }
     }
     return randomData
   } catch (error) {
      console.log("Error",error)
      return data
   }
   
}
  