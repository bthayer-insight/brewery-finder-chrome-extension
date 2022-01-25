if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(findBreweries, currentPositionFailure);
}
else {
    alert("Sorry, your browser does not support geolocation services.");
}

function findBreweries(position) {
    fetch(`https://api.openbrewerydb.org/breweries?by_dist=${position.coords.latitude},${position.coords.longitude}`)
        .then(response => response.json())
        .then(breweries => {
            if (breweries.length && breweries.length > 0) {
                const listContainer = document.getElementById("brewery-list-container");                

                breweries.forEach(brewery => {
                    const breweryItem = document.createElement("div");
                    breweryItem.innerHTML = `
                    <h3>${brewery.name}</h3>
                    ${brewery.street}<br>
                    ${brewery.city}, ${brewery.state} ${brewery.postal_code.split('-')[0]}
                    <p>${brewery.phone}</p>
                    <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a>
                    <br><br>
                    <hr/>
                    `;

                    listContainer.appendChild(breweryItem);
                });
            } else {
                alert("Sorry, no breweries were found near you.");
            }
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred while retrieving the list of breweries.");
        });
}

function currentPositionFailure() {
    alert("An error occurred while retrieving your current position.");
}