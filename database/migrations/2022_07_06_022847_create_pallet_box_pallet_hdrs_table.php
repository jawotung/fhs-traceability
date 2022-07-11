<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePalletBoxPalletHdrsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pallet_box_pallet_hdrs', function (Blueprint $table) {
            $table->id();
            $table->integer('transaction_id');
            $table->integer('model_id');
            $table->text('pallet_qr');
            $table->integer('pallet_status')->length(1)->default(0); // 0 = ON PROGRESS / 1 = FOR OBA / 2 = GOOD / 3 = REWORK / 4 = HOLD PALLET / 5 = HOLD LOT
            $table->string('pallet_location');
            $table->integer('create_user')->default(0);
            $table->integer('update_user')->default(0);
            $table->timestamps();
            $table->index(['id', 'model_id','transaction_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pallet_box_pallet_hdrs');
    }
}
