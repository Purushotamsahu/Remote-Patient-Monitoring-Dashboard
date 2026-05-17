<?php

namespace App\Helpers;

class PhoneHelper
{
    /**
     * Format phone number to have +91 prefix
     * Accepts: 9876543210, +919876543210, +91 9876543210
     * Returns: +919876543210
     */
    public static function format($phone): ?string
    {
        if (empty($phone)) {
            return null;
        }

        // Remove all whitespace and special characters except + and digits
        $cleaned = preg_replace('/[^\d+]/', '', trim($phone));

        // If already has +91, return as is
        if (str_starts_with($cleaned, '+91')) {
            return $cleaned;
        }

        // If has + but not +91, remove it
        $cleaned = ltrim($cleaned, '+');

        // If 10 digits (Indian mobile/landline), add +91
        if (strlen($cleaned) === 10) {
            return '+91' . $cleaned;
        }

        // If 12 digits starting with 91, add +
        if (strlen($cleaned) === 12 && str_starts_with($cleaned, '91')) {
            return '+' . $cleaned;
        }

        // Invalid format - return original for validation error
        return null;
    }

    /**
     * Validate Indian phone number
     */
    public static function isValid($phone): bool
    {
        $formatted = self::format($phone);
        return $formatted !== null && preg_match('/^\+91[6-9]\d{9}$/', $formatted);
    }
}
