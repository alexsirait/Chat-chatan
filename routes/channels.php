<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chats.{uuid}', function ($user, $uuid) {
    return Auth::check(); // ke event
});
