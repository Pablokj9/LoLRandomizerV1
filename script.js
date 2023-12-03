let campeones = [];
let lista = document.querySelector('.lista');
let boton = document.querySelector('.boton');
let reroll = document.querySelector('.reroll');

boton.addEventListener('click', () => {
    lista.style.display="none";
    initApp();
});

reroll.addEventListener('click', () => {
    reroll.innerHTML=`Reroll team (${reroll.id}) `;
    reroll.id=reroll.id-1;
    lista.style.display="none";
    reroll.style.display="none";
    
    initApp();
});

function getRandomUniqueNumbers(max, count) {
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < count) {
        uniqueNumbers.add(Math.floor(Math.random() * max));
    }
    return Array.from(uniqueNumbers);
}

// function getRandomUniqueNumbersR() {
//     const uniqueNumbers = new Set();
//     while (uniqueNumbers.size < 5) {
//         uniqueNumbers.add(Math.floor(Math.random() * 17));
//     }
//     return Array.from(uniqueNumbers);
// }

function getRandomNumbers() {
    const numbers = [];
    for (let i = 0; i < 5; i++) {
        const num = Math.floor(Math.random() *17);
        numbers.push(num);
    }
    return numbers;
}

function initApp() {
    const array = getRandomUniqueNumbers(165, 5);
    const array2 = getRandomNumbers();
    fetch('champion.json')
        .then(response => response.json())
        .then(data => {
            campeones = Object.values(data.data);
            lista.innerHTML = '';
            fetch('runes.json')
                .then(response => response.json())
                .then(data => {
                    let runes = data;

                    const lineNames = ["Top", "Jungla", "Mid", "Adc", "Supp"];

                    array.forEach((num, i) => {
                        console.log(num, i);
                        const linea = lineNames[i];
                        const champ = campeones[num];
                        const runas = runes[array2[i]];

                        const newchamp = document.createElement('div');
                        newchamp.classList.add('champ');
                        newchamp.style.background = ["lightred", "darkgreen", "darkcyan", "purple", "orange"][i];
                        newchamp.innerHTML = `
                            <div class="linea">${linea}</div>
                            <div class="nombre">${champ.name}</div>
                            <img class="splash" src="tiles/${champ.id}_0.jpg">
                            <div class="runas">
                                <div class="runaname">${runas.name}</div>
                                <img src="Runes/${runas.id}.png" alt="">
                            </div>
                        `;
                        boton.style.display="none";
                        
                        setTimeout(function() {
                            lista.appendChild(newchamp);
                            lista.style.display="block";
                        }, (i+1)*1000);
                        setTimeout(function() {
                            if(reroll.id>0){
                                reroll.innerHTML=`Reroll team (${reroll.id}) `
                            reroll.style.display="block";}
                        }, 5500);
                        // lista.appendChild(newchamp);
                    });
                })
                .catch(error => console.error('Error fetching runes data:', error));
        })
        .catch(error => console.error('Error fetching champion data:', error));
}
