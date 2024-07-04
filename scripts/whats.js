function toggleChatBox() {
  var chatBox = document.getElementById('chatBox');
  chatBox.classList.toggle('chat-box-show');
}

function closeChatBox() {
  console.log('closeChatBox')
  var chatBox = document.getElementById('chatBox');
  chatBox.classList.remove('chat-box-show');
}

document.getElementById('toggleButton').addEventListener('click', toggleChatBox);
document.getElementById('closeButton').addEventListener('click', closeChatBox);

setTimeout(function() {
  document.getElementById('chatBox').classList.add('show');
}, 3000);