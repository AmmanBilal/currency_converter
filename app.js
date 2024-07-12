const BASE_URL =
     url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_7UStkUqQNBmahSoy8K635tE3Sjr5fK1UVPmVloZ2";


 const dropdown=document.querySelectorAll(".dropdown select") 
 const btn= document.querySelector("form button")
 const from_curr=document.querySelector(".from select")
 const to_curr=document.querySelector(".to select")
  const msg=document.querySelector(".msg")



// select to and from curreny
 for (let select of dropdown){
  for (curr_code in countryList){
      let newOption=document.createElement("option")
      newOption.innerText=curr_code
      newOption.value=curr_code
      if (select.name==="from"&& curr_code==="USD"){
        newOption.selected="selected"
      }else if (select.name==="to"&& curr_code==="PKR"){
        newOption.selected="selected"
      }

    select.append(newOption)
  }

  // chng flag
  select.addEventListener("change",(evt)=>{
    update_flag(evt.target)   
  })
}

// updating exchange rate
const updating_exchange_rate= async()=>{
  let amount=document.querySelector(".amount input")
  let amtVal=amount.value
  if(amtVal ===""|| amtVal<1){
    amtVal=1
    amount.value="1"
  }
  const URL=`${BASE_URL}/${from_curr.value.toLowerCase()}/${to_curr.value.toLowerCase()}.json`
  let response=await fetch(URL)
  let data= await response.json()
  let rate=data[to_curr.value.toLowerCase()]
  console.log(rate)


  let final_Amount=amtVal*rate
  msg.innerText=`${amtVal} ${from_curr.value}USD=${final_Amount} ${to_curr.value}278PKR`
}

// updating flag
const update_flag=(element)=>{
  let curr_code=element.value
  console.log(curr_code)
  let Country_code=countryList[curr_code]
  let new_Src=`https://flagsapi.com/${Country_code}/flat/64.png`
  let img=element.parentElement.querySelector("img")
  
  img.src=new_Src
}



// updating button
btn.addEventListener("click",(evt)=>{
  evt.preventDefault()
  // prevent default stops the automatic updation
updating_exchange_rate()
})


window.addEventListener("load",()=>{
  updating_exchange_rate()
  })