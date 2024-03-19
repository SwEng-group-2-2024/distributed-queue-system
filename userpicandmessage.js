// send message like this :
//let message = {
    //text: 'Hello, world!',
    //user: {
      //id: 1,
      //name: 'User Name',
      //avatarUrl: 'http://example.com/path/to/avatar.jpg'
    //}
  //};
  
  // 
  function renderMessage(message) {
    let messageElement = document.createElement('div');
    let avatarElement = document.createElement('img'); 
    avatarElement.src = message.user.avatarUrl;
  
    
    if (message.user.id === CURRENT_USER_ID) {
      // if message is from the user set 
      messageElement.classList.add('message', 'current-user');
      messageElement.innerHTML = `<div class="text">${message.text}</div>`;
      messageElement.appendChild(avatarElement);
    } else {
      // if is not ....
      messageElement.classList.add('message');
      messageElement.appendChild(avatarElement);
      messageElement.innerHTML += `<div class="text">${message.text}</div>`;
    }
  
    return messageElement;
  }