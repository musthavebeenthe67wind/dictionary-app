const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const icon = document.getElementById("search-icon"); // serach icon
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const input = document.getElementById("input-word");
const clearBtn = document.getElementById("clear-btn");


// functions
function searchWord() {
    let inputWord = document.getElementById("input-word").value;
    fetch(`${url}${inputWord}`)
        .then((response) => response.json())
        .then((data) => {

            let example = "No example available";

            data[0].meanings.forEach((meaning) => {

                meaning.definitions.forEach((definition) => {

                    if (definition.example && example === "No example available") {
                        example = definition.example;
                    }

                });

            });

            result.innerHTML = `
        <div class="word">
                <h2>${inputWord}</h2>
                <button onClick = "playSound()">
                    <i class="bi bi-play-circle"></i>
                </button>
            </div>

            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>

            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>

            <p class="word-example">
               ${example}
            </p>`
            sound.setAttribute("src", `${data[0].phonetics[0].audio}`);

            result.classList.add("show");

        })
        .catch(() => {
            result.classList.add("show");
            result.innerHTML = `<h3 class = "error" >Word not found</h3>`
        })

}

function playSound() {
    sound.play();
}

function clearInput() {

    document.getElementById("input-word").value = "";

    result.classList.remove("show");

    sound.pause();
    sound.currentTime = 0;

}

// event listeners

icon.addEventListener("click", () => {
    searchWord();
    icon.classList.add('pop');
    setTimeout(() => {
        icon.classList.remove('pop')
    }, 100);
});

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchWord()
    }
})

clearBtn.addEventListener("click", clearInput);







