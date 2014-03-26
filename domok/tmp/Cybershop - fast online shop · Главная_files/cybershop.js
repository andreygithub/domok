cybershop.catalog = {
  options: {}

  , initialize: function(){
        $(document).ajaxStart(function() {
            $('#catalog_placeholder').animate({
                opacity : 0.4
            }, 500, 'swing' );
        });
        $(document).ajaxStop(function() {
            $('#catalog_placeholder').animate({
                opacity : 1
            }, 500, 'swing' );
        });
        
    $(document).on('click', '.pagination li', function(event){
      $('#catalog_placeholder').data('page', ($(this).val()));
      cybershop.catalog.get();
      event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    });

    $('.catalog_sort_select').change(function(event){
      var data = $(this).val().split(",");
      $('#catalog_placeholder').data('sortname', data[0]);
      $('#catalog_placeholder').data('sortdirection', data[1]);
      cybershop.catalog.get();
      event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    });

    $('.catalog_show_select').change(function(event){
      $('#catalog_placeholder').data('limit', $(this).val());
      $('#catalog_placeholder').data('page', '1');
      cybershop.catalog.get();
      event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    });

    $('.catalog_view a').click(function(event){
      var tpl = $(this).data('tpl');
      $('#catalog_placeholder').data('tpl', tpl);
      $('.catalog_view a').removeClass('active');
      cybershop.catalog.get();
      $(this).addClass('active');
      event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    });
    
    $('[type="checkbox"]').change(function(event){
      $('#catalog_placeholder').data('page', '1');
      cybershop.catalog.get();
      event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    });
    
    $('#catalog_price_slider').on('slideStop', function(event){
      var pv = $(this).slider('getValue');
      $('#catalog_placeholder').data('values', 'price1>=' + pv[0] + ',' + 'price1<=' + pv[1]);
      $('#catalog_placeholder').data('page', '1');
      cybershop.catalog.get();
      event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    });
  }

  , get: function(){
    var categorysArray = new Array();
    $('[name="category"]:checked').each(
      function(){
        categorysArray.push($(this).val());
      });

    var brandsArray = new Array();
    $('[name="brand"]:checked').each(
      function(){
        brandsArray.push($(this).val());
      });

    var filtersArray = new Array();
    $('[name="filter"]:checked').each(
      function(){
        filtersArray.push($(this).val());
      });

    var params = {};
    params.page = $('#catalog_placeholder').data('page');
    params.limit = $('#catalog_placeholder').data('limit');
    params.sortname = $('#catalog_placeholder').data('sortname');
    params.sortdirection = $('#catalog_placeholder').data('sortdirection');
    params.tpl = $('#catalog_placeholder').data('tpl');
    params.categorys = categorysArray.join(',');
    params.brands = brandsArray.join(',');
    params.filters = filtersArray.join(',');
    params.values = $('#catalog_placeholder').data('values');

    cybershop.hash.set(params);
    
    params.categorysgroupid = $('#catalog_placeholder').data('categorysgroupid');
    params.action = 'catalog';
    params.ctx = 'cybershopConfig.ctx';

    $.post($(this.options.action_url).val(), params, function(response){
      response = $.parseJSON(response);
      if (response.success) {
        if (response.message) {
          cybershop.message.success(response.message);
        }
        cybershop.catalog.show(response.data);


      }
      else {
        cybershop.message.error(response.message);
      }
    });

  }
  , show: function(data){
    $('#catalog_placeholder').html(data.result);
    $('#navigation_placeholder').html(data.navigation);
    $('.pagination').html(data.pagination);
  }
}



