const searchBtn = document.getElementById('submit')
const mealList = document.getElementById('meal')
const mealDetails = document.getElementById('receipe-details')
const closeBtn = document.getElementById('close-btn')
const searchResult= document.getElementById('search-result-title')
const searchInput=document.getElementById('search-input')

function getData(searchValue){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue.value}`)
    .then((resp) => data = resp.json()).then(data => {
        let html = ''
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `<div class="meal" id="${meal.idMeal}">
            <h3 class="meal-name">${meal.strMeal}</h3>
            <img class="meal-img" src="${meal.strMealThumb}" alt="">
            <a href="#" class="receipe-btn btn">Get Reciepe</a>
            </div>`

            });
        }
        else {
            html += 'Result not found'
        }

        mealList.innerHTML = html
        const receipeBtn = mealList.querySelectorAll('.receipe-btn')
        Getreceipe(receipeBtn)
        searchResult.classList.toggle('not-show')

    })
}

searchBtn.addEventListener('click', () => {
    let searchValue = document.getElementById('search-input')
    getData(searchValue)
})

searchInput.addEventListener('keydown',(e)=>{

    let keycode= e.key || e.code
    if(keycode === 'Enter' )
    {
    let searchValue = document.getElementById('search-input')
    getData(searchValue)
    }
    
})


closeBtn.addEventListener('click', () => {
    mealDetails.classList.toggle("show")
    let recipe=mealDetails.querySelectorAll('.meal-details')
    recipe.forEach(Element=> Element.remove())
})

function Getreceipe(obj) {
    obj.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()

            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.target.parentNode.id}`)
                .then(resp => resp.json())
                .then(data => GetDetails(data.meals[0]))
            mealDetails.classList.toggle("show")
        })
    })
}

function GetDetails(meal) {
    const div = document.createElement('div')
    div.classList.add('meal-details')
    div.innerHTML = `          
    
        <h3 class="receipe-title">${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" alt="">
        <div class="receipe-instruction">
            <h3 class="receipe-category">It is a ${meal.strArea} Dish</h3>
            <h3>Instractions:</h3>
            <p>${meal.strInstructions}</p>
        </div>`
    mealDetails.appendChild(div)
    
}


