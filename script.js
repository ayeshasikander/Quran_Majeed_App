let audio = document.querySelector(".audioPlayer"),
    surahBox = document.querySelector(".surahs"),
    ayah = document.querySelector(".ayah"),
    play = document.querySelector(".play"),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev");

getSurahs();
allSurahs = document.querySelectorAll(".surahs div")
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
                            AyahAudios = [];
                            AyahText = [];
                            verses.forEach(verse => {
                                AyahAudios.push(verse.audio.primary);
                                AyahText.push(verse.text.arab);
                            })
                            let ayahIndex = 0;
                            updateAyah(ayahIndex);
                            audio.addEventListener("ended", () => {
                                ayahIndex++;
                                if (ayahIndex < AyahAudios.length) {
                                    updateAyah(ayahIndex);
                                } else {
                                    ayahIndex = 0;
                                    updateAyah(ayahIndex);
                                    Swal.fire({
                                        icon: "success",
                                        title: "Sadaqallahul Azim – ﺻﺪﻕ ﺍﻟﻠﻪ ﺍﻟﻌﻈﻴﻢ",
                                        showConfirmButton: true,
                                        timer: 1500
                                    });
                                    isplay = false;
                                    playpause();

                                }
                            })

                            next.addEventListener("click", () => {

                                ayahIndex < AyahAudios.length - 1 ? ayahIndex++ : ayahIndex = 0;
                                updateAyah(ayahIndex);
                            });
                            prev.addEventListener("click", () => {
                                ayahIndex == 0 ? ayahIndex = AyahAudios.length - 1 : ayahIndex--;
                                updateAyah(ayahIndex);

                            });
                            let isplay = false;
                            playpause();

                            function playpause() {
                                if (isplay) {
                                    audio.pause();
                                    play.innerHTML = '<i class="bi bi-play-fill"></i>';
                                    isplay = false;
                                } else {
                                    audio.play().catch((error) => {
                                        console.error("Error playing audio:", error);
                                    });
                                    play.innerHTML = '<i class="bi bi-pause-fill"></i>';
                                    isplay = true;
                                }
                            }
                            play.addEventListener("click", playpause);


                            function updateAyah(index) {
                                audio.src = AyahAudios[index];
                                ayah.innerHTML = AyahText[index];
                                return audio.play().catch((error) => {
                                    console.error("Error playing audio:", error);
                                });
                            }
                        
                        })
                })
            })
        })
};
