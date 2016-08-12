(function () {
	
function showPrice(val) {
 return number_format(val,null,null,' ')
}
    calc.init = function () {
        calc.elements = {
            wrap: $('.calc')
        };
        calc.elements = {
            wrap: calc.elements.wrap,
            info: calc.elements.wrap.find('.calc-info'),
            checkbox: calc.elements.wrap.find('[type=checkbox]'),
			radio : calc.elements.wrap.find('[type=radio]'),
            calc_table: calc.elements.wrap.find('.calc-calculate'),
            result_table: calc.elements.wrap.find('.calc-results'),
            calc_order: calc.elements.wrap.find('.calc-order'),

            vidkotla_wrap: calc.elements.wrap.find('.calc-param-vidkotla'),
            vendor: calc.elements.wrap.find('.calc-param-vendor'),
            boylertype: calc.elements.wrap.find('.calc-param-boylertype'),
            smoketype: calc.elements.wrap.find('.calc-param-smoketype'),
            floor: calc.elements.wrap.find('.calc-param-floor_square'),

            automatic: calc.elements.wrap.find('.calc-automatic'),

            kotelnaya: calc.elements.wrap.find('[name=kotelnaya]'),
            radiators: calc.elements.wrap.find('[name=radiators]'),
            floor_square: calc.elements.wrap.find('[name=floor_square]'),

            calc_results_list: calc.elements.wrap.find('.calc-results-list'),
     calc_results_discount : calc.elements.wrap.find('.result-discount'),
            goto_calc: calc.elements.wrap.find('[name=goto_calc]'),
            goto_discount: calc.elements.wrap.find('[name=goto_discount]'),
            goto_order: calc.elements.wrap.find('[name=goto_order]'),
            goto_result: calc.elements.wrap.find('[name=calculate]'),

            includeform: calc.elements.wrap.find('.calc-includeform')
        }
        calc.params = {};
        calc.materials = 0;
        calc.work = 0;
        calc.total = 0;
        calc.elements.info.hover(calc.show_info, calc.show_info);
        calc.elements.checkbox.change(calc.change_param);

		//calc.elements.radio.attr('checked',false);
        calc.elements.radio.change(calc.change_param);


        calc.elements.automatic.click(calc.automatic);

        calc.elements.goto_calc.click(calc.goto_calc);
        calc.elements.goto_result.click(calc.show_calculate);
        calc.elements.goto_discount.click(calc.show_discount);
        calc.elements.goto_order.click(calc.show_form);

       

    };
    calc.show_info = function () {
        calc.elements.info.not(this).removeClass('calc-info-active');
        if ($(this).is('.calc-info')) {
            $(this).toggleClass('calc-info-active');
        }
    };
    calc.change_param = function () {
        calc.elements.wrap.find('[name="' + $(this).attr('name') + '"]').not(this).attr('checked', false);
        calc.elements.wrap.find('[name="' + $(this).attr('name') + '"]').not(this).parents('label').removeClass('active');
        if ($(this).is(':checked')) {
            $(this).parents('label:first').addClass('active');
            calc.params[$(this).attr('name')] = $(this).val();
        } else {
            $(this).parents('label:first').removeClass('active');
            calc.params[$(this).attr('name')] = '';
        }
        ;
        calc.change_value($(this).attr('name'));
    };
    calc.change_value = function (param) {
        switch (param) {
            case 'toplivo' :
            {
                if (calc.params.toplivo != '') {
                    if (calc.data.toplivo[calc.params.toplivo].type == 1) {
                        calc.elements.vidkotla_wrap.slideDown();
                        calc.elements.vendor.slideUp();
                    } else {
                        calc.elements.vidkotla_wrap.slideUp();
                        calc.set_vendor();
                        calc.elements.vendor.slideDown();
                    }
                } else {
                    calc.elements.vidkotla_wrap.slideUp();
                    calc.elements.vendor.slideUp();
                }
                startInfoWindow();


                break;
            }
                ;
            case 'vidkotla' :
            {
                if (calc.params.vidkotla != '') {
                    calc.set_vendor();
                    calc.elements.vendor.slideDown();
                } else {
                    calc.elements.vendor.slideUp();
                }
                ;
                calc.params.vendor = null;
                break;
            }
                ;
            case 'boyler' :
            {
                if (calc.params.boyler != '') {
                    calc.elements.boylertype.slideDown();
                } else {
                    calc.elements.boylertype.slideUp();
                }
                break;
            }
                ;
            case 'smoke' :
            {
                if (calc.params.smoke != '') {
                    calc.elements.smoketype.slideDown();
                } else {
                    calc.elements.smoketype.slideUp();
                }
                break;
            }
                ;
            case 'floor' :
            {
                if (calc.params.floor != '') {
                    calc.elements.floor.find('.param-additional').slideDown();
                } else {
                    calc.elements.floor.find('.param-additional').slideUp();
                }
                break;
            }
        }
    };
    calc.set_vendor = function () {
        var html = '<div class="calc--label bold param-name">Производители:</div>';
        if (calc.data.toplivo[calc.params.toplivo].type == 1) {
            for (var i = 0; i < calc.data.toplivo[calc.params.toplivo].params[calc.params.vidkotla].vendors.length; i++) {
            	var item = calc.data.toplivo[calc.params.toplivo].params[calc.params.vidkotla].vendors[i].name;
                html += '<label class="calc--inline_label" data-item="'+item+'"><input type="radio" class="styler" name="vendor" value="' + i + '">' + calc.data.toplivo[calc.params.toplivo].params[calc.params.vidkotla].vendors[i].name + '</label><br>';
            }
        } else {
            for (var i = 0; i < calc.data.toplivo[calc.params.toplivo].vendors.length; i++) {
            	var item = calc.data.toplivo[calc.params.toplivo].vendors[i].item;
                html += '<label class="calc--inline_label" data-item="'+item+'"><input type="radio" class="styler" name="vendor" value="' + i + '">' + calc.data.toplivo[calc.params.toplivo].vendors[i].name  + '</label><br>';
            }
        }
        
        html += '<div class="calc-clear"></div>';
        calc.elements.vendor.html(html);
        calc.params.vendor = null;
        calc.elements.vendor.find('[type=checkbox],[type=radio]').change(calc.change_param);
        calc.elements.info = calc.elements.wrap.find('.calc-info');
        calc.elements.vendor.find('.calc-info').hover(calc.show_info, calc.show_info);
        $(".styler").styler();
        return false;
    };
    calc.automatic = function () {
        calc.elements.radiators.val(calc.elements.kotelnaya.val() / 10 > 0 ? Math.ceil(calc.elements.kotelnaya.val() / 10) : 0)
        calc.elements.kotelnaya
    };
    calc.goto_calc = function () {
        calc.elements.result_table.hide();
        calc.elements.calc_table.show();
    };
    calc.show_calculate = function () {
        if (calc.check_errors()){
			alert("Не все обязательные поля заполнены...")
		}
		else{
            calc.calculate();

            var html = '<!-- +[.calc2- -result] --> <div class="calc2--result cls">';
            var htmlCalcResult = '';

            html += '<div class="calc2--row"><div class="calc2--row_text">Отапливаемая площадь</div><div class="calc2--row_label orange">' + calc.elements.kotelnaya.val() + ' м<sup>2</sup></div></div>';

            html += '<div class="calc2--row"><div class="calc2--row_text"><small>Котельная</small>' + calc.prices.toplivo.text2 + '</div><div class="calc2--row_label">' + showPrice(calc.prices.toplivo.price) + ' руб.</div></div>';

            if (calc.params.boyler || calc.params.boyler == "0"){
                html += '<div class="calc2--row"><div class="calc2--row_text"><small>Бойлер</small>' + (calc.data.boyler[calc.params.boylertype].text2 ? calc.data.boyler[calc.params.boylertype].text2 : '') + '</div><div class="calc2--row_label">' + showPrice(calc.data.boyler[calc.params.boylertype].price) + ' руб.</div></div>';
                
            }

            if (calc.params.tube || calc.params.tube == "0") {
                html += '<div class="calc2--row"><div class="calc2--row_text"><small>Трубы</small>' + (calc.prices.tube.text2 ? calc.prices.tube.text2 : '') + '</div><div class="calc2--row_label">' + showPrice(calc.prices.tube.price + calc.prices.tube.work) + ' руб.</div></div>';
            }

            

            if (parseFloat(calc.elements.radiators.val()) > 0 && (calc.params.radiatortype || calc.params.radiatortype == "0" )){
                html += '<div class="calc2--row"><div class="calc2--row_text"><small>Тип радиаторов</small>' + calc.prices.radiators.text2 + '</div><div class="calc2--row_label">' + showPrice(calc.prices.radiators.price) + ' руб.</div></div>';
            }

            if (parseFloat(calc.elements.radiators.val()) > 0 && (calc.params.obvyazka || calc.params.obvyazka == "0" )){
                html += '<div class="calc2--row"><div class="calc2--row_text"><small>Обвязка радиаторов</small>' + calc.prices.obvyazka.text2 + '</div><div class="calc2--row_label">' + showPrice(calc.prices.obvyazka.price) + ' руб.</div></div>';
            }

            if (calc.params.floor || calc.params.floor == "0"){
                html += '<div class="calc2--row"><div class="calc2--row_text"><small>Водяные теплые полы</small>' + calc.prices.floor.text2 + '</div><div class="calc2--row_label">' + showPrice(calc.prices.floor.price) + ' руб.</div></div>';
                
            }

            if (calc.params.freeze || calc.params.freeze == "0"){
                html += '<div class="calc2--row"><div class="calc2--row_text"><small>Антифриз</small>' + calc.prices.freeze.text2 + '</div><div class="calc2--row_label">' + showPrice(calc.prices.freeze.price + calc.prices.freeze.work) + ' руб.</div></div>';
            }
            
            if (calc.params.smoke || calc.params.smoke == "0") {
                html += '<div class="calc2--row"><div class="calc2--row_text"><small>Дымоход</small>' + (calc.data.smoke[calc.params.smoketype].text2 ? calc.data.smoke[calc.params.smoketype].text2 : '') + '</div><div class="calc2--row_label">' + showPrice(calc.data.smoke[calc.params.smoketype].price + calc.data.smoke[calc.params.smoketype].work) + ' руб.</div></div>';
            }
            
             html += '<div class="calc2--row"><div class="calc2--row_text"><div class="param-title">Работы по монтажу</div>' + calc.prices.toplivo.text3 + '</div><div class="calc2--row_label">' + showPrice(calc.prices.toplivo.work) + ' руб.</div></div>';
             
              if (calc.params.boyler || calc.params.boyler == "0"){
              html += '<div class="calc2--row"><div class="calc2--row_text"><div class="param-title">Монтаж бойлера</div>' + (calc.data.boyler[calc.params.boylertype].text2 ? calc.data.boyler[calc.params.boylertype].text2 : '') + '</div><div class="calc2--row_label">' + showPrice(calc.data.boyler[calc.params.boylertype].work) + ' руб.</div></div>';
            }
            
            if (calc.params.floor || calc.params.floor == "0"){
               
                html += '<div class="calc2--row"><div class="calc2--row_text"><div class="param-title">Монтаж водяных теплых полов</div>' + calc.prices.floor.text3 + '</div><div class="calc2--row_label">' + showPrice(calc.prices.floor.work) + ' руб.</div></div>';
            }
            
            if (parseFloat(calc.elements.radiators.val()) > 0 && (calc.params.radiatortype || calc.params.radiatortype == "0" )){
                html += '<div class="calc2--row"><div class="calc2--row_text"><div class="param-title">Радиаторы</div>' + calc.prices.radiators.work_text.replace(/%D%/gm, calc.elements.radiators.val()) + '</div><div class="calc2--row_label">' + showPrice(calc.prices.radiators.work) + ' руб.</div></div>';
            }
			
			
            htmlCalcResult += '</div><!-- +[.calc2- -prices] --><div class="calc2--prices cls">';
            htmlCalcResult += '<div class="calc2--prices_row cls"><div class="calc2--prices_price"><strong>' + showPrice(calc.materials) + '</strong> руб.</div><div class="calc2--prices_txt">Стоимость материалов:</div></div>';
            htmlCalcResult += '<div class="calc2--prices_row cls"><div class="calc2--prices_price"><strong>' + showPrice(calc.work) + '</strong> руб.</div><div class="calc2--prices_txt">Стоимость работ:</div></div>';
            htmlCalcResult += '<div class="calc2--prices_row cls"><div class="calc2--prices_price"><strong class="green">' + showPrice(calc.total) + '</strong> руб.</div><div class="calc2--prices_txt">Общая стоимость:</div></div>';
            htmlCalcResult += '</div><!-- -[.calc2- -prices] -->'

            html += htmlCalcResult;

            calc.elements.calc_results_list.html(html)

            calc.elements.calc_table.hide();
            calc.elements.calc_order.hide();
            $('.do_calc').hide();
            calc.elements.result_table.show();
        }
        return false;
    };
    calc.show_discount = function () {

        $('.result-discount').empty();

        if (calc.skidkaWork) {
            var wPrice = calc.work - (calc.work * calc.skidkaWork / 100);
            calc.elements.calc_results_discount.append('<div class="calc2--prices_row cls"><div class="calc2--prices_price"><strong class="green">' + showPrice(wPrice) + '</strong> руб.</div><div class="calc2--prices_txt">Стоимость работ со скидкой: </div></div>');
        }

        var percent = parseFloat(calc.skidka) / 100,
            tPrice = calc.skidkaWork ? wPrice + calc.materials : calc.total,
            discount = calc.skidka ? tPrice * percent : 0;

        calc.elements.calc_results_discount.append('<div class="calc2--prices_row cls"><div class="calc2--prices_price"><strong class="green">' + showPrice((tPrice - discount)) + '</strong> руб.</div><div class="calc2--prices_txt">Общая стоимость со скидкой: </div></div>');

    };
    calc.calculate = function () {
        calc.materials = 0;
        calc.work = 0;
        calc.total = 0;
        calc.prices = {};
        var price_category = 0;

        if (calc.data.toplivo[calc.params.toplivo].type == 1) {
            calc.prices.toplivo = {
                name: calc.data.toplivo[calc.params.toplivo].params[calc.params.vidkotla].vendors[calc.params.vendor].name,
                text: calc.data.toplivo[calc.params.toplivo].params[calc.params.vidkotla].vendors[calc.params.vendor].text,
                text2: calc.data.toplivo[calc.params.toplivo].params[calc.params.vidkotla].vendors[calc.params.vendor].text2,
                text3: calc.data.toplivo[calc.params.toplivo].params[calc.params.vidkotla].vendors[calc.params.vendor].text3,
                price: calc.data.toplivo[calc.params.toplivo].params[calc.params.vidkotla].vendors[calc.params.vendor].price,
                work: calc.data.toplivo[calc.params.toplivo].params[calc.params.vidkotla].work
            }
        } else if (calc.data.toplivo[calc.params.toplivo].type == 2) {
            calc.prices.toplivo = {
                name: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].name,
                text: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].text,
                text2: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].text2,
                text3: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].text3,
                price: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].price,
                work: calc.data.toplivo[calc.params.toplivo].work
            }
        } else if (calc.data.toplivo[calc.params.toplivo].type == 3) {
            if (parseFloat(calc.elements.kotelnaya.val()) > 200) price_category = 2
            else if (parseFloat(calc.elements.kotelnaya.val()) > 100) price_category = 1
            else price_category = 0;
            calc.prices.toplivo = {
                name: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].name,
                text: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].text,
                text2: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].text2,
                text3: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].text3,
                price: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].price[price_category],
                work: calc.data.toplivo[calc.params.toplivo].work
            }
        } else if (calc.data.toplivo[calc.params.toplivo].type == 4) {
            if (parseFloat(calc.elements.kotelnaya.val()) > 250) price_category = 1
            else price_category = 0;
            calc.prices.toplivo = {
                name: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].name,
                text: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].text,
                text2: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].text2,
                text3: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].text3,
                price: calc.data.toplivo[calc.params.toplivo].vendors[calc.params.vendor].price[price_category],
                work: calc.data.toplivo[calc.params.toplivo].work
            }
        }
        ;
        calc.materials += calc.prices.toplivo.price;
        calc.work += calc.prices.toplivo.work;

        if (calc.params.boyler || calc.params.boyler == "0") {
            calc.materials += calc.data.boyler[calc.params.boylertype].price;
            calc.work += calc.data.boyler[calc.params.boylertype].work;
        }


        if (calc.params.smoke || calc.params.smoke == "0") {
            calc.materials += calc.data.smoke[calc.params.smoketype].price;
            calc.work += calc.data.smoke[calc.params.smoketype].work;
        }

        calc.materials += calc.data.tube[calc.params.tube].price * parseFloat(calc.elements.kotelnaya.val());
        calc.work += calc.data.tube[calc.params.tube].work * parseFloat(calc.elements.kotelnaya.val());
        calc.prices.tube = {
            name: calc.data.tube[calc.params.tube].name,
            text: calc.data.tube[calc.params.tube].text,
            text2: calc.data.tube[calc.params.tube].text2,
            price: calc.data.tube[calc.params.tube].price * parseFloat(calc.elements.kotelnaya.val()),
            work: calc.data.tube[calc.params.tube].work * parseFloat(calc.elements.kotelnaya.val())
        }

        calc.materials += calc.data.radiators[calc.params.radiatortype].price * parseFloat(calc.elements.radiators.val());
        calc.work += calc.data.radiators[calc.params.radiatortype].work * parseFloat(calc.elements.radiators.val());
        calc.prices.radiators = {
            name: calc.data.radiators[calc.params.radiatortype].name,
            text: calc.data.radiators[calc.params.radiatortype].text,
            text2: calc.data.radiators[calc.params.radiatortype].text2,
            work_text: calc.data.radiators[calc.params.radiatortype].work_text,
            price: calc.data.radiators[calc.params.radiatortype].price * parseFloat(calc.elements.radiators.val()),
            work: calc.data.radiators[calc.params.radiatortype].work * parseFloat(calc.elements.radiators.val())
        }

        calc.materials += calc.data.obvyazka[calc.params.obvyazka].price * parseFloat(calc.elements.radiators.val());
        calc.prices.obvyazka = {
            name: calc.data.obvyazka[calc.params.obvyazka].name,
            text: calc.data.obvyazka[calc.params.obvyazka].text,
            text2: calc.data.obvyazka[calc.params.obvyazka].text2,
            price: calc.data.obvyazka[calc.params.obvyazka].price * parseFloat(calc.elements.radiators.val())
        }

        if (calc.params.floor || calc.params.floor == "0") {
            calc.materials += calc.data.floor.price * parseFloat(calc.elements.floor_square.val());
            calc.work += calc.data.floor.work * parseFloat(calc.elements.floor_square.val());
            calc.prices.floor = {
                name: calc.data.floor.name,
                text: calc.data.floor.text,
                text2: calc.data.floor.text2,
                text3: calc.data.floor.text3,
                price: calc.data.floor.price * parseFloat(calc.elements.floor_square.val()),
                work: calc.data.floor.work * parseFloat(calc.elements.floor_square.val())
            }
        }

        if (calc.params.freeze || calc.params.freeze == "0") {
            calc.materials += calc.data.freeze.price * parseFloat(calc.elements.kotelnaya.val());
            calc.work += calc.data.freeze.work * parseFloat(calc.elements.kotelnaya.val());
            calc.prices.freeze = {
                name: calc.data.freeze.name,
                text: calc.data.freeze.text,
                text2: calc.data.freeze.text2,
                price: calc.data.freeze.price * parseFloat(calc.elements.kotelnaya.val()),
                work: calc.data.freeze.work * parseFloat(calc.elements.kotelnaya.val())
            }
        }

        calc.total = calc.materials + calc.work;

        return false;
    };
    calc.check_errors = function () {
    	
    	$('.calc-calculate [type=text]:visible').each(function(){
  			if($(this).val()=="" || isNaN(parseFloat($(this).val()))) {
  				$(this).val("")
   				$(this).parent().prev().addClass('param-name');
		  	} else {
    			$(this).parent().prev().removeClass('param-name');
  			}
		});
		
        calc.errors = [];
        calc.elements.wrap.find('.calc-param-error').removeClass('calc-param-error');

        if (calc.elements.kotelnaya.val() == "") calc.errors.push("kotelnaya");
        if (!calc.params.toplivo && calc.params.toplivo != "0") calc.errors.push("toplivo");
        if ((calc.params.toplivo || calc.params.toplivo == "0") && (!calc.params.vidkotla && calc.params.vidkotla != "0") && calc.data.toplivo[calc.params.toplivo].type == 1) calc.errors.push("vidkotla");
        if (
            (
            (calc.params.toplivo)
            &&
            (calc.params.vidkotla)
            &&
            calc.data.toplivo[calc.params.toplivo].type == 1
            &&
            (!calc.params.vendor)
            )
            ||
            (
            (calc.params.toplivo)
            &&
            calc.data.toplivo[calc.params.toplivo].type != 1
            &&
            (!calc.params.vendor)
            )
        ) calc.errors.push("vendor");
        if ((calc.params.boyler || calc.params.boyler == "0") && (!calc.params.boylertype && calc.params.boylertype != "0")) calc.errors.push("boylertype");

        if ((calc.params.smoke || calc.params.smoke == "0") && (!calc.params.smoketype && calc.params.smoketype != "0")) calc.errors.push("smoketype");

        if (!calc.params.tube && calc.params.tube != "0") calc.errors.push("tube");

        if (calc.elements.radiators.val() == "") calc.errors.push("radiators");

        if (!calc.params.radiatortype && calc.params.radiatortype != "0") calc.errors.push("radiatortype");

        if (!calc.params.obvyazka && calc.params.obvyazka != "0") calc.errors.push("obvyazka");

        if ((calc.params.floor || calc.params.floor == "0") && calc.elements.floor_square.val() == "") calc.errors.push("floor_square");

        for (var i = 0; i < calc.errors.length; i++) {
            calc.elements.wrap.find('.calc-param-' + calc.errors[i]).addClass('calc-param-error');
        }
        return calc.errors.length;
    };
    calc.show_form = function () {
        calc.elements.result_table.hide();

        var html = '';

        html += 'Отапливаемая площадь: ' + calc.elements.kotelnaya.val() + ' кв.м.\n';

        html += 'Котельная:' + calc.prices.toplivo.name + ' - ' + (calc.prices.toplivo.price + calc.prices.toplivo.work) + ' руб.\n';

        if (calc.params.boyler || calc.params.boyler == "0") html += 'Бойлер: ' + calc.data.boyler[calc.params.boylertype].name + ' - ' + (calc.data.boyler[calc.params.boylertype].price + calc.data.boyler[calc.params.boylertype].work) + ' руб.\n';

        if (calc.params.smoke || calc.params.smoke == "0") html += 'Дымоход: ' + calc.data.smoke[calc.params.smoketype].name + ' - ' + (calc.data.smoke[calc.params.smoketype].price + calc.data.smoke[calc.params.smoketype].work) + ' руб.\n';
        if (calc.params.tube || calc.params.tube == "0")
            html += 'Трубы: ' + calc.prices.tube.name + ' - ' + (calc.prices.tube.price + calc.prices.tube.work) + ' руб.\n';
        if (parseFloat(calc.elements.radiators.val()) > 0 && (calc.params.radiatortype || calc.params.radiatortype == "0" ))
            html += 'Радиаторы: ' + calc.elements.radiators.val() + 'шт. - ' + calc.prices.radiators.work + ' руб.\n';
        if (parseFloat(calc.elements.radiators.val()) > 0 && (calc.params.radiatortype || calc.params.radiatortype == "0" ))
            html += 'Тип радиаторов: ' + calc.prices.radiators.name + ' - ' + calc.prices.radiators.price + ' руб.\n';
        if (parseFloat(calc.elements.radiators.val()) > 0 && (calc.params.obvyazka || calc.params.obvyazka == "0" ))
            html += 'Обвязка радиаторов: ' + calc.prices.obvyazka.name + ' - ' + calc.prices.obvyazka.price + ' руб.';
        if (calc.params.floor || calc.params.floor == "0")
            html += 'Водяные теплые полы: ' + calc.prices.floor.name + ' - ' + (calc.prices.floor.price + calc.prices.floor.work) + ' руб.\n';
        if (calc.params.freeze || calc.params.freeze == "0")
            html += 'Антифриз: ' + calc.prices.freeze.name + ' - ' + (calc.prices.freeze.price + calc.prices.freeze.work) + ' руб.\n';

        html += '\nСтоимость материалов: ' + calc.materials + ' руб.\n';
        html += 'Стоимость работ: ' + calc.work + ' руб.\n';
        html += 'Общая стоимость: ' + calc.total + ' руб.';

        if (calc.skidka || calc.skidkaWork) {
            html += '\n'
        }

        if (calc.skidkaWork) {
            var wPrice = calc.work - (calc.work * calc.skidkaWork / 100);
            html += '\nСтоимость работ со скидкой: ' + wPrice + ' руб.';
        }

        if (calc.skidka || calc.skidkaWork) {
            var cTotal = calc.skidkaWork ? calc.materials + wPrice : calc.total,
                skidka = calc.skidka ? cTotal * (calc.skidka) / 100 : 0;
            html += '\nОбщая стоимость со скидкой: ' + (cTotal - skidka) + ' руб.';
        }

        calc.elements.calc_order.find('[name="d[0]"]').val(html);

        calc.elements.calc_order.show();
    };
})(calc);

$(document).ready(function(){
    calc.init();
})