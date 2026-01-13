const btn=document.querySelector('.btn')
const bg_vid=document.querySelector('.bg-video') 

btn.addEventListener('click',()=>{
    if(btn.innerHTML==='play'){
        playVideo()
        btn.innerHTML='pause'
    }
    else{
        pauseVideo()
        btn.innerHTML='play'
    }
})

function playVideo(){
 bg_vid.play()
}
function pauseVideo(){
 bg_vid.pause()
}

playVideo()
