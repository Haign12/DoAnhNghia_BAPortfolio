
const asIsProcess = [
    { text: 'Staff sends order in group chat', type: 'normal' },
    { text: 'Admin compiles list manually', type: 'normal' },
    { text: 'Admin places order & pays upfront', type: 'bottleneck', label: 'Cash Flow Risk' },
    { text: 'Admin calculates individual costs + ship', type: 'bottleneck', label: 'Time Sink (45m)' },
    { text: 'Staff transfers money (often forgotten)', type: 'bottleneck', label: 'Payment Loss' }
];

const toBeProcess = [
    { text: 'Staff opens App & selects items', type: 'automated', label: 'Self-service' },
    { text: 'System calculates individual split + ship', type: 'automated', label: 'Instant' },
    { text: 'Staff pays directly via QR Code', type: 'normal' },
    { text: 'System confirms 100% funds collected', type: 'automated', label: 'Zero Risk' },
    { text: 'System triggers final order to vendor', type: 'automated', label: 'Auto' }
];
