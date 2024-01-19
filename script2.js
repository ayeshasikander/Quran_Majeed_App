let surahBox = document.querySelector(".surahs")

getSurahs();
allSurahs = document.querySelectorAll(".surahs div")

function getSurahs() {
    fetch("https://api.quran.gading.dev/surah")
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            for (let index in data.data) {
                let surahIndex=parseInt(index)+1;
                surahBox.innerHTML += `
                  <div data-surah-index="${surahIndex}">
                    <h4>${data.data[index].name.long}</h4>
                    <p>${data.data[index].name.transliteration.en}</p>
                  </div>
                `;
            }

            let allSurahs = document.querySelectorAll(".surahs div");
            allSurahs.forEach((surah) => {
                surah.addEventListener("click", () => {
                    let surahIndex = surah.getAttribute("data-surah-index");
                    window.location.href = `Surah.html?surahIndex=${surahIndex}`;
                });
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
};
