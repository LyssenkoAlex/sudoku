module.exports = function solveSudoku(matrix) {
  // your solution

    let emptyPosArr = getEmptyPositions(matrix);

    for (let i = 0; i < emptyPosArr.length;) {

        let rowNumber = emptyPosArr[i][0];
        let columnNumber = emptyPosArr[i][1];
        let counter = matrix[rowNumber][columnNumber];
        let found = false;


        while (!found && counter <= 9) {
            if (checkColumn(matrix, columnNumber, counter) && checkRow(matrix, rowNumber, counter) && checkSqr(matrix, columnNumber, rowNumber, counter)) {

                matrix[rowNumber][columnNumber] = counter;
                counter++;
                found = true;
                i++;
            } else {
                counter++;
            }
        }
        if (!found) {
            matrix[rowNumber][columnNumber] = 0;
            i--;
        }
    }
    return matrix;



    function getEmptyPositions(matrix) {
        let toReturn = [];

        matrix.forEach((row, rowNumber) => {
            row.forEach((colVal, columnNumber) => {
                if (colVal === 0) {
                    toReturn.push([rowNumber, columnNumber]);
                }
            })
        });
        return toReturn;

    }

    function checkColumn(matrix, columnNumber, counter) {
        let i = 0;
        while (i < matrix.length) {
            if (matrix[i][columnNumber] === counter) return false;
            i += 1;
        }
        return true;
    }

    function checkRow(matrix, rowNUmber, counter) {
        let i = 0;
        while (i < matrix.length) {
            if (matrix[rowNUmber][i] === counter) return false;
            i += 1;
        }
        return true;
    }

    function checkSqr(board, column, row, value) {
        // Save the upper left corner
        let columnCorner = 0,
            rowCorner = 0,
            squareSize = 3;

        // Find the left-most column
        while (column >= columnCorner + squareSize) {
            columnCorner += squareSize;
        }

        // Find the upper-most row
        while (row >= rowCorner + squareSize) {
            rowCorner += squareSize;
        }

        // Iterate through each row
        for (let i = rowCorner; i < rowCorner + squareSize; i++) {
            // Iterate through each column
            for (let j = columnCorner; j < columnCorner + squareSize; j++) {
                // Return false is a match is found
                if (board[i][j] === value) {
                    return false;
                }
            }
        }
        // If no match was found, return true
        return true;

    }
}
