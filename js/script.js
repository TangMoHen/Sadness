$(document).ready(function(){
	
	$('.item .delete').click(function(){
		
		var elem = $(this).closest('.item');
		
		$.confirm({
			'title'		: '提示',
			'message'	: '你确定要删除地址吗？',
			'buttons'	: {
				'是'	: {
					'class'	: 'blue',
					'action': function(){
						elem.slideUp();
					}
				},
				'否'	: {
					'class'	: 'gray',
					'action': function(){}	// Nothing to do in this case. You can as well omit the action property.
				}
			}
		});
		
	});
	
});