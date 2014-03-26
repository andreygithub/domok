cybershop = {
	initialize: function() {

   

//		// Indicator of active ajax request
//		ajaxProgress = false;
//		$(document)
//			.ajaxStart(function() {ajaxProgress = true;})
//			.ajaxStop(function() {ajaxProgress = false;});

		if(!jQuery().ajaxForm) {
			document.write('<script src="'+cybershopConfig.jsUrl+'lib/jquery.form.min.js"><\/script>');
		}
		if(!jQuery().jGrowl) {
			document.write('<script src="'+cybershopConfig.jsUrl+'lib/jquery.jgrowl.min.js"><\/script>');
		}

		$(document).on('click', 'a.cs_link,button.cs_link', function(e) {
			var action = $(this).data('action');
			switch (action) {
				case 'cart/add': cybershop.cart.add($(this).data('id'), $(this).data('complectid'), $(this).data('count'), $(this).data('options')); break;
				case 'cart/remove': cybershop.cart.remove($(this).data('key')); break;
				case 'cart/clean': cybershop.cart.clean(); break;
				case 'order/submit': cybershop.order.submit(); break;
				case 'order/clean': cybershop.order.clean(); break;
				default: return;
			}
			return false;
		});

		$(document).on('change', 'input[name="count"]', function(e) {
			cybershop.cart.change($(this).data('key'), $(this).val());
			return false;
		});

		$(document).on('submit', 'form.cs_form', function(e) {
			var action = $(this).data('action');
			switch (action) {
				case 'cart/add':
					var json = {};
					$.map($(this).serializeArray(), function(n, i) {
						json[n['name']] = n['value'];
					});
					var id = json['id']; delete(json['id']);
					var count = json['count']; delete(json['count']);
					var complectid = json['complectid']; delete(json['complectid']);
					cybershop.cart.add(id, complectid, count, json);
				break;
				default: return false;
			}
			return false;
		});

		$(document).ready(function() {
			$.jGrowl.defaults.closerTemplate = '<div>[ '+cybershopConfig.close_all_message+' ]</div>';
			cybershop.order.initialize('#cs_order');
		});
	}
};