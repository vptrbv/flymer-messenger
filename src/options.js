// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
                chrome.storage.local.set({ "refreshInterval": this.value }, function () { })
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    });
}

function fillValues() {
    chrome.storage.local.get("refreshInterval", function (result) {
        if (result["refreshInterval"])
            document.getElementById('refreshInterval').value = result["refreshInterval"];
        else {
            var defaultRefreshInterval = 5
            chrome.storage.local.set({ "refreshInterval": defaultRefreshInterval }, function () { })
            document.getElementById('refreshInterval').value = defaultRefreshInterval;
        }
    });
}

window.onload = function () {
    setInputFilter(document.getElementById("refreshInterval"), function (value) {
        return /^\d*\.?\d*$/.test(value);
    });
    fillValues();
}