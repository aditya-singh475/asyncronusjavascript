let input1 = document.querySelector("#searchInput");
let search_but = document.querySelector("#but");
let loading = document.querySelector("#loading");

let foodContainer = document.querySelector(".food-container");

let foods = [];

search_but.addEventListener("click", () => {

    loading.style.display = "block";

    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(input1.value)}`;

    fetch(url)
        .then((item) => {
            return item.json();
        })
        .then((value) => {

            console.log(value);

            // Clear old data
            foods = [];

            // Clear old cards
            foodContainer.innerHTML = "";

            // If no food found
            if (value.meals === null) {
                loading.innerText = "No food found";
                return;
            }

            for (let i = 0; i < value.meals.length; i++) {

                const meal = value.meals[i];

                let ingredients = [];
                let measurements = [];

                // Add ingredients and measurements
                for (let j = 1; j <= 20; j++) {

                    let ingredient = meal[`strIngredient${j}`];
                    let measurement = meal[`strMeasure${j}`];

                    if (ingredient && ingredient.trim() !== "") {

                        ingredients.push(ingredient);
                        measurements.push(measurement);
                    }
                }

                const food = {

                    id: meal.idMeal,

                    name: meal.strMeal,

                    category: meal.strCategory,

                    location: meal.strArea,

                    country: meal.strCountry,

                    image: meal.strMealThumb,

                    ingredients: ingredients,

                    measurements: measurements,

                    instructions: meal.strInstructions,

                    youtube: meal.strYoutube,

                    source: meal.strSource
                };

                foods.push(food);
            }

            display();

            loading.style.display = "none";
        })
        .catch((error) => {

            console.log(error);

            loading.innerText = "Something went wrong";

        });
});


// Display all foods
function display() {

    foods.forEach((value) => {

        // FIXED: createSmallCard
        createSmallCard(value);

    });
}


// Create Small Card
function createSmallCard(food) {

    let card = document.createElement("div");
    card.classList.add("food-card");

    let image = document.createElement("img");
    image.src = food.image;
    image.alt = food.name;

    let info = document.createElement("div");
    info.classList.add("food-info");

    let name = document.createElement("h2");
    name.innerText = food.name;

    let location = document.createElement("p");
    location.classList.add("location");
    location.innerText = "🌎 " + food.location;

    let category = document.createElement("p");
    category.classList.add("category");
    category.innerText = "Category: " + food.category;

    let description = document.createElement("p");
    description.classList.add("short-description");

    description.innerText =
        food.instructions.substring(0, 100) + "...";

    let button = document.createElement("button");
    button.innerText = "View Details";

    info.appendChild(name);
    info.appendChild(location);
    info.appendChild(category);
    info.appendChild(description);
    info.appendChild(button);

    card.appendChild(image);
    card.appendChild(info);

    // Click card
    card.addEventListener("click", function () {

        createBigCard(food);

    });

    foodContainer.appendChild(card);
}


// Create Big Card / Popup
function createBigCard(food) {

    let popup = document.createElement("div");
    popup.classList.add("food-popup");

    let popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    // Close button
    let close = document.createElement("span");
    close.classList.add("close");
    close.innerText = "×";

    close.addEventListener("click", function () {

        popup.remove();

    });


    // Food image
    let image = document.createElement("img");
    image.src = food.image;
    image.alt = food.name;


    // Information
    let info = document.createElement("div");
    info.classList.add("popup-info");


    // Name
    let name = document.createElement("h2");
    name.innerText = food.name;


    // Category
    let category = document.createElement("p");
    category.innerHTML =
        "<strong>Category:</strong> " + food.category;


    // Location
    let location = document.createElement("p");
    location.innerHTML =
        "<strong>Area:</strong> " + food.location;


    // Country
    let country = document.createElement("p");
    country.innerHTML =
        "<strong>Country:</strong> " + food.country;


    // Ingredients heading
    let ingredientHeading = document.createElement("h3");
    ingredientHeading.innerText = "Ingredients";


    // Ingredients list
    let ingredientList = document.createElement("ul");

    for (let i = 0; i < food.ingredients.length; i++) {

        let ingredient = document.createElement("li");

        ingredient.innerText =
            food.ingredients[i] + " - " + food.measurements[i];

        ingredientList.appendChild(ingredient);
    }


    // Instructions heading
    let instructionHeading = document.createElement("h3");
    instructionHeading.innerText = "Instructions";


    // Instructions
    let instructions = document.createElement("p");
    instructions.innerText = food.instructions;


    // YouTube
    let youtube = document.createElement("a");

    youtube.innerText = "Watch Recipe Video";
    youtube.href = food.youtube;
    youtube.target = "_blank";


    // Order button
    let orderButton = document.createElement("button");

    orderButton.classList.add("order-btn");
    orderButton.innerText = "Order Now";


    // Add everything
    info.appendChild(name);
    info.appendChild(category);
    info.appendChild(location);
    info.appendChild(country);

    info.appendChild(ingredientHeading);
    info.appendChild(ingredientList);

    info.appendChild(instructionHeading);
    info.appendChild(instructions);

    info.appendChild(youtube);
    info.appendChild(orderButton);


    popupContent.appendChild(close);
    popupContent.appendChild(image);
    popupContent.appendChild(info);

    popup.appendChild(popupContent);

    document.body.appendChild(popup);


    // Show popup
    popup.style.display = "flex";
}