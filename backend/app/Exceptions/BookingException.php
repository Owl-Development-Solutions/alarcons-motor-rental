<?php

namespace App\Exceptions;

use Exception;

/**
 * Generic domain exception for booking/payment business-rule violations.
 * Controllers catch this and turn it into a JSON response using
 * getStatusCode() — keeps services free of any HTTP concerns.
 */
class BookingException extends Exception
{
    protected int $statusCode;

    public function __construct(string $message, int $statusCode = 422)
    {
        parent::__construct($message);
        $this->statusCode = $statusCode;
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }
}