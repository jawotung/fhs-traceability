"use strict";

(function() {
    const Reason = function() {
        return new Reason.init();
    }
    Reason.init = function() {
        $D.init.call(this);
        this.$tbl_reasons = "";
        this.id = 0;
        this.token = $("meta[name=csrf-token]").attr("content");
        this.cust_checked = 0;
    }
    Reason.prototype = {
        init: function() {},
        drawDatatables: function() {
            var self = this;
            if (!$.fn.DataTable.isDataTable('#tbl_reasons')) {
                self.$tbl_reasons = $('#tbl_reasons').DataTable({
                    processing: true,
                    ajax: {
                        url: "/masters/disposition-reasons/list",
                        dataType: "JSON",
                        error: function(response) {
                            console.log(response);
                        }
                    },
                    deferRender: true,
                    language: {
                        aria: {
                            sortAscending: ": activate to sort column ascending",
                            sortDescending: ": activate to sort column descending"
                        },
                        emptyTable: "No data available in table",
                        info: "Showing _START_ to _END_ of _TOTAL_ records",
                        infoEmpty: "No records found",
                        infoFiltered: "(filtered1 from _MAX_ total records)",
                        lengthMenu: "Show _MENU_",
                        search: "Search:",
                        zeroRecords: "No matching records found",
                        paginate: {
                            "previous": "Prev",
                            "next": "Next",
                            "last": "Last",
                            "first": "First"
                        }
                    },
                    pageLength: 10,
                    order: [
                        [5, "desc"]
                    ],
                    columns: [{
                            data: function(x) {
                                return '<input type="checkbox" class="table-checkbox check_reason" value="' + x.id + '">';
                            },
                            name: 'id',
                            searchable: false,
                            orderable: false
                        },
                        {
                            data: 'action',
                            name: 'action',
                            orderable: false,
                            searchable: false
                        },
                        { data: 'disposition', name: 'disposition' },
                        { data: 'reason', name: 'reason' },
                        { data: 'create_user', name: 'create_user' },
                        { data: 'updated_at', name: 'updated_at' },
                    ],
                    rowCallback: function(row, data) {
                        var td = $(row).find('td:first .check_reason');
                        if (td.is(':checked')) {
                            self.cust_checked++;
                        }
                    },
                    createdRow: function(row, data, dataIndex) {
                        if (data.is_deleted === 1) {
                            $(row).css('background-color', '#ff6266');
                            $(row).css('color', '#fff');
                        }
                    },
                    initComplete: function() {
                        $('.check_all_reasons').prop('checked', false);
                    },
                    fnDrawCallback: function() {
                        if (self.cust_checked > 9) {
                            $('.check_all_reasons').prop('checked', true);
                        } else {
                            $('.check_all_reasons').prop('checked', false);
                        }
                        self.checkCheckboxesInTable('#tbl_reasons', '.check_all_reasons', '.check_reason');
                        self.checkAllCheckboxesInTable('#tbl_reasons', '.check_all_reasons', '.check_reason');
                        $("#tbl_reasons").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
                    },
                }).on('page.dt', function() {
                    self.cust_checked = 0;
                });
            }
            return this;
        },
        clearForm: function(inputs) {
            var self = this;
            $('#disposition').val(null).trigger('change');
            $.each(inputs, function(i,x) {
                $('#'+x).val('');
                self.hideInputErrors(x);
            });
        }
    }
    Reason.init.prototype = $.extend(Reason.prototype, $D.init.prototype);
    Reason.init.prototype = Reason.prototype;

    $(document).ready(function() {
        var _Reason = Reason();

        _Reason.drawDatatables();

        $('#disposition').select2({
            allowClear: true,
            placeholder: 'Select Disposition',
            theme: 'bootstrap4',
            width: 'auto',
            ajax: {
                url: '/masters/disposition-reasons/get-dispositions',
                data: function(params) {
                    var query = "";
                    return {
                        q: params.term,
                        id: '',
                        text: '',
                        table: '',
                        condition: '',
                        display: 'id&text',
                        orderBy: '',
                        sql_query: query,

                    };
                },
                processResults: function(data) {
                    return {
                        results: data
                    };
                },
            }
        }).val(null).trigger('change.select2');

        $('#frm_reasons').on('submit', function(e) {
            e.preventDefault();
            $('#loading_modal').modal('show');
                
            var data = $(this).serializeArray();
            $.ajax({
                url: $(this).attr('action'),
                type: 'POST',
                dataType: 'JSON',
                data: data
            }).done(function(response, textStatus, xhr) {
                console.log(response);
                console.log(response.inputs);
                if (textStatus) {
                    switch (response.status) {
                        case "failed":
                            _Reason.showWarning(response.msg);
                            break;
                        case "error":
                            _Reason.ErrorMsg(response.msg);
                            break;
                        default:
                            _Reason.clearForm(response.inputs);
                            _Reason.$tbl_reasons.ajax.reload();
                            _Reason.showSuccess(response.msg);
                            break;
                    }
                    _Reason.id = 0;
                }
            }).fail(function(xhr, textStatus, errorThrown) {
                var errors = xhr.responseJSON.errors;
                _Reason.showInputErrors(errors);

                if (errorThrown == "Internal Server Error") {
                    _Reason.ErrorMsg(xhr);
                }
            }).always(function() {
                $('#loading_modal').modal('hide');
            });
        });
    });
})();


window.history.forward();

function noBack() {
    window.history.forward();
}
setTimeout("noBack()", 0);
window.onunload = function() { null };