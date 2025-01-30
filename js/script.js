fetch('data/farms.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Farm data loaded:', data);
        const farmContainer = document.getElementById('farm-container');

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

                data.farms.forEach(farm => {
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
            })
            .catch(error => console.error('Error loading farm card template:', error));
    })
    .catch(error => console.error('Error loading farm data:', error));