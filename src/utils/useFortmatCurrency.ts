import { useCallback } from 'react';

const useFormatCurrency = () => {
    const formatCurrency = useCallback((value: number | string | undefined): string => {
        if (value === undefined) return 'None';
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numericValue);
    }, []);

    return formatCurrency;
};

export default useFormatCurrency;