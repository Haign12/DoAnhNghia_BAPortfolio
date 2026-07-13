// Simulated data for automotive brake component quality inspection process

const processData = {
    'as-is': {
        title: 'As-Is Process: Manual Quality Inspection',
        description: 'Quality inspection process for automotive brake components from production line to packaging.',
        nodes: [
            { id: 'A1', name: 'Product leaves production line', type: 'start', time: 0, cost: 0, role: 'Machine', errorRate: 0, description: 'Finished brake components are moved off the production line' },
            { id: 'A2', name: 'Transport to QC area', type: 'task', time: 15, cost: 5, role: 'Worker', errorRate: 0, description: 'Workers manually transport product batches to the QC area' },
            { id: 'A3', name: 'Wait in queue', type: 'wait', time: 45, cost: 0, role: 'N/A', errorRate: 0, description: 'Products wait in line for an available inspector (bottleneck)' },
            { id: 'A4', name: 'Visual inspection', type: 'task', time: 30, cost: 25, role: 'QC Inspector', errorRate: 5.2, description: 'Inspector visually checks for cracks, scratches, and surface deformation' },
            { id: 'A5', name: 'Manual dimension check', type: 'task', time: 20, cost: 15, role: 'QC Inspector', errorRate: 3.1, description: 'Uses calipers and gauges to check dimensions against engineering drawings' },
            { id: 'A6', name: 'Record results in paper log', type: 'task', time: 10, cost: 8, role: 'QC Inspector', errorRate: 7.5, description: 'Records inspection results in a paper logbook (prone to errors, hard to trace)' },
            { id: 'A7', name: 'Pass/Fail Decision?', type: 'decision', time: 5, cost: 5, role: 'QC Inspector', errorRate: 2.0, description: 'Inspector decides whether the product passes or fails' },
            { id: 'A8', name: 'Defective -> Scrap Area', type: 'task', time: 10, cost: 3, role: 'Worker', errorRate: 0, description: 'Failed products are moved to the scrap area for processing' },
            { id: 'A9', name: 'Data entry into Excel report', type: 'task', time: 15, cost: 12, role: 'QC Lead', errorRate: 4.0, description: 'At the end of the shift, QC Lead re-enters data from the paper log into Excel' },
            { id: 'A10', name: 'Packaging & Shipping', type: 'end', time: 10, cost: 5, role: 'Worker', errorRate: 0, description: 'Passed products are packaged and moved to the shipping warehouse' }
        ]
    },
    'to-be': {
        title: 'To-Be Process: AI-Powered Automated QC',
        description: 'Automated QC process utilizing Computer Vision, CMM, and MES integration.',
        nodes: [
            { id: 'B1', name: 'Product leaves production line', type: 'start', time: 0, cost: 0, role: 'Machine', errorRate: 0, description: 'Finished brake components are moved off the production line' },
            { id: 'B2', name: 'Automated conveyor -> QC Station', type: 'task', time: 3, cost: 2, role: 'System', errorRate: 0, description: 'Automated conveyor system transports products to the inspection station', improvement: 'Reduced transport time by 80% via automation' },
            { id: 'B3', name: 'AI Visual Inspection', type: 'task', time: 2, cost: 3, role: 'AI System', errorRate: 0.5, description: 'AI Camera automatically checks appearance: detects cracks and scratches with 99.5% accuracy', improvement: 'Replaced manual visual check, reduced time by 93%, reduced errors by 90%' },
            { id: 'B4', name: 'Automated measurement (CMM)', type: 'task', time: 5, cost: 4, role: 'CMM Machine', errorRate: 0.1, description: '3D Coordinate Measuring Machine (CMM) automatically measures dimensions and compares with CAD model', improvement: 'Reduced measurement time by 75%, increased accuracy to ±0.001mm' },
            { id: 'B5', name: 'Auto-record results to MES', type: 'task', time: 1, cost: 1, role: 'System', errorRate: 0, description: 'Inspection data is saved directly to the MES (Manufacturing Execution System)', improvement: 'Completely eliminated manual logging, zero data entry error' },
            { id: 'B6', name: 'AI Pass/Fail Decision', type: 'decision', time: 1, cost: 1, role: 'AI System', errorRate: 0.3, description: 'AI system automatically categorizes based on configured quality thresholds', improvement: '100% consistent decisions, independent of personal feelings' },
            { id: 'B7', name: 'Robot sorts defectives', type: 'task', time: 2, cost: 1, role: 'Robot', errorRate: 0, description: 'Robot arm automatically sorts and moves failed products to the processing area' },
            { id: 'B8', name: 'Real-time dashboard update', type: 'task', time: 0, cost: 2, role: 'System', errorRate: 0, description: 'Dashboard monitoring OEE and Quality metrics updates in real-time', improvement: 'Management knows the situation instantly, no need to wait for end-of-shift reports' },
            { id: 'B9', name: 'Packaging & Shipping', type: 'end', time: 8, cost: 4, role: 'Worker', errorRate: 0, description: 'Passed products are packaged and moved to the shipping warehouse' }
        ]
    },
    'recommendations': [
        {
            id: 'R1',
            title: 'Deploy AI Visual Inspection System',
            impact: 'High',
            effort: 'High',
            category: 'Technology',
            description: 'Install industrial cameras and deploy Computer Vision models to replace manual visual inspection. Reduces errors from 5.2% to 0.5%, speeds up process by 15x.',
            roi: 'Estimated ROI: 280% in 18 months. Saves ~$120,000/year in QC personnel costs.'
        },
        {
            id: 'R2',
            title: 'Integrate Automated CMM Machine',
            impact: 'High',
            effort: 'Medium',
            category: 'Technology',
            description: 'Replace manual measurement with a CMM (Coordinate Measuring Machine) connected directly to CAD. Reduces time by 75%, increases accuracy.',
            roi: 'Estimated ROI: 200% in 12 months.'
        },
        {
            id: 'R3',
            title: 'Digitize Records -> MES System',
            impact: 'Medium',
            effort: 'Low',
            category: 'Process',
            description: 'Eliminate paper logs and Excel files. All QC data is automatically recorded into the MES system, enabling real-time traceability.',
            roi: 'Reduces data entry errors by 100%. Saves 2 hours/day for the QC Lead.'
        },
        {
            id: 'R4',
            title: 'Install Automated Conveyor',
            impact: 'Medium',
            effort: 'High',
            category: 'Infrastructure',
            description: 'Replace manual transport with a conveyor system. Reduces travel time by 80%, decreases risk of product damage during transport.',
            roi: 'Estimated ROI: 150% in 24 months.'
        },
        {
            id: 'R5',
            title: 'Deploy Real-time Dashboard',
            impact: 'High',
            effort: 'Low',
            category: 'Process',
            description: 'Build a dashboard to monitor quality KPIs (OEE, Defect Rate, Yield) updated in real-time instead of end-of-shift Excel reports.',
            roi: 'Reduces time to detect quality issues by 50%. Supports faster decision-making.'
        }
    ],
    'use-cases': [
        { id: 'UC1', name: 'Quality Inspection' },
        { id: 'UC2', name: 'Maintenance Request' },
        { id: 'UC3', name: 'Order Processing' }
    ]
};

