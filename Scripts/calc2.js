(function () {
	function showPrice(val) {
 		return number_format(val,null,null,' ')
	}
    calc.init = function () {
        calc.elements = {
            wrap : $('.calc')
        };
        calc.elements = {
            wrap : calc.elements.wrap,
            info : calc.elements.wrap.find('.calc-info'),
            checkbox : calc.elements.wrap.find('[type=checkbox]'),
			radio : calc.elements.wrap.find('[type=radio]'),
			
            calc_table : calc.elements.wrap.find('.calc-calculate'),
            result_table : calc.elements.wrap.find('.calc-results'),
            calc_order : calc.elements.wrap.find('.calc-order'),

            voda_wrap : calc.elements.wrap.find('.calc-param-voda'),
            vendor : calc.elements.wrap.find('.calc-param-vendor'),
            nagrevatel : calc.elements.wrap.find('.calc-param-nagrevatel_type'),
            truba : calc.elements.wrap.find('.calc-param-truba'),
            kanal : calc.elements.wrap.find('.calc-param-kanal'),
            kanal_count : calc.elements.wrap.find('.param-kanal'),
            septik : calc.elements.wrap.find('.calc-param-septik'),
            septik_val : calc.elements.wrap.find('.param-septik'),
            topas : calc.elements.wrap.find('.calc-param-topas'),
            topas_val : calc.elements.wrap.find('.param-topas'),
            kesson : calc.elements.wrap.find('.calc-param-kesson'),
            transh : calc.elements.wrap.find('.calc-param-transh'),
            transh_opt : calc.elements.wrap.find('.param-transh'),
            santex : calc.elements.wrap.find('.calc-param-santex'),
            
            santex_val : calc.elements.wrap.find('.calc-param-santex-add'),

            voda : calc.elements.wrap.find('[name=voda]'),
            glubina : calc.elements.wrap.find('[name=glubina]'),
            tochka_count1 : calc.elements.wrap.find('[name=tochka_count]'),
            tochka_count2 : calc.elements.wrap.find('[name=tochka_count2]'),
            tochka_count3 : calc.elements.wrap.find('[name=tochka_count3]'),
            pribors : calc.elements.wrap.find('.pribors'),
            kanal_count_val : calc.elements.wrap.find('[name=kanal_count]'),
            dlina_transh : calc.elements.wrap.find('[name=transh_dlina]'),
            transh_type : calc.elements.wrap.find('[name=transh_type]'),
            septik_count1 : calc.elements.wrap.find('[name=septik_count1]'),
            septik_count2 : calc.elements.wrap.find('[name=septik_count2]'),

            calc_results_list : calc.elements.wrap.find('.calc-results-list'),
            calc_results_discount : calc.elements.wrap.find('.result-discount'),

            goto_calc : calc.elements.wrap.find('[name=goto_calc]'),
            goto_discount : calc.elements.wrap.find('[name=goto_discount]'),
            goto_order : calc.elements.wrap.find('[name=goto_order]'),
            goto_result :calc.elements.wrap.find('[name=calculate]'),

            includeform : calc.elements.wrap.find('.calc-includeform')
        }
        calc.params = {};
        calc.materials = 0;
        calc.work = 0;
        calc.total = 0;
        calc.elements.info.hover(calc.show_info, calc.show_info);
        calc.elements.checkbox.attr('checked',false);
        calc.elements.checkbox.change(calc.change_param);
        
        calc.elements.radio.attr('checked',false);
        calc.elements.radio.change(calc.change_param);

        calc.elements.goto_calc.click(calc.goto_calc);
        calc.elements.goto_discount.click(calc.show_discount);
        calc.elements.goto_result.click(calc.show_calculate);
        calc.elements.goto_order.click(calc.show_form);

        //calc.elements.includeform.s3IncludeForm(document.location.href + '?form=1')

    };
    calc.show_info = function () {
        calc.elements.info.not(this).removeClass('calc-info-active');
        if ($(this).is('.calc-info')){
            $(this).toggleClass('calc-info-active');
        }
    };
    calc.change_param = function () {
        calc.elements.wrap.find('[name="' + $(this).attr('name') + '"]').not(this).attr('checked',false);
        calc.elements.wrap.find('[name="' + $(this).attr('name') + '"]').not(this).parents('label').removeClass('active');
        if ($(this).is(':checked')) {
            $(this).parents('label:first').addClass('active');
            calc.params[$(this).attr('name')] = $(this).val();
        } else {
            $(this).parents('label:first').removeClass('active');
            calc.params[$(this).attr('name')] = '';
        };
        calc.change_value ($(this).attr('name'));
    };
    calc.change_value = function (param) {
        switch (param) {
            case 'nasos' : {
                if (calc.params.nasos != ''){
                    if (calc.data.nasos[calc.params.nasos].type == 1) {
                        calc.set_vendor();
                        calc.elements.vendor.slideDown();
                    } else {
                        calc.set_vendor();
                        calc.elements.vendor.slideDown();
                    }
                } else {
                    calc.elements.vendor.slideUp();
                };
startInfoWindow();
                break;
            };
            case 'nagrevatel' : {
                if (calc.params.nagrevatel != '') {
                    calc.set_nagrevatel();
                    calc.elements.nagrevatel.slideDown();
                } else {
                    calc.elements.nagrevatel.slideUp();
                }
                break;
            }
            case 'kanal' : {
                if (calc.params.kanal != '') {
                    calc.elements.kanal_count.slideDown();
                } else {
                    calc.elements.kanal_count.slideUp();
                }
                break;
            }
            case 'septik' : {
                if (calc.params.septik != '') {
                    calc.elements.septik_val.slideDown();
                } else {
                    calc.elements.septik_val.slideUp();
                }
                break;
            }
            case 'transh' : {
                if (calc.params.transh != '') {
                    calc.elements.transh_opt.slideDown();
                } else {
                    calc.elements.transh_opt.slideUp();
                }
                break;
            }
            case 'voda' : {
                if (calc.params.voda != '') {
                    if (calc.params.voda == '0') {
                        calc.elements.kesson.slideDown();
                    } else {
                        calc.elements.kesson.slideUp();
                    }
                } else {
                    calc.elements.kesson.slideUp();
                }
                break;
            }
            case 'topas' : {
                if (calc.params.topas != '') {
                    calc.elements.topas_val.slideDown();
                } else {
                    calc.elements.topas_val.slideUp();
                }
                break;
            }
            case 'santex' : {
                if (calc.params.santex != '') {
                    calc.set_santex();
                    calc.elements.santex_val.slideDown();
                } else {
                    calc.elements.santex_val.slideUp();
                }
                break;
            }
            case 'truba' : {
                if (calc.params.truba != ''){
                    calc.elements.truba.find('.param-additional').slideUp();
                    if (calc.params.truba=='0') {
                        calc.elements.truba.find('.param-truba1').slideDown();
                    }
                    if (calc.params.truba=='1') {
                        calc.elements.truba.find('.param-truba2').slideDown();
                    }
                    if (calc.params.truba=='2') {
                        calc.elements.truba.find('.param-truba3').slideDown();
                    }
                } else {
                    calc.elements.truba.find('.param-additional').slideUp();
                }
                break;
            }
        }
    };
    calc.set_vendor = function () {
        var html = '<div class="param-name calc--label bold">Производитель</div>';
        if (calc.data.nasos[calc.params.nasos].type==1){
            for (var i = 0; i < calc.data.nasos[calc.params.nasos].params[calc.params.nasos].vendors.length; i++) {
            	var item = calc.data.nasos[calc.params.nasos].params[calc.params.nasos].vendors[i].item;
                html += '<div class="param-value"><label class="calc--inline_label" data-item="'+item+'"><input type="radio" class="styler" name="vendor" value="' + i + '">' + calc.data.nasos[calc.params.nasos].params[calc.params.nasos].vendors[i].name + '</label><div class="calc-clear"></div></div>';
            }
        } else {
            for (var i = 0; i < calc.data.nasos[calc.params.nasos].vendors.length; i++) {
            	var item = calc.data.nasos[calc.params.nasos].vendors[i].item;
                html += '<div class="param-value"><label class="calc--inline_label" data-item="'+item+'"><input type="radio" class="styler" name="vendor" value="' + i + '">' + calc.data.nasos[calc.params.nasos].vendors[i].name + '</label><div class="calc-clear"></div></div>';
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
    calc.set_nagrevatel = function () {
        var html = '<div class="param-name calc--label bold">Объем</div>';

        for (var i = 0; i < calc.data.nagrevatel[calc.params.nagrevatel].vendors.length; i++) {
            html += '<div class="param-value"><label class="calc--inline_label"><input class="styler" type="radio" name="nagrevatel_type" value="' + i + '">' + 
            calc.data.nagrevatel[calc.params.nagrevatel].vendors[i].name + '</label></div>';
        }

        html += '<div class="calc-clear"> </div>';
        calc.elements.nagrevatel.html(html);
        calc.params.nagrevatel_type=null;
        calc.elements.nagrevatel.find('[type=checkbox],[type=radio]').change(calc.change_param);
        calc.elements.info = calc.elements.wrap.find('.calc-info');
        calc.elements.nagrevatel.find('.calc-info').hover(calc.show_info, calc.show_info);
        $(".styler").styler();
        return false;
    };
    calc.set_santex = function () {
        var html = '<div class="param-value" style="width:300px;">';
        for (var i = 0; i < calc.data.santex.length; i++) {
            html += '<div class="pribors">';
            html += '<label>' + calc.data.santex[i].name + '</label><div class="calc--autowrap cls"><input type="text" class="styler" name="santex'+(i+1)+'" /> шт.</div>';
            html += '</div>';
        }
        html += '<div class="calc-clear"> </div></div>';
        calc.elements.santex_val.html(html);
         
        calc.elements['santex1'] = calc.elements.wrap.find('[name=santex1]');
		calc.elements['santex2'] = calc.elements.wrap.find('[name=santex2]');
        calc.elements['santex3'] = calc.elements.wrap.find('[name=santex3]');
        calc.elements['santex4'] = calc.elements.wrap.find('[name=santex4]');
        calc.elements['santex5'] = calc.elements.wrap.find('[name=santex5]');
        return false;
    };
    calc.goto_calc = function () {
        calc.elements.result_table.hide();
        calc.elements.calc_table.show();
    };
    calc.show_calculate = function () {
    	
        if (calc.check_errors()){
			alert("Не все обязательные поля заполнены...");
		}
		else {
            calc.calculate();

            var html = '';
            var htmlCalcResult = '';
            
            html += '<!-- +[.calc2- -result] --> <div class="calc2--result cls">';

            html += '<div class="calc2--row"><div class="calc2--row_text">Имеющаяся точка воды ' + 
            calc.data.voda[calc.params.voda].text2 + '</div><div class="calc2--row_label orange">' + calc.data.voda[calc.params.voda].name + '</div></div>';
            
            html += '<div class="calc2--row"><div class="calc2--row_text">Глубина</div><div class="calc2--row_label orange">' + calc.elements.glubina.val() + ' м</div></div>';
            if (calc.params.nasos) {
                html += '<div class="calc2--row"><div class="calc2--row_text">Насос: ' + 
                calc.prices.nasos.name +''+calc.prices.nasos.text2+'</div><div class="calc2--row_label orange">' + showPrice(calc.prices.nasos.price) + ' руб.</div></div>';
            }
           
            if (calc.prices.nagrevatel) {
                html += '<div class="calc2--row"><div class="calc2--row_text">Водонагреватель настенный электрический: '+ calc.prices.nagrevatel.name +'</div>'+ calc.prices.nagrevatel.text2 +'<div class="calc2--row_label">' + showPrice(calc.prices.nagrevatel.price) + ' руб.</div></div>';
            }
            
            html += '<div class="calc2--row"><div class="calc2--row_text">Трубопровод</div><div class="calc2--row_label">' + calc.prices.truba.tochka + ' шт.</div></div>';
            html += '<div class="calc2--row"><div class="calc2--row_text">'+ calc.prices.truba.name +'</div>'+ calc.prices.truba.text2 +'<div class="calc2--row_label">' + showPrice(calc.prices.truba.price) + ' руб.</div></div>';
            
             if (calc.params.topas) {
                html += '<div class="calc2--row"><div class="calc2--row_text">Автономная канализация Топас  ('+calc.prices.topas.name+')'+calc.prices.topas.text2+'</div><div class="calc2--row_label">' + showPrice(calc.prices.topas.price+calc.prices.topas.work) + ' руб.</div></div>';
            }
            if (calc.params.kanal) {
                html += '<div class="calc2--row"><div class="calc2--row_text">'+ calc.prices.kanal.name +' (Кол-во точек: '+calc.prices.kanal.tochka+')'+ calc.prices.kanal.text2 +'</div><div class="calc2--row_label">' + showPrice(calc.prices.kanal.price+calc.prices.kanal.work) + ' руб.</div></div>';
            }
            if (calc.params.septik) {
                html += '<div class="calc2--row"><div class="calc2--row_text">Септик (Кол-во колец: '+calc.prices.septik.col1+', Кол-во колодцев: '+calc.prices.septik.col2+' )'+calc.prices.septik.text2+'</div><div class="calc2--row_label">' + showPrice(calc.prices.septik.price1+calc.prices.septik.work1+calc.prices.septik.price2+calc.prices.septik.work2) + ' руб.</div></div>';
            }
           
            
             if (calc.params.transh) {
                html += '<div class="calc2--row"><div class="calc2--row_text">Копка траншеи</div><div class="calc2--row_label">' + calc.prices.transh.dlina + 'м</div></div>';
                html += '<div class="calc2--row"><div class="calc2--row_text">'+ calc.prices.transh.name +'</div>'+ calc.prices.transh.text2 +'<div class="calc2--row_label">' + showPrice(calc.prices.transh.price+calc.prices.transh.work) + ' руб.</div></div>';
            }
            
            if (calc.params.voda=='0') {
                html += '<div class="calc2--row"><div class="calc2--row_text">'+ calc.prices.kesson.name +'</div>'+ calc.prices.kesson.text2 +'<div class="calc2--row_label">' + showPrice(calc.prices.kesson.price+calc.prices.kesson.work) + ' руб.</div></div>';
            }
            
            if (calc.params.santex) {
                html += '<div class="calc2--row"><div class="calc2--row_text">Установка сантех приборов</div>'+ calc.prices.santex.text2 +'<div class="calc2--row_label">' + showPrice(calc.prices.santex.work) + ' руб.</div></div>';
                html += '<div class="calc2--row"><div class="calc2--row_text">Приборы:<br>';
                for(i=0;i<calc.prices.pribors.length;i++) {
                    html += calc.data.santex[calc.prices.pribors[i]].name+' '+($('[name=santex'+(calc.prices.pribors[i]+1)+']').val())+ ' шт. <br>';
                }
                html += '</div><div class="calc2--row_label"> </div></div>';
            }
            
            
            if (calc.params.nasos) {
                
                html += '<div class="calc2--row"><div class="calc2--row_text">Монтаж:</div>'+calc.prices.nasos.text3+'<div class="calc2--row_label">' + showPrice(calc.prices.nasos.work) + ' руб.</div></div>';
            }
            
     
            if (calc.prices.nagrevatel) {
               
                html += '<div class="calc2--row"><div class="calc2--row_text">Монтаж:</div>'+ 
                calc.prices.nagrevatel.text3 +'<div class="calc2--row_label">' + showPrice(calc.prices.nagrevatel.work) + ' руб.</div></div>';
            }
            
            html += '<div class="calc2--row"><div class="calc2--row_text">Монтаж:</div>'+ calc.prices.truba.text3 +'<div class="calc2--row_label orange">' + showPrice(calc.prices.truba.work) + ' руб.</div></div>';
            
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
            var wPrice = calc.work - (calc.work*calc.skidkaWork/100);
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

        if (parseInt(calc.elements.glubina.val())>20 && calc.params.voda!='2') { calc.work += parseInt(calc.elements.glubina.val())*calc.data.voda[calc.params.voda].price; }

        if (calc.params.nasos && calc.data.nasos[calc.params.nasos].type==1) {
            calc.prices.nasos = {
                work : calc.data.nasos[calc.params.nasos].params[0].vendors[calc.params.vendor].work,
                price : calc.data.nasos[calc.params.nasos].params[0].vendors[calc.params.vendor].price,
                name : calc.data.nasos[calc.params.nasos].params[0].vendors[calc.params.vendor].name,
                text2 : calc.data.nasos[calc.params.nasos].params[0].vendors[calc.params.vendor].text2,
                text3 : calc.data.nasos[calc.params.nasos].params[0].vendors[calc.params.vendor].text3
            }
        } else {
            calc.prices.nasos = {
                work : calc.params.nasos ? calc.data.nasos[calc.params.nasos].vendors[calc.params.vendor].work : 0,
                price : calc.params.nasos ? calc.data.nasos[calc.params.nasos].vendors[calc.params.vendor].price : 0,
                name : calc.params.nasos ? calc.data.nasos[calc.params.nasos].vendors[calc.params.vendor].name : '',
                text2 : calc.params.nasos ? calc.data.nasos[calc.params.nasos].vendors[calc.params.vendor].text2 : '',
                text3 : calc.params.nasos ? calc.data.nasos[calc.params.nasos].vendors[calc.params.vendor].text3 : ''
            }
        }
        calc.work+=calc.prices.nasos.work;
        calc.materials+=calc.prices.nasos.price;

        if (calc.params.transh) {
            calc.prices.transh = {
                dlina : parseInt(calc.elements.dlina_transh.val()),
                name : calc.data.transh[calc.params.transh_type].name,
                price : calc.data.transh[calc.params.transh_type].price*parseInt(calc.elements.dlina_transh.val()),
                work : calc.data.transh[calc.params.transh_type].work*parseInt(calc.elements.dlina_transh.val()),
                text2 : calc.data.transh[calc.params.transh_type].text2
            }
            calc.work+=calc.prices.transh.work;
            calc.materials+=calc.prices.transh.price;
        }

        if (calc.params.voda=='0') {
            calc.prices.kesson = {
                name : calc.data.kesson[calc.params.kesson].name,
                price : calc.data.kesson[calc.params.kesson].price,
                work : calc.data.kesson[calc.params.kesson].work,
                text2 : calc.data.kesson[calc.params.kesson].text2
            }
            calc.work+=calc.prices.kesson.work;
            calc.materials+=calc.prices.kesson.price;
        }

        if (calc.params.nagrevatel) {
            calc.prices.nagrevatel = {
                name : calc.data.nagrevatel[calc.params.nagrevatel].name,
                type : calc.data.nagrevatel[calc.params.nagrevatel].vendors[calc.params.nagrevatel_type].name,
                price : calc.data.nagrevatel[calc.params.nagrevatel].vendors[calc.params.nagrevatel_type].price,
                work : calc.data.nagrevatel[calc.params.nagrevatel].vendors[calc.params.nagrevatel_type].work,
                text2 : calc.data.nagrevatel[calc.params.nagrevatel].vendors[calc.params.nagrevatel_type].text2,
                text3 : calc.data.nagrevatel[calc.params.nagrevatel].vendors[calc.params.nagrevatel_type].text3
            }
            calc.work+=calc.prices.nagrevatel.work;
            calc.materials+=calc.prices.nagrevatel.price;
        }
        if (calc.params.truba=='0') {
            calc.prices.truba = {
                name : calc.data.truba[calc.params.truba].name,
                price : calc.data.truba[calc.params.truba].price*parseInt(calc.elements.tochka_count1.val()),
                work : calc.data.truba[calc.params.truba].work*parseInt(calc.elements.tochka_count1.val()),
                text2 : calc.data.truba[calc.params.truba].text2,
                text3 : calc.data.truba[calc.params.truba].text3,
                tochka : parseInt(calc.elements.tochka_count1.val())
            }
        }
        if (calc.params.truba=='1') {
            calc.prices.truba = {
                name : calc.data.truba[calc.params.truba].name,
                price : calc.data.truba[calc.params.truba].price*parseInt(calc.elements.tochka_count2.val()),
                work : calc.data.truba[calc.params.truba].work*parseInt(calc.elements.tochka_count2.val()),
                text2 : calc.data.truba[calc.params.truba].text2,
                text3 : calc.data.truba[calc.params.truba].text3,
                tochka : parseInt(calc.elements.tochka_count2.val())
            }
        }
        if (calc.params.truba=='2') {
            calc.prices.truba = {
                name : calc.data.truba[calc.params.truba].name,
                price : calc.data.truba[calc.params.truba].price*parseInt(calc.elements.tochka_count3.val()),
                work : calc.data.truba[calc.params.truba].work*parseInt(calc.elements.tochka_count3.val()),
                text2 : calc.data.truba[calc.params.truba].text2,
                text3 : calc.data.truba[calc.params.truba].text3,
                tochka : parseInt(calc.elements.tochka_count3.val())
            }
        }
        calc.work+=calc.prices.truba.work;
        calc.materials+=calc.prices.truba.price;
        if (calc.params.santex) {
            calc.prices.pribors = [];
            wr = 0;
            calc.elements.wrap.find('.pribors').each(function(){
                if (parseInt($(this).find('input[type=text]').val())>0) {
                    wr+=parseInt($(this).find('input[type=text]').val())*calc.data.santex[$(this).index()].work;
                    calc.prices.pribors.push($(this).index());
                }
            });
            calc.prices.santex = {
                work : wr,
                pribors : calc.prices.pribors,
                text2 : $('.calc .data-santex').html()
            }
            calc.work+=calc.prices.santex.work;
        }
        if (calc.params.kanal) {
            calc.prices.kanal = {
                name : calc.data.kanal.name,
                price : calc.data.kanal.price*parseInt(calc.elements.kanal_count_val.val()),
                work : calc.data.kanal.work*parseInt(calc.elements.kanal_count_val.val()),
                text2 : calc.data.kanal.text2,
                tochka : parseInt(calc.elements.kanal_count_val.val())
            }
            calc.work+=calc.prices.kanal.work;
            calc.materials+=calc.prices.kanal.price;
        }
        if (calc.params.septik) {
            calc.prices.septik = {
                price1 : calc.data.septik.price1*parseInt(calc.elements.septik_count1.val()),
                work1 : calc.data.septik.work1*parseInt(calc.elements.septik_count1.val()),
                col1 : parseInt(calc.elements.septik_count1.val()),
                price2 : calc.data.septik.price2*parseInt(calc.elements.septik_count2.val()),
                work2 : calc.data.septik.work2*parseInt(calc.elements.septik_count2.val()),
                col2 : parseInt(calc.elements.septik_count2.val()),
                text2 : calc.data.septik.text2,
            }
            calc.work+=calc.prices.septik.work1+calc.prices.septik.work2;
            calc.materials+=calc.prices.septik.price1+calc.prices.septik.price2;
        }
        if (calc.params.topas) {
            calc.prices.topas = {
                name : calc.data.topas[parseInt(calc.elements.wrap.find('select[name=topas_type] option:selected').val())].name,
                price : calc.data.topas[parseInt(calc.elements.wrap.find('select[name=topas_type] option:selected').val())].price,
                work : calc.data.topas[parseInt(calc.elements.wrap.find('select[name=topas_type] option:selected').val())].work,
                text2 : $('.calc .data-topas').html()
            }
            calc.work+=calc.prices.topas.work;
            calc.materials+=calc.prices.topas.price;
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
        if (!calc.params.voda || calc.params.voda == "") calc.errors.push("voda");
        if ((calc.params.voda && calc.params.voda == "0") && (!calc.params.kesson || calc.params.kesson=="")) calc.errors.push("kesson");
        if (calc.elements.glubina.val()=="" || isNaN(parseFloat(calc.elements.glubina.val()))) calc.errors.push("glubina");
        if($('[name=transh]:checked').length) {
        	if (calc.elements.dlina_transh.val()=="" || isNaN(parseFloat(calc.elements.glubina.val()))) calc.errors.push("transh");
        }
        if($('[name=septik]:checked').length) {
        	if (calc.elements.septik_count1.val()=="" || isNaN(parseFloat(calc.elements.septik_count1.val()))) calc.errors.push("septik");
        	if (calc.elements.septik_count2.val()=="" || isNaN(parseFloat(calc.elements.septik_count2.val()))) calc.errors.push("septik");
        	
        	if(typeof calc.params.transh_type == 'undefined') {
        		$('.param-transh').addClass('calc-param-error').find('label').addClass('param-name');
        		calc.errors.push("transh");
        	}
        }
        
        if($('[name=santex]:checked').length) {
        	
        	if( (calc.elements.santex1.val()=="" || isNaN(parseFloat(calc.elements.santex1.val()))) 
        	&& (calc.elements.santex2.val()=="" || isNaN(parseFloat(calc.elements.santex2.val()))) 
        	&& (calc.elements.santex3.val()=="" || isNaN(parseFloat(calc.elements.santex3.val()))) 
        	&& (calc.elements.santex4.val()=="" || isNaN(parseFloat(calc.elements.santex4.val()))) 
        	&& (calc.elements.santex5.val()=="" || isNaN(parseFloat(calc.elements.santex5.val()))) 
        	) {calc.errors.push("santex");	}
    		
        }
        
        if (calc.params.voda != 2) { if (!calc.params.nasos || calc.params.nasos == "") calc.errors.push("nasos"); }
        if ((calc.params.nasos) && (!calc.params.vendor || calc.params.vendor == "")) calc.errors.push("vendor");
        /*if (!calc.params.nagrevatel || calc.params.nagrevatel == "") calc.errors.push("nagrevatel");*/
        if ((calc.params.nagrevatel) && (!calc.params.nagrevatel_type || calc.params.nagrevatel_type=="")) calc.errors.push("nagrevatel_type");
        if (!calc.params.truba || calc.params.truba == "") calc.errors.push("truba");
        if (calc.params.truba) {
            if (calc.params.truba=="0" && isNaN(parseFloat(calc.elements.tochka_count1.val()))) calc.errors.push("truba");
            if (calc.params.truba=="1" && isNaN(parseFloat(calc.elements.tochka_count2.val()))) calc.errors.push("truba");
            if (calc.params.truba=="2" && isNaN(parseFloat(calc.elements.tochka_count3.val()))) calc.errors.push("truba");
        };
        if (calc.params.kanal && isNaN(parseFloat(calc.elements.kanal_count_val.val()))) calc.errors.push("kanal");

        for (var i = 0; i < calc.errors.length; i++) {
            calc.elements.wrap.find('.calc-param-' + calc.errors[i]).addClass('calc-param-error');
        }
        
        return calc.errors.length;
    };
    calc.show_form = function () {
        calc.elements.result_table.hide();

        var html = '\n';

        html += 'Имеющаяся точка воды: ' + calc.data.voda[calc.params.voda].name+'\n';

        html += 'Глубина: ' + calc.elements.glubina.val() + 'м\n';
        if (calc.params.nasos) {
            html += 'Насос: '+ calc.prices.nasos.name +' - '+showPrice(calc.prices.nasos.price+calc.prices.nasos.work)+' руб.\n';
        }
        if (calc.params.transh) {
            html += 'Копка траншеи: '+ calc.prices.transh.dlina +'м';
            html += calc.prices.transh.name +' - '+ showPrice(calc.prices.transh.price+calc.prices.transh.work)+' руб.\n';
        }
        if (calc.params.voda=='0') {
            html += calc.prices.kesson.name +' - '+ showPrice(calc.prices.kesson.price+calc.prices.kesson.work)+' руб.\n';
        }
        if (calc.prices.nagrevatel) {
            html += 'Водонагреватель настенный электрический: '+ (calc.prices.nagrevatel.name)+' - '+showPrice(calc.prices.nagrevatel.price+calc.prices.nagrevatel.work)+' руб.\n';
        }
        html += 'Трубопровод: (точек: '+ calc.prices.truba.tochka +' шт.)  '+calc.prices.truba.name+' - '+showPrice(calc.prices.truba.price+calc.prices.truba.work)+' руб.\n';
        if (calc.params.santex) {
            html += 'Установка сантех приборов: '+ showPrice(calc.prices.santex.work)+' руб.\n';
            html += 'Приборы:\n';
            for(i=0;i<calc.prices.pribors.length;i++) {
            	console.log(calc.data.santex[i],calc.prices.pribors);
                html += calc.data.santex[i].name+'\n';
            }
            html += '\n';
        }
        if (calc.params.kanal) {
            html += calc.prices.kanal.name +': (Кол-во точек: '+ calc.prices.kanal.tochka+') - '+showPrice(calc.prices.kanal.price+calc.prices.kanal.work)+' руб.\n';
        }
        if (calc.params.septik) {
            html += 'Септик (Кол-во колец: '+calc.prices.septik.col1+', Кол-во колодцев: '+calc.prices.septik.col2+' ) - '+showPrice(calc.prices.septik.price1+calc.prices.septik.work1+calc.prices.septik.price2+calc.prices.septik.work2)+' руб.\n';
        }
        if (calc.params.topas) {
            html += 'Автономная канализация Топас: '+calc.prices.topas.name+' - '+showPrice(calc.prices.topas.price+calc.prices.topas.work)+' руб.\n';
        }

        html += '\nСтоимость материалов: ' + calc.materials + ' руб.\n';
        html += 'Стоимость работ: ' + calc.work + ' руб.\n';
        html += 'Общая стоимость: ' + calc.total + ' руб.';

        if (calc.skidka || calc.skidkaWork) {html += '\n'}

        if (calc.skidkaWork) {
            var wPrice = calc.work-(calc.work*calc.skidkaWork/100);
            html += '\nСтоимость работ со скидкой: ' + wPrice + ' руб.';
        }

        if (calc.skidka || calc.skidkaWork) {
            var cTotal = calc.skidkaWork ? calc.materials + wPrice : calc.total,
                skidka = calc.skidka ? cTotal * (calc.skidka) / 100 : 0;
            html += '\nОбщая стоимость со скидкой: ' + (cTotal - skidka) + ' руб.';
        }

        calc.elements.calc_order.find('[name="d[0]"]').val(html)

        calc.elements.calc_order.show();
    };
})(calc);

$(document).ready(function(){
    calc.init();
})