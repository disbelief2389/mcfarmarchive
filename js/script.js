document.addEventListener('DOMContentLoaded', () => {
    const farmContainer = document.getElementById('farm-container');
    const searchBar = document.getElementById('search-bar');

    if (farmContainer && searchBar) {
        fetch('data/farms.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Farm data loaded:', data);

                fetch('assets/templates/farm-card.html')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        return response.text();
                    })
                    .then(templateText => {
                        console.log('Template loaded:', templateText);
                        const template = document.createElement('div');
                        template.innerHTML = templateText.trim();
                        console.log('Parsed template:', template);

                        const farms = data.farms;
                        displayFarms(farms, template);

                        searchBar.addEventListener('input', () => {
                            const query = searchBar.value.toLowerCase();
                            const filteredFarms = farms.filter(farm => {
                                return farm.title.toLowerCase().includes(query) ||
                                       farm.description.toLowerCase().includes(query) ||
                                       farm.tags.some(tag => tag.toLowerCase().includes(query));
                            });
                            displayFarms(filteredFarms, template);
                        });
                    })
                    .catch(error => console.error('Error loading farm card template:', error));
            })
            .catch(error => console.error('Error loading farm data:', error));
    }
});

function displayFarms(farms, template) {
    const farmContainer = document.getElementById('farm-container');
    farmContainer.innerHTML = '';

    farms.forEach(farm => {
        const farmCard = template.querySelector('#farm-card-template').content.cloneNode(true);
        console.log('Farm card:', farmCard);

        const farmImage = farmCard.querySelector('.farm-image');
        const farmTitle = farmCard.querySelector('.farm-title');
        const farmDescription = farmCard.querySelector('.farm-description');
        const farmLink = farmCard.querySelector('.farm-link');

        if (!farmImage || !farmTitle || !farmDescription || !farmLink) {
            console.error('Template elements not found');
            return;
        }

        // Construct the correct image path
        farmImage.src = farm.images[0];
        farmImage.alt = farm.title;
        farmTitle.textContent = farm.title;
        farmDescription.textContent = farm.description;
        farmLink.href = farm.download;

        farmContainer.appendChild(farmCard);
    });
}