const alternativeProcesses = {
    'UC2': {
        'as-is': {
            title: 'As-Is Process: Reactive Equipment Maintenance',
            description: 'Process for requesting equipment repair when a breakdown is detected on the production line.',
            nodes: [
                { id: 'M1', name: 'Detect machine issue', type: 'start', time: 0, cost: 0, role: 'Operator', errorRate: 0, description: 'Machine operator detects abnormal operation' },
                { id: 'M2', name: 'Write repair request form', type: 'task', time: 15, cost: 5, role: 'Operator', errorRate: 10, description: 'Fills out paper form describing the issue, often lacking detailed info' },
                { id: 'M3', name: 'Send form for manager approval', type: 'task', time: 30, cost: 10, role: 'Operator', errorRate: 5, description: 'Walks to find the manager to sign the request form' },
                { id: 'M4', name: 'Wait for manager approval', type: 'wait', time: 120, cost: 0, role: 'N/A', errorRate: 0, description: 'Waits for manager to be available to review and approve (major bottleneck)' },
                { id: 'M5', name: 'Call/Email maintenance dept', type: 'task', time: 10, cost: 5, role: 'Manager', errorRate: 3, description: 'Manager contacts the head of the maintenance department' },
                { id: 'M6', name: 'Wait for technician', type: 'wait', time: 60, cost: 0, role: 'N/A', errorRate: 0, description: 'Waits for technician to finish their current job' },
                { id: 'M7', name: 'Inspect & Repair', type: 'task', time: 90, cost: 80, role: 'Technician', errorRate: 5, description: 'Technician inspects, diagnoses, and repairs the equipment' },
                { id: 'M8', name: 'Record repair log', type: 'task', time: 15, cost: 8, role: 'Technician', errorRate: 8, description: 'Records repair results in a paper logbook' },
                { id: 'M9', name: 'Machine resumes operation', type: 'end', time: 0, cost: 0, role: 'Machine', errorRate: 0, description: 'Equipment is put back into production' }
            ]
        },
        'to-be': {
            title: 'To-Be Process: Predictive Maintenance (IoT + CMMS)',
            description: 'Predictive maintenance process utilizing IoT sensors and CMMS software.',
            nodes: [
                { id: 'N1', name: 'Sensor detects anomaly', type: 'start', time: 0, cost: 0, role: 'IoT Sensor', errorRate: 0, description: 'IoT sensors continuously monitor and detect anomalies before machine breaks', improvement: 'Early detection 24-48h ahead via Predictive Maintenance' },
                { id: 'N2', name: 'System auto-creates Work Order', type: 'task', time: 1, cost: 1, role: 'CMMS', errorRate: 0, description: 'CMMS automatically creates a repair order with full machine info, history, required parts', improvement: 'Eliminates paper forms, 100% complete information' },
                { id: 'N3', name: 'Auto-assign technician', type: 'task', time: 1, cost: 1, role: 'CMMS', errorRate: 0, description: 'System auto-assigns a suitable technician based on skills and schedule', improvement: 'Bypasses manual approval and contact steps' },
                { id: 'N4', name: 'Technician receives notification', type: 'task', time: 2, cost: 0, role: 'Technician', errorRate: 0, description: 'Push notification sent to technician\'s tablet/smartphone' },
                { id: 'N5', name: 'Inspect & Repair (Guided)', type: 'task', time: 45, cost: 40, role: 'Technician', errorRate: 1, description: 'Technician repairs using digital manuals and historical data on tablet', improvement: 'Repair time halved thanks to AI diagnosis and available documentation' },
                { id: 'N6', name: 'Digital sign-off on CMMS', type: 'task', time: 2, cost: 1, role: 'Technician', errorRate: 0, description: 'Closes work order directly on the app', improvement: 'No paper recording, updates equipment history instantly' },
                { id: 'N7', name: 'Machine resumes operation', type: 'end', time: 0, cost: 0, role: 'Machine', errorRate: 0, description: 'Equipment is put back into production' }
            ]
        }
    }
};

const processDataToUse = processData;
