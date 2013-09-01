<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">New widget</h4>
        </div>
        <div class="modal-body">
            <form role="form">
                <div class="form-group">
                    <label for="widget-name">Name:</label>
                    <input id="widget-name" class="form-control" name="name" type="text" value="<%= name %>"/>
                </div>
                
                <div class="form-group">
                    <label for="widget-type">Type:</label>
                    <input id="widget-type" class="form-control" name="type" type="text" value="<%= type %>"/>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    </div>
</div>