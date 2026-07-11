<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Thin wrapper around UploadThing's REST API so removing an image from
 * a car (or a payment proof) also deletes the underlying file, instead
 * of leaving orphaned files in your UploadThing storage.
 *
 * Requires UPLOADTHING_TOKEN in .env (the same API key your Next.js
 * app uses). This is best-effort: failures are logged, not thrown,
 * since a failed remote delete shouldn't block the user's action of
 * removing the image from the car/booking record.
 */
class UploadThingService
{
    public function deleteByUrl(string $url): bool
    {
        $fileKey = $this->extractFileKey($url);

        if(!$fileKey) {
            Log::warning('Uploadthing: could not extract file key from URL', ['url' => $url]);

            return false;
        }

        try {
            $response = Http::withHeaders([
                'X-Uploadthing-Api-Key' => config('services.uploadthing.token'),
                'Content-Type' => 'application/json',
            ])->post('https://api.uploadthing.com/v6/deleteFiles', [
                'fileKeys' => [$fileKey]
            ]);

            if(!$response->successful()) {
                Log::warning('Uploadthing delete failed', [
                    'url'       => $url,
                    'status'    => $response->status(),
                    'body'      => $response->body()
                ]);

                return false;
            }

            return true;

        } catch (\Throwable $e) {
            Log::warning('Uploadthing delete threw an exception', [
                'url'   => $url,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * UploadThing URLs look like https://<app>.ufs.sh/f/<fileKey>
     * (or the legacy https://utfs.io/f/<fileKey>). The key is the
     * last path segment.
     */
    public function extractFileKey(string $url): ?string
    {
        $path = parse_url($url, PHP_URL_PATH);

        if(!$path) {
            return null;
        }

        $segments = array_values(array_filter(explode('/', $path)));

        return end($segments) ?: null;
    }
}