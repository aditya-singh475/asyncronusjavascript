//https://official-joke-api.appspot.com/random_joke
const joke=document.querySelector('#generateBtn');
const setup=document.querySelector('#setup');

const punchline=document.querySelector('#punchline')

joke.addEventListener('click', function(){
    fetch("https://official-joke-api.appspot.com/random_joke").then(function(rawData){
        return rawData.json()
    }).then(function(data){
        setup.textContent=data.setup;
        punchline.textContent=data.punchline;

      
        
    })
    
})

