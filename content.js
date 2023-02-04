// content.js
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "copyInnerText") {
    var element = document.getElementById(request.element);
    var text = element.innerText;
    navigator.clipboard.writeText(text).then(function() {
      //console.log("Text copied to clipboard: " + text);
    });
  }
});

// Listen for right-click events
document.addEventListener("mousedown", event => {
  if (event.button === 2) {
    // Get the right-clicked element
    const element = document.elementFromPoint(event.clientX, event.clientY);
    let targetInnerText = element.innerText || ((event && event.target)? event.target.innerText : "");
    // Send a message to the background script with the inner text of the element
    browser.runtime.sendMessage({
      type: "copy-inner-text",
      innerText: targetInnerText
    });
  }
});




