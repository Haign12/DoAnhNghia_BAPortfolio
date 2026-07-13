chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'translate') {
    translateText(request.text)
      .then(result => sendResponse({ success: true, translation: result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    
    return true; // Indicates we will respond asynchronously
  }
});

// Danh sách model Gemini sẽ được thử lần lượt (mới nhất trước)
const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
];

async function translateText(text) {
  // Get settings from storage
  const data = await new Promise((resolve) => {
    chrome.storage.local.get(['geminiApiKey'], resolve);
  });

  // Nếu có API Key → thử Gemini trước
  if (data.geminiApiKey) {
    try {
      return await translateWithGemini(text, data.geminiApiKey);
    } catch (geminiError) {
      console.warn('[ContextTranslator] Gemini thất bại, chuyển sang MyMemory:', geminiError.message);
      // Fallback sang MyMemory nếu Gemini lỗi
      try {
        return await translateWithMyMemory(text);
      } catch (fallbackError) {
        // Nếu cả 2 đều lỗi, báo lỗi chi tiết
        throw new Error(`Gemini: ${geminiError.message} | MyMemory: ${fallbackError.message}`);
      }
    }
  }

  // Không có API Key → dùng MyMemory miễn phí
  return await translateWithMyMemory(text);
}

// ===== GEMINI API =====
async function translateWithGemini(text, apiKey) {
  const prompt = `Bạn là một chuyên gia ngôn ngữ và dịch thuật.
Nhiệm vụ của bạn là dịch đoạn văn bản sau (có thể là tiếng Anh hoặc tiếng Pháp) sang tiếng Việt.
Yêu cầu:
1. Dịch sát nghĩa nhất dựa theo ngữ cảnh của toàn bộ đoạn văn.
2. Tuyệt đối không dịch kiểu word-by-word (dịch từng từ/từng câu cứng nhắc như máy).
3. Văn phong tự nhiên, trôi chảy, phù hợp với ngữ cảnh học thuật/chuyên ngành hoặc giao tiếp bình thường tùy thuộc vào nội dung.
4. CHỈ TRẢ VỀ kết quả đã dịch, KHÔNG giải thích gì thêm, KHÔNG có phần mở đầu/kết thúc.

Đoạn văn bản cần dịch:
"${text}"`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.3 }
  };

  // Thử từng model trong danh sách cho đến khi thành công
  let lastError = null;
  for (const model of GEMINI_MODELS) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        const errMsg = errData.error?.message || `HTTP ${response.status}`;
        console.warn(`[ContextTranslator] Model "${model}" lỗi: ${errMsg}`);
        lastError = new Error(errMsg);
        continue; // Thử model tiếp theo
      }

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0) {
        console.log(`[ContextTranslator] Dịch thành công với model: ${model}`);
        return result.candidates[0].content.parts[0].text.trim();
      } else {
        lastError = new Error('Không nhận được bản dịch từ API.');
        continue;
      }
    } catch (fetchError) {
      lastError = fetchError;
      continue;
    }
  }

  throw lastError || new Error('Tất cả các model Gemini đều không khả dụng.');
}

// ===== MYMEMORY TRANSLATION API (Miễn phí, không cần API Key) =====
async function translateWithMyMemory(text) {
  // Tự động nhận diện ngôn ngữ: thử EN→VI, nếu không hợp lý thì FR→VI
  const langPairs = ['en|vi', 'fr|vi'];

  for (const langpair of langPairs) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;

    const response = await fetch(url);
    if (!response.ok) continue;

    const result = await response.json();

    if (result.responseStatus === 200 && result.responseData?.translatedText) {
      const translated = result.responseData.translatedText;

      // Kiểm tra nếu kết quả không phải chỉ là bản copy y nguyên
      if (translated.toLowerCase() !== text.toLowerCase()) {
        return translated;
      }
    }
  }

  throw new Error('Dịch miễn phí (MyMemory) không thành công. Vui lòng nhập Gemini API Key để có kết quả tốt hơn.');
}
