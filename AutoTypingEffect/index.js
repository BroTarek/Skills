const containerEl = document.querySelector('.container')
const careers=['Instructor','Web Developer','FreeLancer']

let index=0
let currentIndex=0
const vowels=['i','a','e','o','u']
setInterval(()=>{
    containerEl.innerHTML=`I Am ${vowels.some(v=>careers[index].toLocaleLowerCase().startsWith(v))?'an':'a'} ${careers[index].slice(0,currentIndex)}`
    currentIndex++
    if(currentIndex>careers[index].length){
        index=index>=careers.length-1?0:index+1
        currentIndex=0
    }
},400)