/* Global Variables */
const btn = document.getElementById('generate');
const apikey = "&appid=0731106befd9082a287b34d1a464072f&units=metric";
const url = "https://api.openweathermap.org/data/2.5/weather?zip="
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

btn.addEventListener('click',geneate);

function geneate(e){
    e.preventDefault();
    const zip =document.getElementById('zip').value;
    const content =document.getElementById('feelings').value;
    if(!zip){
        alert('Please enter zip code');
    }else{
        //get weather data
     const weather = getWeatherData(zip).then(
       (weather) => {
           // passing weather to the server with user content 
            postData('http://localhost:3000/addData',
            {date: newDate, temp: weather.main.temp, content: content }) 
            .then(
                (projectData)=>{
                    updateUI(projectData);
                }
            )
        }

     )   
    }
}


const getWeatherData = async(zip)=> {
    let response = await fetch(url+zip+apikey);
    try {
        const weatherData = await response.json();
        return weatherData
    } catch (error){
        console.log(error);
    }

}

const postData= async (url="",data={})=>{
    const req =await fetch(url,{
        method:"POST",
        credentials: "same-origin",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            date : data.date,
            temp : data.temp,
            content: data.content,
        })
    }) 
    try {
        const updatedData = await req.json();
        return updatedData;
    }catch(error){
        console.log(error)
    }
}

const updateUI = async () => {
    const req =await fetch("http://localhost:3000/allData")
    try{
        const allData = await req.json()  ;
        document.getElementById("date").innerHTML =allData.date;
        document.getElementById("temp").innerHTML =allData.temp;
        document.getElementById("content").innerHTML =allData.content;
    }catch (error){
        console.log(error)
    }
}