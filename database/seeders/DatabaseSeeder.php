<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        collect([
            [
                'name' => 'Alex Sirait',
                'username' => 'alexsirait',
                'email' => 'alexsirait@gmail.com',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'Bobi Sirait',
                'username' => 'bobisirait',
                'email' => 'bobisirait@gmail.com',
                'password' => bcrypt('password'),
            ]
        ])->each(fn ($user) => User::create($user));

        User::factory(10)->create();
    }
}
