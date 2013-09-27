<form role="form">
  <div class="form-group">
    <label for="widget-name">Name:</label>
    <input id="widget-name" class="form-control" name="name" type="text" value="<%= name %>"/>
  </div>
  
  <div class="form-group">
    <label for="widget-type">Type:</label>
    <input id="widget-type" class="form-control" name="type" type="text" value="<%= type %>"/>
  </div>
  <button class="btn btn-default js-submit">Submit changes</button>
</form>