<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Common\Helpers;
use App\Models\QaAffectedSerial;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\Datatables\Datatables;

class QADataQueryController extends Controller
{
    protected $_helpers;

    public function __construct()
    {
        $this->middleware('auth');
        $this->_helpers = new Helpers;
    }
    
    public function index()
    {
        $pages = session('pages');
        $permission = $this->_helpers->get_permission(Auth::user()->id, 'QADataQuery');

        return view('reports.qa_data_query', [
            'pages' => $pages,
            'read_only' => $permission->read_only,
            'authorize' => $permission->authorize,
            'current_url' => route('reports.qa-data-query')
        ]);
    }

    public function generate_data(Request $req)
    {
        $data = $this->get_filtered_data($req);
        return DataTables::of($data)->toJson();
    }

    private function get_filtered_data($req)
    {
        $search_type = "NULL";
        $search_value = "NULL";
        $max_count = 0;
        $oba_date_from = "NULL";
        $oba_date_to = "NULL";
        $exp_date_from = "NULL";
        $exp_date_to = "NULL";

        if (is_null($req->search_type) && is_null($req->oba_date_from) && is_null($req->exp_date_from)) {
            return [];
        } else {
            if (!is_null($req->search_type)) {
                $search_type = "'" . $req->search_type . "'";
            }
    
            if (!is_null($req->oba_date_from) && !is_null($req->oba_date_to)) {
                $oba_date_from = "'" . $req->oba_date_from . "'";
                $oba_date_to = "'" . $req->oba_date_to . "'";
            }
    
            if (!is_null($req->exp_date_from) && !is_null($req->exp_date_to)) {
                $exp_date_from = "'" . $req->exp_date_from . "'";
                $exp_date_to = "'" . $req->exp_date_to . "'";
            }
    
            if (!is_null($req->search_value)) {
                $search_value = "'" . $req->search_value . "'";
            }
    
            if (!is_null($req->max_count)) {
                // $max_count = "LIMIT " . $req->max_count . "";
                $max_count = $req->max_count;
            }
    
            $sql = "call spQADataQuery_GenerateData(".$search_type.",
                                    ".$search_value.",
                                    ".$max_count.",
                                    ".$oba_date_from.",
                                    ".$oba_date_to.",
                                    ".$exp_date_from.",
                                    ".$exp_date_to.")";
    
            $sql_data = DB::select(DB::raw($sql));

            $data = [];
            $data_obj = [];
            foreach ($sql_data as $key => $box) {
                $box_obj = [
                    'oba_date' => $box->oba_date,
                    'shift' => $box->shift,
                    'box_label' => $box->box_label,
                    'model_code' => $box->model_code,
                    'model_name' => $box->model_name,
                    'date_manufactured' => $box->date_manufactured,
                    'date_expired' => $box->date_expired,
                    'pallet_no' => $box->pallet_no,
                    'cutomer_pn' => $box->cutomer_pn,
                    'lot_no' => $box->lot_no,
                    'prod_line_no' => $box->prod_line_no,
                    'box_no' => $box->box_no,
                    'serial_nos' => $box->serial_nos,
                    'qty_per_box' => $box->qty_per_box,
                    'qc_incharge' => $box->qc_incharge,
                    'remarks' => $box->remarks
                ];

                $heat_sinks = QaAffectedSerial::where([
                    ['pallet_id','=',$box->pallet_id],
                    ['box_id','=',$box->box_id]
                ])->select('hs_serial')->get();

                $hs_obj = [];
                for ($i=1; $i <= 60; $i++) { 
                    $key = $i-1;
                    $hs = (!isset($heat_sinks[$key]))? "":$heat_sinks[$key]->hs_serial;

                    $hs_obj['product_'.$i] = $hs;
                }

                $data_obj = (object) array_merge($box_obj,$hs_obj);
                array_push($data, $data_obj);
            }
    
            return $data;
    
        }
    }
}