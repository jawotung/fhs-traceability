<?php

use App\Events\PalletTransferred;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/login');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::group(['prefix' => 'masters'], function () {
    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [App\Http\Controllers\Masters\UsersMasterController::class, 'index'])->name('masters.users');
        Route::get('/list', [App\Http\Controllers\Masters\UsersMasterController::class, 'user_list'])->name('masters.users.list');
        Route::get('/page-list', [App\Http\Controllers\Masters\UsersMasterController::class, 'page_list'])->name('masters.users.page-list');
        Route::post('/save-user', [App\Http\Controllers\Masters\UsersMasterController::class, 'save_user'])->name('masters.users.save');
        Route::post('/delete-user', [App\Http\Controllers\Masters\UsersMasterController::class, 'delete_user'])->name('masters.users.delete');
        Route::post('/save-user-access', [App\Http\Controllers\Masters\UsersMasterController::class, 'save_user_access'])->name('masters.users.save-user-access');
    });

    Route::group(['prefix' => 'page'], function () {
        Route::get('/', [App\Http\Controllers\Masters\PageMasterController::class, 'index'])->name('masters.page');
        Route::get('/list', [App\Http\Controllers\Masters\PageMasterController::class, 'page_list'])->name('masters.page.list');
        Route::post('/save-page', [App\Http\Controllers\Masters\PageMasterController::class, 'save_page'])->name('masters.page.save');
        Route::post('/delete-page', [App\Http\Controllers\Masters\PageMasterController::class, 'delete_page'])->name('masters.page.delete');
    });

    Route::group(['prefix' => 'customers'], function () {
        Route::get('/', [App\Http\Controllers\Masters\CustomerMasterController::class, 'index'])->name('masters.customers');
        Route::get('/list', [App\Http\Controllers\Masters\CustomerMasterController::class, 'customer_list'])->name('masters.customers.list');
        Route::post('/save-customer', [App\Http\Controllers\Masters\CustomerMasterController::class, 'save_customer'])->name('masters.customers.save');
        Route::post('/delete-customer', [App\Http\Controllers\Masters\CustomerMasterController::class, 'delete_customer'])->name('masters.customers.delete');
    });

    Route::group(['prefix' => 'qa-disposition'], function () {
        Route::get('/', [App\Http\Controllers\Masters\QADispositionMasterController::class, 'index'])->name('masters.qa-disposition');
        Route::get('/list', [App\Http\Controllers\Masters\QADispositionMasterController::class, 'disposition_list'])->name('masters.qa-disposition.list');
        Route::post('/save-disposition', [App\Http\Controllers\Masters\QADispositionMasterController::class, 'save_disposition'])->name('masters.qa-disposition.save');
        Route::post('/delete-disposition', [App\Http\Controllers\Masters\QADispositionMasterController::class, 'delete_disposition'])->name('masters.qa-disposition.delete');
    });

    Route::group(['prefix' => 'disposition-reasons'], function () {
        Route::get('/', [App\Http\Controllers\Masters\DispositionReasonMasterController::class, 'index'])->name('masters.disposition-reasons');
        Route::get('/list', [App\Http\Controllers\Masters\DispositionReasonMasterController::class, 'reason_list'])->name('masters.disposition-reasons.list');
        Route::get('/get-dispositions', [App\Http\Controllers\Masters\DispositionReasonMasterController::class, 'get_dispositions'])->name('masters.disposition-reasons.get-dispositions');
        Route::post('/save-reason', [App\Http\Controllers\Masters\DispositionReasonMasterController::class, 'save_reason'])->name('masters.disposition-reasons.save');
        Route::post('/delete-reason', [App\Http\Controllers\Masters\DispositionReasonMasterController::class, 'delete_reason'])->name('masters.disposition-reasons.delete');
    });

    Route::group(['prefix' => 'model-matrix'], function () {
        Route::get('/', [App\Http\Controllers\Masters\BoxPalletModelMatrixController::class, 'index'])->name('masters.model-matrix');
        Route::get('/list', [App\Http\Controllers\Masters\BoxPalletModelMatrixController::class, 'model_matrix_list'])->name('masters.model-matrix.list');
        Route::post('/save-model', [App\Http\Controllers\Masters\BoxPalletModelMatrixController::class, 'save_model'])->name('masters.model-matrix.save');
        Route::post('/delete-model', [App\Http\Controllers\Masters\BoxPalletModelMatrixController::class, 'delete_model'])->name('masters.model-matrix.delete');
    });

    Route::group(['prefix' => 'heat-sink-ng-reasons'], function () {
        Route::get('/', [App\Http\Controllers\Masters\HeatSinkNGReasonMasterController::class, 'index'])->name('masters.heat-sink-ng-reasons');
        Route::get('/list', [App\Http\Controllers\Masters\HeatSinkNGReasonMasterController::class, 'reason_list'])->name('masters.heat-sink-ng-reasons.list');
        Route::post('/save-reason', [App\Http\Controllers\Masters\HeatSinkNGReasonMasterController::class, 'save_reason'])->name('masters.heat-sink-ng-reasons.save');
        Route::post('/delete-reason', [App\Http\Controllers\Masters\HeatSinkNGReasonMasterController::class, 'delete_reason'])->name('masters.box-ng-reasons.delete');
    });
});

