const messageInput = document.getElementById("message-input");
const chatContainer = document.getElementById("chat");
const dialog = document.getElementById("d");
const color_picker = document.getElementById('color_picker');
const check_box = document.getElementById('check_box');
var container = document.querySelector('.container');

const storedColor = localStorage.getItem('chatBackgroundColor');
if (storedColor) {
    document.body.style.backgroundColor = storedColor;
} else {
    document.body.style.backgroundColor = '#ffff';
}

messageInput.addEventListener("input", function() {
    this.style.width = (this.value.length + 1) * 6 + "px";
});

document.body.addEventListener("keypress", function(event) {
    if(/[a-zA-Z]/.test(event.key)) {
        const storedColor = localStorage.getItem('chatBackgroundColor');
        messageInput.classList.remove('hidden')
        messageInput.focus();
        messageInput.style.backgroundColor = storedColor
    }
})

color_picker.addEventListener('input', (event) =>{
    const selectedColor = event.target.value;
    localStorage.setItem('chatBackgroundColor', selectedColor)
})


check_box.addEventListener('change', function() {
    var checkboxValue = check_box.checked ? 'on' : 'off';
    if(checkboxValue == 'on'){
        container.style.right = '0';
    }else{
        container.style.right = null;
    }
});



document.body.addEventListener("keypress", function(event) {
    if(event.key === "1"){
        const storedColor = localStorage.getItem('chatBackgroundColor');
        color_picker.value = storedColor
        dialog.showModal();
    }
})

document.body.addEventListener("keydown", function(event) {
    if(event.key === "Escape"){
        messageInput.classList.add('hidden')
    }
})

messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const messageText = messageInput.value.trim();
        messageInput.classList.add('hidden')

        if (messageText !== "") {
            const storedColor = localStorage.getItem('chatBackgroundColor');
            const chatBubble = document.createElement("div");
            chatBubble.classList.add("chat-bubble");
            chatBubble.textContent = messageText;
            chatContainer.appendChild(chatBubble);

            const selectedColor = storedColor;
            chatBubble.style.backgroundColor = selectedColor;
            messageInput.value = "";

            setTimeout(() => {
                chatBubble.classList.remove("chat-bubble");
                chatBubble.classList.add("chat-posted");

                chatBubble.style.backgroundColor = selectedColor;
                setTimeout(() => {
                    chatBubble.remove();
                }, 3000);
            }, 8000);
        }
    }
});

function resetValue(){
    container.style.right = null;
    const value = localStorage.setItem('chatBackgroundColor', '#ffffff')
    check_box.checked = false
}


// function clearLocalStorage(){
//     localStorage.clear();
// }

// window.addEventListener('beforeunload', clearLocalStorage);
