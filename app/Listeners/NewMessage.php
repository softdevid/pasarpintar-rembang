<?php

namespace App\Listeners;

use App\Events\NewMessageEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NewMessage
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\NewMessageEvent  $event
     * @return void
     */
    public function handle(NewMessageEvent $event)
    {
        //
    }
}
