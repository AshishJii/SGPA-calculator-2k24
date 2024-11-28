document.getElementById('predictForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const curCGPA = parseFloat(document.getElementById('curCGPA').value);
    const internalMarks = parseInt(document.getElementById('internalMarks').value);
    const resultTableBody = document.querySelector('#resultsTable tbody');
    resultTableBody.innerHTML = ''; // Clear previous results

    const ranges = [
        { upper: 100, lower: 90, grade: 10 },
        { upper: 89, lower: 80, grade: 9 },
        { upper: 79, lower: 70, grade: 8 },
        { upper: 69, lower: 60, grade: 7 },
        { upper: 59, lower: 50, grade: 6 },
        { upper: 49, lower: 45, grade: 5 },
        { upper: 44, lower: 40, grade: 4 },
        { upper: 39, lower: 0, grade: 0 },
    ];

    ranges.forEach(({ upper, lower, grade }) => {
        const fgpa = curCGPA + (4 * grade) / 23;
        let extLower = lower - internalMarks;
        let extUpper = upper - internalMarks;


        if (extLower > 70) {
            return; // Skip bcoz not possible
        }
        if (extUpper > 70) {
            extUpper = 70; // Cap the upper limit at 70
        }

        if (extUpper < 0) {
            return; // Skip bcoz not possible
        }
        if (extLower < 0) {
            extLower = 0; // Adjust lower limit to 0 if it's negative
        }

        const rangeString = `${extLower} to ${extUpper}`;
        const newRow = `
            <tr>
                <td>${rangeString}</td>
                <td>${fgpa.toFixed(2)}</td>
            </tr>
        `;
        resultTableBody.innerHTML += newRow;
    });
});
