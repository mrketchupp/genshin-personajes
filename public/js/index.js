// Contenido HTML
const elemento = null || document.getElementById('elemento');
const cardPj = null || document.getElementById('card-pj');
const listIcons = null || document.getElementById('list-icons')

// Contenido CSS
const colorBgR = null || document.querySelector('.responsive');
const colorBg = null || document.querySelector('.container');

// API a consultar
const API = "https://api.genshin.dev"
const LANG = "?lang=ES"
const options = {method: 'GET', headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}};

// Convertir los datos recibidos a JSON
async function fetchData(urlApi){
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
}

// Recibir un personaje aleatorio
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


// Consunsumo de datos

// Datos de personaje
const viewDataPJ = async (urlApi) => {
    try {
        const characters = await fetchData(`${urlApi}/characters`);

        // personaje.skillTalents.forEach(skills => {
        //     console.group();
        //     console.log(`Nombre: ${skills.name}`);
        //     console.log(`Talento: ${skills.unlock}`);
        //     console.log(`Descripcion: ${skills.description}`);
        //     console.groupEnd();
        // });
        pjQuery(urlApi,characters);

    } catch (error) {
        console.log(error)
    }
}

const pjQuery = async (urlApi,characters) => {
    try {
        // Generamos lista de personajes
        let listCharacters = [];
        listCharacters = Array.from({length: 8}, () => characters[getRandomInt(34)]);
        console.log(listCharacters);

        const personaje = await fetchData(`${urlApi}/characters/${listCharacters[0]}`);
        console.log(`
            Nombre: ${personaje.name}
            Titulo: ${personaje.title}
            Vision: ${personaje.vision}
            Descripcion: ${personaje.description}
            --- Talentos ---
        `)
        templateHTML(urlApi,personaje,listCharacters);
    } catch (error) {
        console.log(error);
    }
}

const templateHTML = async (urlApi,personaje,listCharacters) => {
    // Elemento del personaje
    let vision = personaje.vision
    vision = vision.toLowerCase()

    // Color acorde a la vision
    colorBgR.style.background = `linear-gradient(180deg, var(--${vision}500) 0%, rgba(0, 0, 0) 100%)`;
    colorBg.style.background = `linear-gradient(180deg, var(--${vision}500) 0%, rgba(192, 41, 41, 0) 100%)`;

    // Imagen del elemento
    const elementoImg = `${urlApi}/elements/${vision}/icon`;
    elemento.innerHTML = `<img  class="paimon_image" src="${elementoImg}" alt="">`

    // Iconos de personajes
    listIcons.innerHTML = `
                <figure class="pj_icon pj-main-border">
                    <img src="${urlApi}/characters/${listCharacters[0]}/icon-side" alt="${personaje.name}" class="pj_icon-side pj-main">
                </figure>
                <figure class="pj_icon team-border">
                    <img src="${urlApi}/characters/${listCharacters[1]}/icon-side" alt=" " class="pj_icon-side team">
                </figure>
                <figure class="pj_icon team-border">
                    <img src="${urlApi}/characters/${listCharacters[2]}/icon-side" alt=" " class="pj_icon-side team">
                </figure>
                <figure class="pj_icon team-border">
                    <img src="${urlApi}/characters/${listCharacters[3]}/icon-side" alt=" " class="pj_icon-side team">
                </figure>
                <figure class="pj_icon">
                    <img src="${urlApi}/characters/${listCharacters[4]}/icon-side" alt=" " class="pj_icon-side">
                </figure>
                <figure class="pj_icon">
                    <img src="${urlApi}/characters/${listCharacters[5]}/icon-side" alt=" " class="pj_icon-side">
                </figure>
                <figure class="pj_icon">
                    <img src="${urlApi}/characters/${listCharacters[6]}/icon-side" alt=" " class="pj_icon-side">
                </figure>
                <figure class="pj_icon">
                    <img src="${urlApi}/characters/${listCharacters[7]}/icon-side" alt=" " class="pj_icon-side">
                </figure>
                `;
    // Array de rareza de pj
    const starts = ["⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];
    const rareza = starts.filter(item => item.length == personaje.rarity);
    // Tarjeta de personaje
    cardPj.innerHTML = `
                <figure class="personaje__card">
                        <img src="${urlApi}/characters/${listCharacters[0]}/portrait" alt="${personaje.name} Body" class="personaje__card-img">
                    </figure>
                    <div class="atributos">
                        <h4 class="atributos__titulo">${personaje.name}</h4>
                        <h4 class="atributos__titulo">${rareza[0]}</h4>
                        <h4 class="atributos__titulo">Nivel 90<span class="titulo__sub-contenido">/90</span></h4>
                        <div class="atributos__stats">
                            <div class="atributos__lista">
                                <img src="./svg/IconAttributeHealth.svg" alt="Health" class="atributos__iconos">
                                <img src="./svg/IconAttributeAttack.svg" alt="Attack" class="atributos__iconos">
                                <img src="./svg/IconAttributeDefense.svg" alt="Defense" class="atributos__iconos">
                                <img src="./svg/IconAttributeElementalMastery.svg" alt="Elemental Mastery" class="atributos__iconos">
                                <img src="./svg/IconAttributeStamina.svg" alt="Stamina" class="atributos__iconos">
                            </div>
                            <ul class="atributos__lista">
                                <li class="atributos__info">Max HP</li>
                                <li class="atributos__info">ATK</li>
                                <li class="atributos__info">DEF</li>
                                <li class="atributos__info">Maestria Elemental</li>
                                <li class="atributos__info">Max Estamina</li>
                            </ul>
                            <ul class="atributos__lista">
                                <li class="atributos__valor">20,869</li>
                                <li class="atributos__valor">2,306</li>
                                <li class="atributos__valor">746</li>
                                <li class="atributos__valor">56</li>
                                <li class="atributos__valor">224</li>
                            </ul>
                        </div>
                        <p class="atributos__resumen">
                            ${personaje.description}
                        </p>
                    </div>
                `;
    const colorCard = null || document.querySelector('.atributos');
    colorCard.style.backgroundColor = `var(--${vision}700)`;
}

viewDataPJ(API);
console.log("Mommy Beidou")