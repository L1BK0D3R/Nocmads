let isEnabled = true;

// Function to remove ads
function blockAds() {
  if (!isEnabled) return; // Do nothing if ad-blocking is disabled

  const adSelectors = [
    ".headerbanner > div.myResponsiveAd",
    ".contenido > .myResponsiveAd",
    ".see-all-page.myResponsiveAd3",
    ".footer",
    ".myResponsiveAd2",
    "#uwee > .myResponsiveAd",
    ".code-block-9.code-block",
    ".s_left > .myResponsiveAd",
    "#info > .myResponsiveAd",
    ".central > .myResponsiveAd",
    ".wppopups-whole"
  ];

  adSelectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => element.remove());
  });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
  isEnabled = message.enabled;
  if (isEnabled) blockAds(); // Re-block ads if enabled
});

// Initial ad-blocking
blockAds();

// Optional: Use a MutationObserver to block dynamically loaded ads
const observer = new MutationObserver(blockAds);
observer.observe(document.body, { childList: true, subtree: true });