document.getElementById('fetchTrendsButton').addEventListener('click' , fetchTrends);

function fetchTrends()
{
    try {
    
    const resultsDiv = document.getElementById('results')
    resultsDiv.textContent="Loading........";

    fetch('http://localhost:8080/trends',{
        method: 'GET', 
        headers:{
            'Content-Type': 'application/json'
        }
    })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }
            throw new Error("Can not fetch data");
        })
        .then((data)=>{
            resultsDiv.textContent=" ";
            console.log(data);
            if(data.trends && data.trends.length > 0){
                data.trends.map((trend)=>{
                    const trendli = document.createElement('li');
                    trendli.className = 'trend';
                    trendli.textContent = trend;
                    resultsDiv.appendChild(trendli);
                })
            }
            else{
                resultsDiv.textContent = 'No trends Found';
            }
        })
        
    } catch (error) {
        console.log(error);
    }
}