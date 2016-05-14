function memory() {
    "use strict";

    var domBoard = document.getElementById('board');
    var moves = 0;
    var imagesArray = ['images/1.jpg', 'images/1.jpg',
        'images/2.jpg', 'images/2.jpg',
        'images/3.jpg', 'images/3.jpg',
        'images/4.jpg', 'images/4.jpg',
        'images/5.jpg', 'images/5.jpg',
        'images/6.jpg', 'images/6.jpg',
        'images/7.jpg', 'images/7.jpg',
        'images/8.jpg', 'images/8.jpg'
    ];
    var tileClick = null;
    var movesCount = 0;
    var tilesFlipped = 0;

    function generateBoard(width, height) {
        var iY, domTR,
            iX, domTD,
            domTextAddr,
            domTBODY;

        domTBODY = document.createElement('tbody');

        function flip() {
            document.querySelector("#" + this.id + ' img').style.display = 'block';
            if (tileClick == null) {
                tileClick = this;
            } else {
                if (
                    document.querySelector("#" + this.id + ' img').getAttribute('src') ==
                    document.querySelector("#" + tileClick.id + ' img').getAttribute('src')
                ) {
                    tilesFlipped += 2;
                    tileClick = null;
                } else {

                    var secondClick = this;

                    function flipAgain() {
                        document.querySelector("#" + secondClick.id + ' img').style.display = 'none';
                        document.querySelector("#" + tileClick.id + ' img').style.display = 'none';
                        tileClick = null;
                    }

                    setTimeout(flipAgain, 500);
                }

            }

            document.querySelector("#tilesFlipped").innerHTML = tilesFlipped;

            if (tilesFlipped == 16) {
                alert('Wygrales!');
            }
        }

        function addScore() {
            movesCount += 1;
            document.querySelector("#score").innerHTML = movesCount;
        }


        for (iY = 0; iY <= height; iY++) {
            domTR = document.createElement('tr');
            domTBODY.appendChild(domTR);

            for (iX = 0; iX <= width; iX++) {
                domTD = document.createElement('td');
                domTR.appendChild(domTD);

                domTextAddr = document.createTextNode(iX + 'x' + iY);
                var randomImage = Math.floor(Math.random() * imagesArray.length);
                var randomSplice = imagesArray.splice(randomImage, 1);
                domTD.id = 'pole' + iX + 'x' + iY;
                domTD.innerHTML = '<img src=' + randomSplice + '>';
                domTD.addEventListener('click', flip, true);
                domTD.addEventListener('click', addScore, true);

            }
        }

        domBoard.appendChild(domTBODY);
    }

    generateBoard(3, 3);


    /*function addScore() {
        score++; // score=score+1;

        if (!(score % 10) && speed > 100) {
            speed = speed - 100;
        }

        document.querySelector('#score').innerHTML = score;
    }*/
}

memory();
