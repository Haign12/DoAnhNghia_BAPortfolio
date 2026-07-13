let tooltip = null;
let triggerBtn = null;
let currentSelection = '';
let currentRange = null;

// Initialize elements
function injectUI() {
  if (!document.getElementById('ai-translator-tooltip')) {
    // Tooltip
    tooltip = document.createElement('div');
    tooltip.id = 'ai-translator-tooltip';
    
    // Header
    const header = document.createElement('div');
    header.className = 'ai-translator-header';
    header.innerHTML = `
      <div class="logo">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>AI Dịch Ngữ Cảnh</span>
      </div>
      <div class="ai-translator-close" title="Đóng">✕</div>
    `;
    
    // Content area
    const content = document.createElement('div');
    content.className = 'ai-translator-content';
    content.id = 'ai-translator-content';
    
    tooltip.appendChild(header);
    tooltip.appendChild(content);
    document.body.appendChild(tooltip);

    // Close button event
    tooltip.querySelector('.ai-translator-close').addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      hideTooltip();
    });
    
    // Prevent tooltip clicks from closing itself via body click
    tooltip.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });
  }

  if (!document.getElementById('ai-translator-trigger')) {
    // Trigger button
    triggerBtn = document.createElement('button');
    triggerBtn.id = 'ai-translator-trigger';
    triggerBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Dịch
    `;
    document.body.appendChild(triggerBtn);

    // Trigger translate event
    triggerBtn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const rect = triggerBtn.getBoundingClientRect();
      const top = rect.bottom + window.scrollY + 5;
      const left = rect.left + window.scrollX;
      
      hideTrigger();
      showTooltip(top, left);
      performTranslation(currentSelection);
    });
  }
}

// Check if extension is enabled
async function isExtensionEnabled() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['enableTranslation'], (result) => {
      resolve(result.enableTranslation !== false); // default is true
    });
  });
}

// Handle text selection
document.addEventListener('mouseup', async (e) => {
  if (!await isExtensionEnabled()) return;

  // Don't do anything if clicking inside our UI
  if (tooltip && tooltip.contains(e.target)) return;
  if (triggerBtn && triggerBtn.contains(e.target)) return;

  // Small delay to allow the browser to register the selection fully
  setTimeout(() => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text && text.length > 0) {
      // Valid selection
      currentSelection = text;
      
      // Get position for the trigger button
      const range = selection.getRangeAt(0);
      currentRange = range;
      const rect = range.getBoundingClientRect();
      
      // Position the button slightly below the selection
      const top = rect.bottom + window.scrollY + 10;
      let left = rect.left + window.scrollX + (rect.width / 2) - 35; // Center relatively
      
      // Prevent button from going off screen
      if (left < 10) left = 10;
      
      showTrigger(top, left);
    } else {
      // Clear if just clicking around
      if (e.target.id !== 'ai-translator-trigger' && e.target.closest('#ai-translator-tooltip') === null) {
         hideTrigger();
         // Only hide tooltip if it's not currently translating or showing result
         const content = document.getElementById('ai-translator-content');
         if (content && !content.querySelector('.ai-translator-loading') && tooltip && !tooltip.classList.contains('visible')) {
             // Leave it visible if user is reading
         } else if (tooltip) {
             hideTooltip();
         }
      }
    }
  }, 10);
});

// Hide UI on mousedown elsewhere
document.addEventListener('mousedown', (e) => {
  if (triggerBtn && !triggerBtn.contains(e.target) && tooltip && !tooltip.contains(e.target)) {
    hideTrigger();
    
    // Check if we should close tooltip
    const content = document.getElementById('ai-translator-content');
    if (content && !content.querySelector('.ai-translator-loading')) {
        hideTooltip();
    }
  }
});

function showTrigger(top, left) {
  if (!triggerBtn) injectUI();
  triggerBtn.style.top = `${top}px`;
  triggerBtn.style.left = `${left}px`;
  triggerBtn.classList.add('visible');
}

function hideTrigger() {
  if (triggerBtn) {
    triggerBtn.classList.remove('visible');
  }
}

function showTooltip(top, left) {
  if (!tooltip) injectUI();
  
  const content = document.getElementById('ai-translator-content');
  content.innerHTML = `
    <div class="ai-translator-loading">
      <div class="ai-translator-spinner"></div>
      <span>AI đang phân tích ngữ cảnh và dịch...</span>
    </div>
  `;
  
  // Apply initial position
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
  
  // Make visible to calculate actual size
  tooltip.classList.add('visible');
  
  // Adjust position if it goes off screen
  setTimeout(() => {
    const rect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let adjustedLeft = left;
    let adjustedTop = top;
    
    if (rect.right > viewportWidth) {
      adjustedLeft = viewportWidth - rect.width - 20 + window.scrollX;
    }
    
    if (rect.bottom > viewportHeight) {
       // Put it above the selection if it overflows the bottom
       if (currentRange) {
           const rangeRect = currentRange.getBoundingClientRect();
           adjustedTop = rangeRect.top + window.scrollY - rect.height - 15;
       }
    }
    
    tooltip.style.left = `${adjustedLeft}px`;
    tooltip.style.top = `${adjustedTop}px`;
  }, 0);
}

function hideTooltip() {
  if (tooltip) {
    tooltip.classList.remove('visible');
  }
}

function performTranslation(text) {
  chrome.runtime.sendMessage({ action: 'translate', text: text }, (response) => {
    const content = document.getElementById('ai-translator-content');
    
    if (chrome.runtime.lastError) {
      content.innerHTML = `<div class="ai-translator-error">Lỗi tiện ích: ${chrome.runtime.lastError.message}</div>`;
      return;
    }

    if (response.success) {
      // Convert line breaks to paragraphs for better reading
      const paragraphs = response.translation.split('\n').filter(p => p.trim() !== '');
      let html = '';
      paragraphs.forEach(p => {
        html += `<p>${escapeHTML(p)}</p>`;
      });
      content.innerHTML = html;
    } else {
      content.innerHTML = `<div class="ai-translator-error">Lỗi AI: ${escapeHTML(response.error)}</div>`;
    }
  });
}

// Utility to prevent XSS
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Initial injection
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectUI);
} else {
  injectUI();
}
