
$(() => {
    const NO_OF_TILES = 36;
    const NO_OF_CORRECT_TILES = 14;
    const NO_OF_ATTEMPTS = 5;
    const TimeToShowTiles = 4000; //4 sec
    let arrOfCorrectTiles = [];

    let counterCorrect = 1;
    let counterWrong = 1;
    let timeInterval;

    function toMakeAllTilesGrey() {
        $('.div').css({ "background-color": "rgb(102, 101, 101)", "pointer-events": "auto", "cursor": "pointer" });
    }

    $('#1').attr("disabled", "disabled");

    //generate random number
    function generateRandomNumber() {
        while (arrOfCorrectTiles.length < NO_OF_CORRECT_TILES) {
            let randomNumber = Math.floor(Math.random() * NO_OF_TILES) + 1;
            if (arrOfCorrectTiles.indexOf(randomNumber) === -1) {
                arrOfCorrectTiles.push(randomNumber);
                $('#' + randomNumber).css("background-color", "white");
            }

        }
    }

    function timer() {
        setTimeout(() => {
            toMakeAllTilesGrey();
        }, TimeToShowTiles);
    }
    generateRandomNumber();
    timer();

    function showCorrectTilesInBlue() {
        for (let i of arrOfCorrectTiles) {
            $('#' + i).css({ "background-color": "blue" });
        }

    }
    function WiningDance() {
        $('.div').css({ "background-color": "#FF008E" }).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
    }

    function countWrongClick() {

        if (counterWrong == NO_OF_ATTEMPTS) {
            $('.div').css({ 'pointer-events': 'none' });
            showCorrectTilesInBlue();

        }
        counterWrong++;
    }
    function countCorrectClick() {
        if (counterCorrect == NO_OF_CORRECT_TILES) {
            WiningDance();
        }
        counterCorrect++;
    }

    $('.div').on('click', function () {
        const id = $(this).attr('id');
        if (arrOfCorrectTiles.indexOf(parseInt(id)) != -1) {
            $(this).css({ "background-color": "green", "pointer-events": "none" });
            countCorrectClick()
        }
        else {
            $(this).css({ "background-color": "red", "pointer-events": "none" });
            countWrongClick();
        }

    });

    $('#restart').on('click', function () {
        toMakeAllTilesGrey();
        arrOfCorrectTiles.splice(0, arrOfCorrectTiles.length);
        $('.div').css({'pointer-events':'none'});
        generateRandomNumber();
        clearTimeout(timeInterval);
        timer();
        counterWrong = 1;
        counterCorrect = 1;
    });

});