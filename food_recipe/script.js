
let foodcont = document.querySelector(".foodrecipe");

async function getrecipe(){
    // fetching recipe from the api
    document.querySelector(".heading").innerHTML = "Fetching Recipe......."
    let inputval = document.getElementById("searchrecipe").value;
    let foodrecipe = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputval}`);
    document.querySelector(".heading").innerHTML = " ";

    let response = await foodrecipe.json();
    if(response.meals == null){
        document.querySelector(".heading").innerHTML = "No Recipe Found";
    }
    else{
        foodcont.innerHTML = ''; // Clear previous results
        response.meals.forEach(element => {
            let foodinfo = document.createElement('div');
            foodinfo.classList.add('foodinfo');

            foodinfo.innerHTML = `
                <img src="${element.strMealThumb}" alt="" srcset="">
                <h3>${element.strMeal}</h3>
                <p>${element.strCategory}, ${element.strArea}</p>
            `;

            foodcont.appendChild(foodinfo);

            // Add click event listener to the newly created container
            foodinfo.addEventListener("click", () => {
                getingredients(element);
            });
        });
   }
}

function getingredients(meal){
    let ingredientsContainer = document.querySelector("#ingredients");
    let ingredientslist = ingredientsContainer.querySelector("ul");
    let title = document.querySelector(".head");
   
    // Clear previous ingredients
    ingredientslist.innerHTML = '';
    title.innerHTML = meal.strMeal;

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] === "" || meal[`strMeasure${i}`] === "") {
            break;
        } else {
            ingredientslist.innerHTML += `<li>${meal[`strIngredient${i}`]} ${meal[`strMeasure${i}`]}</li>`;
        }
    }

    ingredientsContainer.style.display = "block";
}


function events(){
    // toggling search bar 
    document.getElementById("search").addEventListener("click", (event) => {
        let searchButton = document.getElementById("search");
        if (searchButton.src.includes("search.svg")) {
            foodcont.innerHTML = " ";
            getrecipe();
            searchButton.src = "cross.svg";
        } else if (searchButton.src.includes("cross.svg")) {
            document.getElementById("searchrecipe").value = '';
            document.querySelector("#ingredients").style.display = "none";
            searchButton.src = "search.svg"; // Reset to the original search icon

        }
    });

    document.querySelector(".cancel").addEventListener("click", (Event)=>{
        document.querySelector("#ingredients").style.display = "none";
    });
}

events();