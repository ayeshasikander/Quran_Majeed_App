let audio = document.querySelector(".audioPlayer"),
    surahBox = document.querySelector(".surahs"),
    ayah = document.querySelector(".ayah"),
    play = document.querySelector(".play"),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev");
getSurahs();
allSurahs = document.querySelectorAll(".surahs div")
console.log(allSurahs)
function getSurahs() {
    fetch("https://api.quran.gading.dev/surah")
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            for (let surah in data.data) {
                surahBox.innerHTML += `
       <div>
       <h4>${data.data[surah].name.long}</h4>
       <p>${data.data[surah].name.transliteration.en}</p>
       </div>
      
       `
            }
            let allSurahs = document.querySelectorAll(".surahs div"),
                AyahAudios,
                AyahText;
            allSurahs.forEach((surah, index) => {
                surah.addEventListener("click", () => {
                    fetch(`https://api.quran.gading.dev/surah/${index + 1}`)
                        .then(response => response.json())
                        .then(data => {
                            let verses = data.data.verses;
                            verses.forEach(verse => {
                                console.log(verse.text.arab); 
                            })
                             
                        })
                })
            })
        })
};
