function checkPhishing() {
    var url = document.getElementById("urlInput").value;
    var resultParagraph = document.getElementById("result");

    var isPhishing = isPhishingUrl(url);

    if (isPhishing) {
        resultParagraph.textContent = " 💀 This URL might be a phishy one 💀 .";
        alert("Beware!");
        resultParagraph.style.color = "red"; // Set color to red for unsafe URLs
    } else {
        resultParagraph.textContent = " ✅This URL seems safe to use. ✅";
        resultParagraph.style.color = "green"; // Set color to green for safe URLs
        
    }
}

function isPhishingUrl(url) {
    try {
        var parsedUrl = new URL(url);

        // Check if the URL protocol is not HTTPS
        if (parsedUrl.protocol !== "https:") {
            return true;
        }

        // Check for common phishing keywords in the hostname
        var phishingKeywords = /(login|signin|account|password|secure)/i;
        if (phishingKeywords.test(parsedUrl.hostname)) {
            return true;
        }

        // Check if the hostname is an IP address
        var ipPattern = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
        if (ipPattern.test(parsedUrl.hostname)) {
            return true;
        }

        // Check for unusual characters in the hostname
        var unusualCharacters = /[^a-zA-Z0-9.-]/;
        if (unusualCharacters.test(parsedUrl.hostname)) {
            return true;
        }

        // Check if the path contains an IP address
        if (ipPattern.test(parsedUrl.pathname)) {
            return true;
        }

        return false;
    } catch (error) {
        console.error("Invalid URL:", error);
        return false;
    }
}
