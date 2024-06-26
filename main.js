const searchRecipeEl = document.querySelector("#search"); // Corregido para usar el selector correcto
const formEl = document.getElementById("search");
const btnSearchEl = document.getElementById("btn-search");
const resultsEl = document.querySelector(".results"); // Corregido para usar el selector correcto

let page = 1;

const { VITE_API_URL: apiUrl, VITE_API_KEY: apiKey } = import.meta.env;

async function searchRecipes() {
    const inputData = searchRecipeEl.value || ""; 
    const url = `${apiUrl}?query=${inputData}&number=6&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No recipe found');
        }
        const data = await response.json();
        console.log(data);
        const { results } = data;

        if (page === 1) {
            resultsEl.innerHTML = "";
        }

        results.forEach((result) => {
            const resultsCard = document.createElement("div");
            resultsCard.classList.add("results-card"); // Cambiado a 'result' para individualizar cada tarjeta

            const image = document.createElement("img");
            image.src = result.image;
            image.alt = result.title;

            const title = document.createElement("a");
            title.textContent = result.title;
            title.href = "#";

            resultsCard.appendChild(image);
            resultsCard.appendChild(title);
            resultsEl.appendChild(resultsCard);
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        window.alert('Failed to fetch recipes. Please try again later.');
    }
}

btnSearchEl.addEventListener('click', (event) => {
    event.preventDefault(); 
    searchRecipes();
});

