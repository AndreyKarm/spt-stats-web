export const calculateDateRange = (timeRange) => {
    const endDate = new Date();
    let startDate = new Date();
    
    switch(timeRange) {
        case '1d':
            startDate.setDate(endDate.getDate() - 1);
            break;
        case '7d':
            startDate.setDate(endDate.getDate() - 7);
            break;
        case '30d':
            startDate.setDate(endDate.getDate() - 30);
            break;
        case '90d':
            startDate.setDate(endDate.getDate() - 90);
            break;
        case 'all':
            startDate = new Date(0); // Set to epoch time
            break;
        default:
            startDate.setDate(endDate.getDate() - 7); // Default to 7 days
    }

    return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
    };
};