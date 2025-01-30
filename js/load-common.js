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
            if (elementId === 'navbar') {
                updateNavbarLinks();
            }
        })
        .catch(error => console.error('Error loading HTML:', error));
}

function updateNavbarLinks() {
    const links = document.querySelectorAll('#navbar a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('/')) {
            link.setAttribute('href', window.location.origin + href);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('navbar', 'navbar.html');
    loadHTML('header', 'header.html');
    loadHTML('footer', 'footer.html');
    loadHTML('background', 'background.html');
});