function memory() {
    "use strict";

    var domBoard = document.getElementById('board');
    var moves = 0;
    var imagesArray = ['images/1.png', 'images/1.png',
        'images/2.png', 'images/2.png',
        'images/3.png', 'images/3.png',
        'images/4.png', 'images/4.png',
        'images/5.png', 'images/5.png',
        'images/6.png', 'images/6.png',
        'images/7.png', 'images/7.png',
        'images/8.png', 'images/8.png'
    ];
    var tileClick = null;
    var movesCount = 0;
    var tilesFlipped = 0;

    function generateBoard(width, height) {
        var iY, domTR,
            iX, domTD,
            domTextAddr,
            domTBODY;

        function generateTiles() {

            for (iY = 0; iY <= height; iY++) {
                domTR = document.createElement('tr');
                domTBODY.appendChild(domTR);

                for (iX = 0; iX <= width; iX++) {
                    domTD = document.createElement('td');
                    domTR.appendChild(domTD);

                    domTextAddr = document.createTextNode(iX + 'x' + iY);
                    var randomImage = Math.floor(Math.random() * imagesArray.length);
                    var randomSplice = imagesArray.splice(randomImage, 1);
                    domTD.id = 'tile' + iX + 'x' + iY;
                    domTD.innerHTML = '<img src=' + randomSplice + '>';
                    domTD.addEventListener('click', flip, true);
                    domTD.addEventListener('click', addScore, true);

                }
            }
        }

        domTBODY = document.createElement('tbody');

        function flip() {
            document.querySelector("#" + this.id + ' img').style.visibility = 'visible';
            document.querySelector("#" + this.id + ' img').style.opacity = '1';
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
                    	document.querySelector("#" + secondClick.id + ' img').style.visibility = 'hidden';
                        document.querySelector("#" + secondClick.id + ' img').style.opacity = '0';
                        document.querySelector("#" + tileClick.id + ' img').style.visibility = 'hidden';
                        document.querySelector("#" + tileClick.id + ' img').style.opacity = '0';
                        tileClick = null;
                    }

                    setTimeout(flipAgain, 400);
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

        generateTiles();

        domBoard.appendChild(domTBODY);
        
    }

    generateBoard(3, 3);
}

memory();
