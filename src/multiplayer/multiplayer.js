const socket = new WebSocket('some::/Server');

socket.onopen = () => {
    alert('Соединение установлено.');
};

socket.onclose = (event) => {
    if (event.wasClean) {
        alert('Соединение закрыто чисто');
    } else {
        alert('Обрыв соединения'); // например, "убит" процесс сервера
    }
    alert('Code: ' + event.code + ' Why: ' + event.reason);
};

socket.onmessage = (event) => {
    alert('Получены данные ' + event.data);
};

socket.onerror = function(error) {
    alert('Ошибка ' + error.message);
};

