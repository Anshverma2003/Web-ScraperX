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

            if(data.trends && data.trends.length > 0){
                data.trends.map((trend)=>{
                    const trendli = document.createElement('li');
                    trendli.className = 'trend';
                    trendli.textContent = trend;
                    resultsDiv.appendChild(trendli);
                }) 

                const trendIP = document.createElement('p');
                trendIP.textContent = "IP ADDRESS USED: " + data.ip;
                const trendTime = document.createElement('p');
                trendTime.textContent = "CURRENT TIME:  " + data.date;

                resultsDiv.appendChild(trendIP);
                resultsDiv.appendChild(trendTime);


                const spacediv = document.createElement('div');
                spacediv.className = 'spacediv';
                spacediv.textContent = 'JSON DATA:'
                resultsDiv.appendChild(spacediv);

                const saveTrendJSON = JSON.stringify(data.saveTrend, null, 2);
                const trendjson = document.createElement('div');
                trendjson.className = 'trendjson';
                trendjson.textContent = saveTrendJSON;
                resultsDiv.appendChild(trendjson);

            }
            else{
                resultsDiv.textContent = 'No trends Found';
            }
        })
        
    } catch (error) {
        console.log(error);
    }
}