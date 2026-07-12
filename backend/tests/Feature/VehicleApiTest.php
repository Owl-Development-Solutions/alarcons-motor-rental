<?php

it('returns the vehicles listing endpoint successfully', function () {
    $response = $this->getJson('/api/v1/vehicles');

    $response->assertOk();
    $response->assertJsonStructure([
        'data' => [['id', 'name']],
    ]);
});
