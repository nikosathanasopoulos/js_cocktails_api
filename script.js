'use strict';

const btn = document.querySelector('.btn-cocktail');
const cocktailsContainer = document.querySelector('.cocktails');
const cocktailInput = document.querySelector('.cocktail__name__input');
const cocktailName = document.querySelector('.cocktail__name');
const cocktail = document.querySelector('.cocktail');
const cocktailImg = document.querySelector('.cocktail__img');


const btnInput = document.querySelector('.input__btn');

const link = document.getElementById('cocktail-link');
const result = document.getElementById('result');



const renderCountry = function(data, className = ''){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${data.idDrink}`;
    const html = `
           <article class="cocktail ${className}">
          <img class="cocktail__img" src="${data.strDrinkThumb}" />
          <div class="cocktail__data">
            <h3 class="cocktail__name hidden">${data.idDrink}</h3>
            <h2 class="cocktail__region">${data.strDrink}</h2>
            <a href="#" id="cocktail-link">${data.strDrink}</a>
            <div id="result"></div>
          </div>
        </article>
    `;

    cocktailsContainer.insertAdjacentHTML('beforeend', html);
}


const getJSON = function(url, errorMsg = 'Something went wrong.') {
    return fetch(url).then(response => {
        if(!response.ok){
            throw new Error(errorMsg + ': ' + response.status);
        }
        return response.json();
    })
};


// New syntax with async await
const getCocktailFromIngredient = async function(ingredient){

    try{
        let data =  await getJSON(`https://thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`, 'Country not found')
        console.log(data.drinks);
        data.drinks.forEach(drink => {renderCountry(drink);})


        cocktailsContainer.style.opacity = 1;
    }catch(err){alert(err)}

};

btnInput.addEventListener('click', function(e){
    e.preventDefault();
    cocktailsContainer.innerHTML = '';
    getCocktailFromIngredient(cocktailInput.value.toLowerCase());
});


cocktailsContainer.addEventListener('click', function(e) {
    const link = e.target.closest('#cocktail-link');
    if (!link) return;

    e.preventDefault();

    const id = link
          .closest('.cocktail')
          .querySelector('.cocktail__name')
          .textContent
          .trim();

    console.log('Clicked ID:', id);
    getCocktail(id);
});

const getCocktail = async function(id){

    try{
        let data =  await getJSON(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, 'Country not found')
        console.log(data);

        const drink = data.drinks[0];
        console.log(drink);

        // Render the data
        result.innerHTML = `
            <h2>${drink.strDrink}</h2>
            <img src="${drink.strDrinkThumb}" width="200" />
            <p>${drink.strInstructions}</p>
          `;

        for (let i = 1; i <= 15; i++) {
            const ing = drink[`strIngredient${i}`];
            const meas = drink[`strMeasure${i}`];
            if(ing){
                result.innerHTML += `
                <p>${ing} -- ${meas} </p>
                `
            }
        }



    }catch(err){alert(err)}

};


