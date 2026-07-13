document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const enableTranslationInput = document.getElementById('enableTranslation');
  const saveBtn = document.getElementById('saveBtn');
  const statusMessage = document.getElementById('statusMessage');

  // Load existing settings
  chrome.storage.local.get(['geminiApiKey', 'enableTranslation'], (result) => {
    if (result.geminiApiKey) {
      apiKeyInput.value = result.geminiApiKey;
    }
    if (result.enableTranslation !== undefined) {
      enableTranslationInput.checked = result.enableTranslation;
    }
  });

  saveBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    const enableTranslation = enableTranslationInput.checked;

    chrome.storage.local.set({
      geminiApiKey: apiKey,
      enableTranslation: enableTranslation
    }, () => {
      statusMessage.textContent = 'Đã lưu cài đặt!';
      statusMessage.className = 'status success';
      
      setTimeout(() => {
        statusMessage.className = 'status hidden';
      }, 2000);
    });
  });
});
