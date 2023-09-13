chrome.tabs.query({active: true}, function(tabs) {
    const currentTab = tabs[0];
    if (currentTab.url.includes("google.com")) {
      console.log('Вы находитесь на странице google.com!');
    }
  });