
function renderProcess(containerId, processData) {
    const container = document.getElementById(containerId);
    let html = '';
    processData.forEach((step, index) => {
        let extraLabel = '';
        if (step.type === 'bottleneck') extraLabel = `<span class="bottleneck-label">${step.label}</span>`;
        if (step.type === 'automated') extraLabel = `<span class="auto-label">${step.label}</span>`;
        
        html += `
            <div class="process-step">
                <div class="step-box ${step.type}">
                    ${extraLabel}
                    ${step.text}
                </div>
            </div>
        `;
        if (index < processData.length - 1) {
            html += `<div class="process-step"><div class="arrow">↓</div></div>`;
        }
    });
    container.innerHTML = html;
}

renderProcess('asisProcess', asIsProcess);
renderProcess('tobeProcess', toBeProcess);

// Clean up old files if present
