$.fn.s3IncludeForm = function(url, type, callback) {
		function time() {
			return (new Date()).getTime();
		}
		if ($.isFunction(type)) {
			callback = type;
			type = null;
		}

		url += (~url.indexOf('?') ? '&' : '?') + time();
		callback = callback || $.noop;

		return this.each(function() {

			var _this = this;
			var $this = $(this);
			var id = time();
			var key = 's3-include-form-id';

			$this.data(key, id);

			function init() {

				$this.find('form').on('submit', function(e) {
					e.preventDefault();
					$.post(url, $(this).serialize(), update);
				});

				try {

					$this.find('.init-calendar').each(function(i){
						new tcal({
							'controlname': this.id,
							'place': this.parentNode,
							'lang': 'ru'
						});
					});

					$this.find('.init-calendar-interval').each(function(){

						for(var j=0; j<2; ++j){

							var e = f_getElement(this.id + '['+j+']');

							new tcal({
								'controlname': e.id,
								'place': e.parentNode,
								'lang': 'ru',
								'intervalpair': [
									this.id + '[0]',
									this.id + '[1]'
								],
								'intervalupdatecont': this.id
							});
						}
					});

					var $captcha = $this.find('input[name=_cn]');
					if ($captcha.length) {
						$.getScript('http://captcha.oml.ru/static/captcha.js?2', function() {
							var $d = $captcha.prev();
							mgCaptcha.draw("/my/s3/captcha/get.php", ($d.length ? $d.get(0) : null));
						});
					}

				} catch (err) {}

			}


			function update(html, status) {
				
				if (status !== 'success' || $this.data(key) !== id) {
					return;
				}

				html = $.trim(html)
				
				switch (type) {
					case 'comment':
						html = html.split('<!--includeForm-->');
						html = html.length === 3 ? html[1] : '';
						html = $.parseHTML(html);
						break;

					case 'all':
						html = $.parseHTML(html);
						break;

					default:
						break;
				}
				$this.html(html);
				init();
				
				callback.call(_this, html, status);
			}

			$.get(url, update);

		});

	};
	
