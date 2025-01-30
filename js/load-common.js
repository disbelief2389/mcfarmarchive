function loadHTML(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('navbar', '/mcfarmarchive/navbar.html');
    loadHTML('header', '/mcfarmarchive/header.html');
    loadHTML('footer', '/mcfarmarchive/footer.html');
    loadHTML('background', '/mcfarmarchive/background.html');
});