function loadHTML(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
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
        console.log(`Original href: ${href}`);
        if (href.startsWith('/')) {
            const newHref = window.location.origin + href;
            link.setAttribute('href', newHref);
            console.log(`Updated href: ${newHref}`);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('navbar', 'navbar.html');
    loadHTML('header', 'header.html');
    loadHTML('footer', 'footer.html');
    loadHTML('background', 'background.html');
});