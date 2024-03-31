const countriesElem = document.querySelector('.countries');
const drop_icon = document.querySelector('.drop_icon'); // dropdown icon
const drop_down = document.querySelector('.drop');
const region = document.querySelectorAll('.region');
const search = document.querySelector('.search');

const toggle = document.querySelector('.toggle');
const mode = document.querySelector('.mode');

async function getCountry(){
    //fetching data from URL using fetch function call, await is written to pause the the further
    //execution of code written in getCountry()until the promise returned from fetch function
    // is resolved.

    //Note: the execution of code outside getCountry() is not paused.. this is what we mean from
    //asynchronous.
    const url =await fetch('https://restcountries.com/v3.1/all'); 

    //the JSON data stored in url is parsed
    const res = await url.json();

    //printing the parsed json data to console for debugging purpose
    console.log(res);

    res.sort((a, b) => a.name.common.toLowerCase() > b.name.common.toLowerCase() ? 1 : -1);
    res.forEach(element => {
        showCountry(element);
    });
   
}
getCountry();

// FETCHING DATA FROM API
function showCountry(data){
    const country = document.createElement('div');
    country.classList.add('country');
    country.innerHTML= `<div class="country_image">
    <img src="${data.flags.png}" alt="error">
    </div>

    <div class="country_info">
    <h4 class="countryName">${data.name.common}</h4>
    <p><strong>Population:</strong>${data.population.toLocaleString('en-IN')}</p>
    <p class="regionName"><strong>Region:</strong>${data.region}</p>
    <p><strong>Capital:</strong>${data.capital}</p>
    </div>`;
    
    countriesElem.appendChild(country);
    country.addEventListener('click', () => {
        showCountryDetails(data);
    })
}

// SHOWING DROP-DOWN LIST
drop_icon.addEventListener('click',() => {
    drop_down.classList.toggle('drop');
})

// FILTERING THE COUNTRIES BY REGION NAME
const regionName = document.getElementsByClassName('regionName');
region.forEach(element => {
    element.addEventListener('click', () => {
        // console.log(element.innerText);
        Array.from(regionName).forEach(elem => {
            console.log(elem.innerText);

            if(elem.innerText.includes(element.innerText) || element.innerText == 'All')
            {
                elem.parentElement.parentElement.style.display = "grid";
            }
            else
            {
                elem.parentElement.parentElement.style.display = "none";
            }
        })
    })
})

const countryName = document.getElementsByClassName('countryName');
search.addEventListener('input', () => {
    Array.from(countryName).forEach(elem => {
        if(elem.innerText.toLowerCase().includes(search.value.toLowerCase()))
        {
            elem.parentElement.parentElement.style.display = "grid";
        }
        else
        {
            elem.parentElement.parentElement.style.display = "none";
        }
    })
})

// FOR SWITCHING TO DARK MODE
toggle.addEventListener('click',() => {
    document.body.classList.toggle('dark');
    mode.classList.toggle('fas');
    // mode.style.color = 'white';
})

const back = document.querySelector('.back');
const countryModal = document.querySelector('.countryModal');
back.addEventListener('click', () => {
    countryModal.classList.toggle('show');
})

function showCountryDetails(data) {
    countryModal.classList.toggle('show');

    let borderCountries = [];
    let borderButtons = [];

    if(data.borders.length)
    {
        for(i = 0; i < data.borders.length; i++) {
            borderCountries.push(data.borders[i]);
        }
        borderButtons = borderCountries.map(country => {
            return `<button class="borderButton">${country}</button>`;
        }).join('');
    }
   
   
    let native = '';
    if(data.name.nativeName)
    {
        native = Object.values(data.name.nativeName)[0].common;
    }

    let currencyName = '';
    for (const currencyCode in data.currencies) {
        currencyName = data.currencies[currencyCode].name;
        break;
    }
    // Convert array of languages to a comma-separated string
    const languages = Object.values(data.languages).join(', ');

 

    countryModal.innerHTML = `<button class="back"><i class="fa-solid fa-arrow-left"></i>   Back</button>
    <div class="modal">
        <div class="leftModal">
            <img src="${data.flags.png}" alt="error">
        </div>
        <div class="rightModal">
            <h1>${data.name.common}</h1>
            <div class="modalInfo">
                <div class="innerLeftinner inner">
                    <p><strong>Native Name: </strong>${native}</p>
                    <p><strong>Population: </strong>${data.population.toLocaleString('en-IN')}</p>
                    <p><strong>Region: </strong>${data.region}</p>
                    <p><strong>Sub-region: </strong>${data.subregion}</p>
                </div>
                <div class="innerRight inner">
                    <p><strong>Capital: </strong>${data.capital}</p>
                    <p><strong>Top Level Domain: </strong>${data.tld}</p>
                    <p><strong>Currencies: </strong>${currencyName}</p>
                    <p><strong>Languages: </strong>${languages}</p>
                </div>
            </div>
            <div class="border">
                <p><strong>Border Countries:</strong></p>
                <div class="borderButtons">${borderButtons}</div>
            </div>
        </div>
    </div>`;

    const back = countryModal.querySelector('.back');

    back.addEventListener('click', () => {
        countryModal.classList.toggle('show');
    });
}



// function showCountryDetails(data) {
//     countryModal.classList.toggle('show');

//     let borderCountries = [];
//     for(i = 0; i < data.borders.length; i++)
//     {
//         borderCountries.push(data.borders[i]);
//     }
//     let currencyName = '';
//     for (const currencyCode in data.currencies) {
//         currencyName = data.currencies[currencyCode].name;
//         break;
//     }
//     // Convert array of languages to a comma-separated string
//     const languages = Object.values(data.languages).join(', ');

//     countryModal.innerHTML = `<button class="back">Back</button>
//     <div class="modal">
//         <div class="leftModal">
//             <img src="${data.flags.png}" alt="error">
//         </div>
//         <div class="rightModal">
//             <h1>${data.name.common}</h1>
//             <div class="modalInfo">
//                 <div class="innerLeftinner inner">
//                     <p><strong>Native Name: </strong>${data.name.official}</p>
//                     <p><strong>Population: </strong>${data.population}</p>
//                     <p><strong>Region: </strong>${data.region}</p>
//                     <p><strong>Sub-region: </strong>${data.subregion}</p>
//                 </div>
//                 <div class="innerRight inner">
//                     <p><strong>Capital: </strong>${data.capital}</p>
//                     <p><strong>Top Level Domain: </strong>${data.tld}</p>
//                     <p><strong>Currencies: </strong>${currencyName}</p>
//                     <p><strong>Languages: </strong>${languages}</p>
//                 </div>

//             </div>
//             <div class="border">
//                 <p><strong>Border Countries:</strong>${borderCountries}</p>
//             </div>
//         </div>
//     </div>`;

//     const back = countryModal.querySelector('.back');

//     back.addEventListener('click', () => {
//         countryModal.classList.toggle('show');
//     });
// }