$(function() {
	
	$(".site-content-mid").find("ul").not(".static, .shop2-pagelist").addClass("site-ul");
	//$(".site-content-mid").find("ol").addClass("site-ol");
	
	
    
    $(window).on('load', function(){
    	
    	var titleSlider = $(".title-slider");
    	var titleBx = $("#title-bx")
    
	    if(titleBx.length > 0) {
	    	titleBx.bxSlider({
	        //pagerCustom: "#title-bx-pager"
	        prevText:"",
	        nextText:"",
	        mode:"fade",
	        //infiniteLoop:0,
	        //hideControlOnEnd:1,
	        onSliderLoad:function(){
	        	$("<div class='custom-bx-prev'>").prependTo( titleSlider.find(".bx-pager") );
	        	$("<div class='custom-bx-next'>").appendTo( titleSlider.find(".bx-pager") );
	        	$(".custom-bx-prev").on("click", function(){
	        		titleBx.goToPrevSlide();
	        	});
	        	$(".custom-bx-next").on("click", function(){
	        		titleBx.goToNextSlide();
	        	});
	        }
	    	});
	    	titleBx.goToSlide(1)	
	    }
    
    	var rabotiBx = $("#raboti-bx")
		if(rabotiBx.length > 0) {
			rabotiBx.bxSlider({
		        minSlides:3,
				maxSlides:3,
				moveSlides:3,
				slideWidth:220,
				slideMargin:11,
				pager:0,
				prevText:"",
				nextText:"",
	    	});
	    
	    	rabotiBx.goToSlide(1)	
	    }
	    
	    
	    startInfoWindow();

    });
    

    setTimeout(function() {

        setHeights();

        $(".title-why--box").equalHeightInRow({
            lineheight: true
        });
  
    }, 200);

    try{
    	$(".styler").styler();
    } catch (e){
    	console.log(e);
    }
    
	//pop
    var pop;
    var formUrls = {
    	'#zakazat_raschet':'zakazat-tochnyy-raschet',
    	'#napisat_nam':'napisat-nam'
    };

    $(".pop-call_").on("click", function(e) {
    	var dataPop = $(this).data('pop'),popName='#zakazat_raschet', custom = $(this).attr('pop-div'),formdata = $(this).data('formdata');
        e.preventDefault();
		if(custom) {
        	popName = $(this).attr('pop-div');
        }
    	pop = $(popName)         
        if(pop.find('[name=d\\[1\\]]').length==0){
	        pop.find('.pop-modal').s3IncludeForm('/'+formUrls[popName]+'?ajax=1',null,function(r){
				pop.css('top', Math.max(0, (($(window).height() - pop.outerHeight()) / 2) + $(window).scrollTop()) + "px").fadeIn();
				if(!custom) {
	        		pop.find('[name=d\\[4\\]]').val(formdata.replace(/#/g,"\n"));
	        	}
			});	
        } else {
	        if(!custom) {
	        	pop.find('[name=d\\[4\\]]').val(formdata.replace(/#/g,"\n"));
	        }	
        }
		
        pop.find('[name=d\\[3\\]]').val(dataPop);
        pop.fadeIn();
        $('.pop-back').fadeIn();
    });
    
    //$('.pop-back,.pop-hide').on("click", function(){
    //	pop.fadeOut();
     //   $('.pop-back').fadeOut();
    //});
	
});

//*******************
function setHeights(){
	$(".title-calc--tarif:visible").equalHeightInRow({
            child: ['ul']
    });
}
//tabs
function hideHeaderTabs() {
	try{
	    var activeBox = $('.title-calc--box.active');
	    var index = activeBox.index() + 1;
	    var attrmy = activeBox.find('[data-attrmy]').data('attrmy');
	    var siteButtons = $('.tariffs-top');
	    var calcOrange = $('.title-calc--orange');
	    var re = /([pos]\d)/gi;
	    var classList = calcOrange.attr('class').split(/\s+/);
	
	    siteButtons.filter('.' + attrmy).show();
	    siteButtons.filter(':not(.' + attrmy + ')').hide();
		
	    $.each(classList, function(index, item) {
	        if (item.search(re) != -1 ? true : false) {
	            calcOrange.removeClass(item);
	        }
	    });
	    calcOrange.addClass('pos' + index);
	
	    setMiniTabs(activeBox, attrmy);
	} catch (e){
		console.log(e);
	}
}

function setMiniTabs(activeBox, attrmy) {

    var siteButtonsVisible = $('.tariffs-top.' + attrmy + ' .site-button.small');
    
    $('.tariffs-top.' + attrmy + ' .site-button.small').removeClass('active');
    siteButtonsVisible.eq(0).addClass('active');
    if(siteButtonsVisible.eq(0).next('.desc').length) {
	   siteButtonsVisible.eq(0).siblings('.tariffs-desc').html(siteButtonsVisible.eq(0).next('.desc').html());
	}
}

function showContentTabs(index, subindex) {
	index = index || 0;
	subindex = subindex || 0;
	$('.title-calc--tarif_wrap,.title-tariffs-tab').hide();
    $('.title-tariffs-tab').eq(index).show();
    $('.title-tariffs-tab').eq(index).find('.title-calc--tarif_wrap').eq(subindex).show();
    setHeights();
}
// add info-blocks on page calc1
function startInfoWindow() {
	
	if(!!$('#infoWindow').length) {
		//добавление инфоокон
		var infoWindow = $.parseJSON($('#infoWindow').text()), text;
	    
	    for(var i in infoWindow){
	    	var label = $('label:contains("'+infoWindow[i].title+'")');
	    	if(label.find('.site-hint').length==0) {
	    		text = infoWindow[i].text;
	    		label.append('&nbsp<div class="site-hint"><div class="site-hint-box">' + text +'</div></div>');	
	    	}
	    }
	    $('label[data-item]').each(function(){
	    	if($('[data-key='+$(this).attr('data-item')+']').length && $(this).find('.site-hint').length==0) {
	    		$(this).append('&nbsp<div class="site-hint"><div class="site-hint-box">' + $('[data-key='+$(this).attr('data-item')+']').html() +'</div></div>');
	    	}
	    })
	}
}
$(function() {
	if(location.pathname == '/'){
	    hideHeaderTabs();
	    showContentTabs();
	
		$('.title-calc--box').on('click', function() {
	        $('.title-calc--box').removeClass('active');
	        $(this).addClass('active');
	
	        hideHeaderTabs();
	        showContentTabs($(this).index());
	    });
	    
	    $('.site-button.small').on('click', function() {
			
	        $('.site-button.small').removeClass('active');
	        $(this).addClass('active');
			if($(this).next('.desc').length) {
				$(this).siblings('.tariffs-desc').html($(this).next('.desc').html());
			}
	        showContentTabs($('.title-tariffs-tab:visible').index(), $(this).attr('data-stab'));
	        
	    });
	}
});
//tabs[end]


function number_format(number, decimals, dec_point, thousands_sep) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://getsprink.com)
    // +     bugfix by: Benjamin Lupton
    // +     bugfix by: Allan Jensen (http://www.winternet.no)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +     bugfix by: Howard Yeend
    // +    revised by: Luke Smith (http://lucassmith.name)
    // +     bugfix by: Diogo Resende
    // +     bugfix by: Rival
    // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
    // +   improved by: davook
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Jay Klehr
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Amir Habibi (http://www.residence-mixte.com/)
    // +     bugfix by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +   improved by: Drew Noakes
    // *     example 1: number_format(1234.56);
    // *     returns 1: '1,235'
    // *     example 2: number_format(1234.56, 2, ',', ' ');
    // *     returns 2: '1 234,56'
    // *     example 3: number_format(1234.5678, 2, '.', '');
    // *     returns 3: '1234.57'
    // *     example 4: number_format(67, 2, ',', '.');
    // *     returns 4: '67,00'
    // *     example 5: number_format(1000);
    // *     returns 5: '1,000'
    // *     example 6: number_format(67.311, 2);
    // *     returns 6: '67.31'
    // *     example 7: number_format(1000.55, 1);
    // *     returns 7: '1,000.6'
    // *     example 8: number_format(67000, 5, ',', '.');
    // *     returns 8: '67.000,00000'
    // *     example 9: number_format(0.9, 0);
    // *     returns 9: '1'
    // *    example 10: number_format('1.20', 2);
    // *    returns 10: '1.20'
    // *    example 11: number_format('1.20', 4);
    // *    returns 11: '1.2000'
    // *    example 12: number_format('1.2000', 3);
    // *    returns 12: '1.200'
    var n = !isFinite(+number) ? 0 : +number, 
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        toFixedFix = function (n, prec) {
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            var k = Math.pow(10, prec);
            return Math.round(n * k) / k;
        },
        s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

window.onload=function(){
	/**
     * loading reviews for main page
     */
    $('.title-reviews--in').load('/otzyvy?ajax=1', function(data){ 
    	//console.log('done!'); 
	});
	//Обработка инфоокон
    $(document).on("click",".site-hint", function(event){
    	$(this).toggleClass("active");
    	event.stopPropagation();
    });
}

$(window).load(function(){ 
	$(".styler").styler();
});

$(document).ready(function () {
    $(".pop-call").on("click", function (e) {
        //location.href = "/Home/Feedback";
        $.fancybox.defaults.minWidth = 350;
        $.fancybox.defaults.minHeight = 220;
        $.fancybox($("#perezvonite_nam"));
        return false;
    })
    $(".pop-feed").on("click", function (e) {
        //location.href = "/Home/Feedback";
        $.fancybox.defaults.minWidth = 500;
        $.fancybox.defaults.minHeight = 500;
        $.fancybox($("#pismo_nam"));
        return false;
    })
})