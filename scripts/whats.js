function toggleChatBox() {
  var chatBox = document.getElementById('chatBox');
  chatBox.classList.toggle('chat-box-show');
}

document.getElementById('toggleButton').addEventListener('click', toggleChatBox);

document.getElementById('closeButton').addEventListener('click', function() {
  document.getElementById('chatBox').classList.remove('chat-box-show');
});

setTimeout(function() {
  document.getElementById('chatBox').classList.add('show');
}, 3000);