/**
 * Wallet Service - Utility functions for wallet operations
 * 
 * This service provides functions to:
 * - Check wallet balance
 * - Deduct from wallet for fees (e.g., overdue package pickup)
 * - Handle wallet transactions
 */

import { GET_WALLET_URL, get_data_token } from '../config/network.jsx';

/**
 * Get current wallet balance
 * @returns {Promise<Object>} Wallet data including balance, frozen money, UBI
 */
export const getWalletBalance = async () => {
    try {
        const data = await get_data_token(GET_WALLET_URL, {});
        return {
            success: true,
            balance: data.money || 0,
            total: data.total || 0,
            frozenMoney: data.frozenMoney || 0,
            refundMoney: data.refundMoney || 0,
            ubi: data.ubi || 0
        };
    } catch (error) {
        console.error('Failed to get wallet balance:', error);
        return {
            success: false,
            error: error.toString()
        };
    }
};

/**
 * Check if user has sufficient balance for a charge
 * @param {number} amount - Amount to check
 * @returns {Promise<boolean>} True if sufficient balance
 */
export const hasSufficientBalance = async (amount) => {
    try {
        const walletData = await getWalletBalance();
        if (!walletData.success) {
            return false;
        }
        return walletData.balance >= amount;
    } catch (error) {
        console.error('Failed to check balance:', error);
        return false;
    }
};

/**
 * Deduct amount from wallet
 * 
 * NOTE: This is a placeholder function. The actual deduction should be done
 * on the backend via an API endpoint to ensure security and prevent client-side
 * manipulation. This function would call a backend endpoint like:
 * POST /Wallet/deduct
 * 
 * @param {number} amount - Amount to deduct
 * @param {string} reason - Reason for deduction (e.g., 'overdue_fee', 'service_charge')
 * @param {string} referenceId - Reference ID for the transaction (e.g., package ID)
 * @returns {Promise<Object>} Result of the deduction
 */
export const deductFromWallet = async (amount, reason, referenceId = null) => {
    // TODO: This should call a backend API endpoint for security
    // Example:
    // const result = await post_data_token(DEDUCT_WALLET_URL, {
    //     amount,
    //     reason,
    //     referenceId
    // });

    console.warn('deductFromWallet is a placeholder function. Backend implementation required.');

    return {
        success: false,
        error: 'Backend implementation required for wallet deductions'
    };

    // Expected backend response:
    // {
    //     success: true,
    //     transactionId: '123456',
    //     newBalance: 45.50,
    //     deductedAmount: 4.50,
    //     timestamp: 1234567890
    // }
};

/**
 * Calculate overdue fee
 * @param {number} daysOverdue - Number of days package is overdue (after 3 free days)
 * @param {number} feePerDay - Fee per day (default: $2.00)
 * @returns {number} Total overdue fee
 */
export const calculateOverdueFee = (daysOverdue, feePerDay = 2.00) => {
    if (daysOverdue <= 0) {
        return 0;
    }
    return daysOverdue * feePerDay;
};

/**
 * Process overdue package fee
 * This is a placeholder for the overdue fee charging logic
 * 
 * @param {string} packageId - Package ID
 * @param {number} daysOverdue - Number of days overdue (after 3 free days)
 * @returns {Promise<Object>} Result of fee processing
 */
export const processOverdueFee = async (packageId, daysOverdue) => {
    const fee = calculateOverdueFee(daysOverdue);

    if (fee <= 0) {
        return {
            success: true,
            fee: 0,
            message: 'No overdue fee'
        };
    }

    // Check if user has sufficient balance
    const hasSufficient = await hasSufficientBalance(fee);

    if (!hasSufficient) {
        return {
            success: false,
            fee,
            error: 'Insufficient wallet balance',
            message: `Your wallet balance is insufficient. Please deposit at least $${fee.toFixed(2)} to cover the overdue fee.`
        };
    }

    // Deduct the fee
    const result = await deductFromWallet(
        fee,
        'overdue_fee',
        packageId
    );

    return {
        success: result.success,
        fee,
        transactionId: result.transactionId,
        message: result.success
            ? `Overdue fee of $${fee.toFixed(2)} has been deducted from your wallet`
            : result.error
    };
};

/**
 * Validate deposit amount
 * Only allows preset amounts: $3, $5, $7, $10
 * @param {number} amount - Amount to validate
 * @returns {boolean} True if valid deposit amount
 */
export const isValidDepositAmount = (amount) => {
    const validAmounts = [3, 5, 7, 10];
    return validAmounts.includes(amount);
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
};

export default {
    getWalletBalance,
    hasSufficientBalance,
    deductFromWallet,
    calculateOverdueFee,
    processOverdueFee,
    isValidDepositAmount,
    formatCurrency
};
