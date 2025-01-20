// Default state: ad-blocking is enabled
let isEnabled = true;

// Listen for toolbar button clicks
chrome.action.onClicked.addListener((tab) => {
  // Toggle the state
  isEnabled = !isEnabled;

  // Update the toolbar icon to reflect the state
  const iconPath = isEnabled ? "icon48.png" : "icon48-disabled.png";
  chrome.action.setIcon({ path: iconPath });

  // Send a message to the content script to enable/disable ad-blocking
  chrome.tabs.sendMessage(tab.id, { enabled: isEnabled });
});

// Optional: Restore the state when the extension starts
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("isEnabled", (data) => {
    isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
    const iconPath = isEnabled ? "icon48.png" : "icon48-disabled.png";
    chrome.action.setIcon({ path: iconPath });
  });
});