Route::group(['prefix' => 'reports'], function () {
    Route::group(['prefix' => 'pallet-tracking-history'], function () {
        Route::get('/', [App\Http\Controllers\Reports\PalletTrackingHistoryController::class, 'index'])->name('reports.pallet-tracking-history');
    });

    Route::group(['prefix' => 'box-pallet-data-search'], function () {
        Route::get('/', [App\Http\Controllers\Reports\BoxAndPalletDataSearchController::class, 'index'])->name('reports.box-pallet-data-search');
        Route::get('/generate-data', [App\Http\Controllers\Reports\BoxAndPalletDataSearchController::class, 'generate_data'])->name('reports.box-pallet-data-search.generate-data');
    });

    Route::group(['prefix' => 'qa-data-query'], function () {
        Route::get('/', [App\Http\Controllers\Reports\QADataQueryController::class, 'index'])->name('reports.qa-data-query');
        Route::get('/generate-data', [App\Http\Controllers\Reports\QADataQueryController::class, 'generate_data'])->name('reports.qa-data-query.generate-data');
    });
});

Route::group(['prefix' => 'transactions'], function () {
    Route::group(['prefix' => 'box-and-pallet'], function () {
        Route::get('/', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'index'])->name('transactions.box-and-pallet');
        Route::get('/get-models', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'get_models'])->name('transactions.box-and-pallet.get-models');
        Route::post('/get-transactions', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'model_transaction_list'])->name('transactions.box-and-pallet.get-transactions');
        Route::post('/proceed', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'proceed'])->name('transactions.box-and-pallet.proceed');
        Route::post('/get-pallets', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'get_pallets'])->name('transactions.box-and-pallet.get-pallets');
        Route::post('/get-boxes', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'get_boxes'])->name('transactions.box-and-pallet.get-boxes');
        Route::post('/save-box', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'save_box'])->name('transactions.box-and-pallet.save-box');
        Route::post('/update-box', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'update_box'])->name('transactions.box-and-pallet.update-box');
        Route::post('/print-pallet', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'print_pallet'])->name('transactions.box-and-pallet.print-pallet');
        Route::get('/print-preview', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'print_preview'])->name('transactions.box-and-pallet.print-preview');
        Route::post('/transfer-to', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'transfer_to'])->name('transactions.box-and-pallet.transfer-to');
        Route::get('/check-authorization', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'check_authorization'])->name('transactions.box-and-pallet.check-authorization');
        Route::post('/set-new-box-count', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'set_new_box_count'])->name('transactions.box-and-pallet.set-new-box-count');
        Route::post('/delete-transaction', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'delete_transaction'])->name('transactions.box-and-pallet.delete-transaction');
        Route::post('/get-affected-serial-no', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'get_affected_serial_no'])->name('transactions.box-and-pallet.get-affected-serial-no');
        Route::post('/get-box-history', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'get_box_history'])->name('transactions.box-and-pallet.get-box-history');
        Route::post('/move-to-pallet-history', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'move_to_pallet_history'])->name('transactions.box-and-pallet.move-to-pallet-history');
        Route::get('/get-pallet-history', [App\Http\Controllers\Transactions\BoxAndPalletApplicationController::class, 'get_pallet_history'])->name('transactions.box-and-pallet.get-pallet-history');
    });

    Route::group(['prefix' => 'qa-inspection'], function () {
        Route::get('/', [App\Http\Controllers\Transactions\QAInspectionController::class, 'index'])->name('transactions.qa-inspection');
        Route::post('/get-pallets', [App\Http\Controllers\Transactions\QAInspectionController::class, 'pallet_list'])->name('transactions.qa-inspection.get-pallets');
        Route::post('/get-boxes', [App\Http\Controllers\Transactions\QAInspectionController::class, 'get_boxes'])->name('transactions.qa-inspection.get-boxes');
        Route::post('/get-inspection-sheet-serials', [App\Http\Controllers\Transactions\QAInspectionController::class, 'get_inspection_sheet_serials'])->name('transactions.qa-inspection.get-inspection-sheet-serials');
        Route::post('/check-inspection-sheet', [App\Http\Controllers\Transactions\QAInspectionController::class, 'check_inspection_sheet'])->name('transactions.qa-inspection.check-inspection-sheet');
        Route::get('/get-lot-no', [App\Http\Controllers\Transactions\QAInspectionController::class, 'get_lot_no'])->name('transactions.qa-inspection.get-lot-no');
        Route::get('/get-hs-ng-remarks', [App\Http\Controllers\Transactions\QAInspectionController::class, 'get_hs_ng_remarks'])->name('transactions.qa-inspection.get-hs-ng-remarks');
        Route::post('/hs-serial-judgment', [App\Http\Controllers\Transactions\QAInspectionController::class, 'hs_serial_judgment'])->name('transactions.qa-inspection.hs-serial-judgment');
        Route::post('/set-hs-ng-remarks', [App\Http\Controllers\Transactions\QAInspectionController::class, 'set_hs_ng_remarks'])->name('transactions.qa-inspection.set-hs-ng-remarks');
        Route::post('/scan-hs-serial', [App\Http\Controllers\Transactions\QAInspectionController::class, 'scan_hs_serial'])->name('transactions.qa-inspection.scan-hs-serial');
        Route::post('/get-affected-serial-no', [App\Http\Controllers\Transactions\QAInspectionController::class, 'get_affected_serial_no'])->name('transactions.qa-inspection.get-affected-serial-no');
        Route::get('/get-dispositions', [App\Http\Controllers\Transactions\QAInspectionController::class, 'get_dispositions'])->name('transactions.qa-inspection.get-dispositions');
        Route::post('/set-disposition', [App\Http\Controllers\Transactions\QAInspectionController::class, 'set_disposition'])->name('transactions.qa-inspection.set-disposition');
        Route::get('/get-disposition-reasons', [App\Http\Controllers\Transactions\QAInspectionController::class, 'get_disposition_reasons'])->name('transactions.qa-inspection.get-disposition-reasons');
        Route::get('/get-pallet-lot', [App\Http\Controllers\Transactions\QAInspectionController::class, 'get_pallet_lot'])->name('transactions.qa-inspection.get-pallet-lot');
        Route::post('/transfer-to', [App\Http\Controllers\Transactions\QAInspectionController::class, 'transfer_to'])->name('transactions.qa-inspection.transfer-to');
        Route::get('/get-box-details', [App\Http\Controllers\Transactions\QAInspectionController::class, 'get_box_details'])->name('transactions.qa-inspection.get-box-details');
        Route::post('/set-shift', [App\Http\Controllers\Transactions\QAInspectionController::class, 'set_shift'])->name('transactions.qa-inspection.set-shift');
        Route::post('/set-new-box-to-inspect', [App\Http\Controllers\Transactions\QAInspectionController::class, 'set_new_box_to_inspect'])->name('transactions.qa-inspection.set-new-box-to-inspect');
        Route::post('/get-hs-history', [App\Http\Controllers\Transactions\QAInspectionController::class, 'get_hs_history'])->name('transactions.qa-inspection.get-hs-history');
    });

    Route::group(['prefix' => 'warehouse'], function () {
        Route::get('/', [App\Http\Controllers\Transactions\WarehouseController::class, 'index'])->name('transactions.warehouse');
        Route::get('/get-customer-destinations', [App\Http\Controllers\Transactions\WarehouseController::class, 'get_customer_destinations'])->name('transactions.warehouse.get-customer-destinations');
        Route::post('/get-models-for-ship', [App\Http\Controllers\Transactions\WarehouseController::class, 'get_model_for_ship'])->name('transactions.warehouse.get-models-for-ship');
    });

    
});

Route::group(['prefix' => 'notifications'], function () {
    Route::get('/show', [App\Common\Helpers::class, 'show_notification'])->name('notifications.show');
    Route::post('/read', [App\Common\Helpers::class, 'read_notification'])->name('notifications.read');
});

Route::post('/authenticate', [App\Common\Helpers::class, 'authenticate'])->name('authenticate');