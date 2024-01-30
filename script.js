const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatBox = document.querySelector('.chatbox');
const chatbotToggler = document.querySelector('.chatbot-toggler');
let userMessage;
const API_KEY = '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'
function generateResponse(){
    const API_URL = 'https://api.openai.com/v1/chat/completions'
    const requestOptions ={
        method:'POST',
        headers:{
            "Content-Type":'application/json',
            "Authorization":`Bearer ${API_KEY}`
        },
        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }
    fetch(API_URL,requestOptions).then(res=>res.JSON).then(data=>{
        console.log(data)
    }).catch(err=>console.log("Error: " ,err))
}
function createChatLi(msg,className){
    const chatElement = document.createElement('li')
    chatElement.classList.add('chat', className)
    let chatContent = className === 'outgoing' ? `<p>${msg}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${msg}</p>`
    chatElement.innerHTML = chatContent
    return chatElement
}
function chatHandler(){
    userMessage = chatInput.value
    if(!userMessage)return
    chatBox.appendChild(createChatLi(userMessage,'outgoing'))
    setTimeout(()=>{
        chatBox.appendChild(createChatLi('Thinking...','incoming'))   
        generateResponse()
    },500)
}
sendChatBtn.addEventListener('click',chatHandler)
chatbotToggler.addEventListener('click',()=>document.body.classList.toggle('show-chatbot'))