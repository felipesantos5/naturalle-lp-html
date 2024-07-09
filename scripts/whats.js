function toggleChatBox() {
  var chatBox = document.getElementById('chatBox');
  chatBox.classList.toggle('chat-box-show');
}

function closeChatBox() {
  var chatBox = document.getElementById('chatBox');
  chatBox.classList.remove('chat-box-show');
}

document.getElementById('toggleButton').addEventListener('click', toggleChatBox);
document.getElementById('closeButtonWhats').addEventListener('click', closeChatBox);

setTimeout(function() {
  document.getElementById('chatBox').classList.add('chat-box-show');
}, 5000);
