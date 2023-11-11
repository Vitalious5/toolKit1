document.addEventListener("DOMContentLoaded", function () {
    // Get references to the relevant elements
    var pretextTextarea = document.getElementById("pretext");
    var restextTextarea = document.getElementById("restext");
    var customRadio = document.getElementById("custom");
    var add1Checkbox = document.getElementById("add1");
    var removeDuplicatesCheckbox = document.getElementById("removeDuplicates");
    var executeButton = document.getElementById("execute");
    var copyButton = document.getElementById("clipboard");

    // Add event listener to the form
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Get the value from the 'Text to edit' textarea
        var originalText = pretextTextarea.value;

        // Check if the 'Remove Duplicates' checkbox is checked
        if (removeDuplicatesCheckbox.checked) {
            originalText = removeDuplicateLines(originalText);
        }

        // Check if the 'Custom text' radio button is selected
        var resultText = custom.checked
            ? originalText.replace(/\n/g, ", ")
            : originalText.replace(/\n/g, ", ");

        // Check if the 'Insert into IN ( )' checkbox is checked
        if (add1Checkbox.checked) {
            // If checked, wrap each original line in single quotes
            var lines = resultText.split(", ");
            resultText = lines.map((line) => "'" + line + "'").join(", ");
            // Add "IS IN" before the parentheses
            resultText = "IN (" + resultText + ")";
        }

        // Set the result in the 'Result' textarea
        restextTextarea.value = resultText;
    });

    // Add event listener to the 'Copy to clipboard' button
    copyButton.addEventListener("click", function () {
        // Select the text in the 'Result' textarea
        restextTextarea.select();

        // Copy the selected text to the clipboard
        document.execCommand("copy");
    });

    // Function to remove duplicate lines from a string
    function removeDuplicateLines(text) {
        var lines = text.split(/\r?\n|\r/);
        var uniqueLines = Array.from(new Set(lines));
        return uniqueLines.join("\n");
    }

    document.getElementById('copyright-year').innerText = new Date().getFullYear();

        // Get reference to the reset button
        var resetButton = document.getElementById("reset");

        // Add event listener to the 'Reset' button
        resetButton.addEventListener("click", function () {
            // Reload the page
            location.reload();
        });
});


/*COMPARE TEXT PAGE CODE*/

document.addEventListener("DOMContentLoaded", function () {
    var originalTextarea = document.getElementById("textOne");
    var newTextarea = document.getElementById("textTwo");
    var compareButton = document.getElementById("compareButton");
    var originalCard = document.getElementById("originalCard");
    var newCard = document.getElementById("newCard");

    function highlightDifferences(originalText, newText, card) {
        var diffHtml = '';
        for (var i = 0; i < originalText.length; i++) {
            var originalChar = originalText.charAt(i);

            if (originalChar !== newText.charAt(i)) {
                diffHtml += '<span class="diff-char">' + newText.charAt(i) + '</span>';
            } else {
                diffHtml += originalChar;
            }
        }

        // Replace newline characters with <br> tags
        diffHtml = diffHtml.replace(/\n/g, '<br>');

        card.innerHTML = diffHtml;
    }

    function compareTexts() {
        var originalText = originalTextarea.value;
        var newText = newTextarea.value;

        // Highlight differences for each card
        highlightDifferences(originalText, newText, originalCard);
        highlightDifferences(newText, originalText, newCard);

        // Show the cards after comparison
        originalCard.style.display = "block";
        newCard.style.display = "block";
    }

    // Add event listener
    compareButton.addEventListener("click", compareTexts);

    // Get reference to the clear button
    var clearButton = document.getElementById("clearButton");

    // Add event listener to the 'Clear' button
    clearButton.addEventListener("click", function () {
        // Refresh the page
        location.reload();
    });

    document.getElementById('copyright-year-compare-page').innerText = new Date().getFullYear();
    
});
