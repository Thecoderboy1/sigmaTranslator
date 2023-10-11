const changeLanguage = document.getElementById("changeLang");


function showTranslation(translationText) {
    const Answer = document.getElementById("answer");

    Answer.readOnly = false;
    Answer.value = translationText;
    Answer.readOnly = true;
}
function shoChangLangDiv() {
    const langName = document.getElementById('Langname')
    const Answer = document.getElementById("answer");
    Answer.readOnly = true;
    const userInput = document.getElementById("usersInput");


    const loadingSpinnerDiv = document.getElementById("loadingSpinnerDiv");
    const changeLanguage = document.getElementById("Langname");
    const languagesDiv = document.getElementById("languagesDiv");
    const LanguageButton = document.querySelectorAll(".lang");
    const translateLang = document.getElementById("language")


    languagesDiv.style.display = "block"

    languagesDiv.classList.remove('pop-up')
    LanguageButton.forEach(button => {
        button.addEventListener('click', () => {
            const usersLang = button.value;
            translateLang.innerText = button.innerText;
            changeLanguage.innerText = button.innerText;
            setTimeout(() => {
                languagesDiv.style.display = 'none';

            }, 300);
            languagesDiv.classList.remove('unpop-up')

            document.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    if (userInput.value === '') {
                        Answer.readOnly = false;
                        Answer.value = "Please Write somethings"
                        Answer.readOnly = true;
                    } else {

                        loadingSpinnerDiv.style.display = 'flex';

                        const url = 'https://long-translator.p.rapidapi.com/translate';
                        const options = {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/x-www-form-urlencoded',
                                'X-RapidAPI-Key': 'efa18da300msh676d25e7ba56b6bp1273a5jsnf204141eee70',
                                'X-RapidAPI-Host': 'long-translator.p.rapidapi.com'
                            },
                            body: new URLSearchParams({
                                source_language: 'auto',
                                target_language: usersLang,
                                text: userInput.value
                            })
                        };
                        async function fetchDataWithAPI() {
                            try {
                                const response = await fetch(url, options);
                                const result = await response.json();
                                console.log(result);
                                showTranslation(result.data.translatedText);
                                loadingSpinnerDiv.style.display = 'none';

                            } catch (error) {
                                console.error(error);
                            }
                        }
                        fetchDataWithAPI();
                    }
                }
            });
        });
    });

}
shoChangLangDiv();



changeLanguage.addEventListener('click', () => {
    shoChangLangDiv()
})
