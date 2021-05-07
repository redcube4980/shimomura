// JavaScript Document

var conditions = Array();
$(function(){
	var question = {
		1:{"sentence":"是否必须有耐腐蚀性？","answer":{"1":"是","2":"否","3":"均可"},"key":"耐食性","condition":{"1":"是","2":"否","3":""}},
		2:{"sentence":"是否必须有磁性？","answer":{"1":"非磁性","2":"磁性","4":"均可"},"key":"磁性","condition":{"1":"非磁性","2":"磁性","4":""}},
		3:{"sentence":"是否必须有切削性？","answer":{"1":"是","2":"否","3":"均可"},"key":"切削性","condition":{"1":"是","2":"否","3":""}},
		4:{"sentence":"鉛含有","answer":{"1":"有り","2":"無し"},"key":"鉛含有","condition":{"1":"有り","2":"無し"}},
		5:{"sentence":"是否必须有强度/硬度？","answer":{"1":"是","2":"否"},"key":"強度","condition":{"1":"是","2":"否"}},
		6:{"sentence":"C％（强度）","answer":{"1":"高","2":"低"},"key":"C％","condition":{"1":"高","2":"低"}},
		7:{"sentence":"重视哪个特性？","answer":{"1":"磁性・切削性","2":"切削性"},"key":"","condition":{"1":"","2":""}}
	};

	var scenario = {
		"0":1,
		"1":2,
		"2":3,
		"3":7,
		"11":3,
		"12":3,
		"13":0,
		"14":0,
		"111":0,
		"112":5,
		"113":0,
		"121":0,
		"122":6,
		"123":0,
		"1121":0,
		"1122":0,
		"1221":0,
		"1222":0,
		"21":0,
		"22":0,
		"23":0,
		"31":2,
		"311":3,
		"312":3,
		"313":0,
		"314":0,
		"3111":0,
		"3112":5,
		"3113":0,
		"3121":0,
		"3122":6,
		"3123":0,
		"31121":0,
		"31122":0,
		"31221":0,
		"31222":0,
		"32":3,
		"321":0,
		"322":0,
		"323":0
	};
	var attention = {
		"13":"【非快削】ＳＵＳ３２９Ｊ１",
		"14":"",
		"111":"【无Pb】ＳＦ３０Ｖ、ＳＦ２７Ｅ、ＳＵＳ３０３",
		"113":"",
		"121":"【含Pb】ＳＦ５３－Ｅ、ＳＦ１３－Ｅ、ＳＦ２０Ｔ<br>\n【无Pb】ＳＵＳ４２０Ｆ、ＳＵＳ４１６Ｆ２、ＳＦ２０Ｆ，ＳＵＳ４３０Ｆ",
		"123":"",
		"1121":"【非快削】ＳＵＳ３０４Ｎ２、ＳＵＨ６６０","1122":"【非快削】ＳＵＳ３０４、ＳＵＳ３１６、ＳＵＳ３１０Ｓ",
		"1221":"【非快削】ＳＵＳ４４０Ｃ(C:1%)，ＤＳＲ７(C:0.6%)<br>\n【非快削】ＳＵＳ６３０(HRC≧28）",
		"1222":"【非快削】ＳＵＳ４２０Ｊ２(C:0.3%)",
		"21":"【含Pb快削钢】ＵＴＭ＞ＴＬＳ＞ＳＤＦ＞ＳＤ２００＞ＳＬＭ<br>\n【含Pb构造专用钢】Ｓ４５ＣＦＳ、Ｓ４５ＣＦ、ＭＥ１Ｆ<br><br>\n【无Pb快削钢】ＳＵＭ２３、ＣＣ１２Ｃ１４、ＳＵＭ２４ＥＺ",
		"22":"【非快削构造专用钢】ＳＣＭ４１５、ＳＣＭ４３５<br>\n【非快削轴承钢】ＳＵＪ２",
		"23":"【含Pb快削钢】ＵＴＭ＞ＴＬＳ＞ＳＤＦ＞ＳＤ２００＞ＳＬＭ<br>\n【含Pb构造专用钢】Ｓ４５ＣＦＳ、Ｓ４５ＣＦ、ＭＥ１Ｆ<br><br>\n【无Pb快削钢】ＳＵＭ２３、ＣＣ１２Ｃ１４、ＳＵＭ２４ＥＺ<br>\n【非快削构造专用钢】ＳＣＭ４１５、ＳＣＭ４３５<br>\n【非快削轴承钢】ＳＵＪ２",
		"313":"【非快削】ＳＵＳ３２９Ｊ１",
		"314":"",
		"3111":"【无Pb】ＳＦ３０Ｖ、ＳＦ２７Ｅ、ＳＵＳ３０３",
		"3113":"",
		"3121":"【含Pb】ＳＦ５３－Ｅ、ＳＦ１３－Ｅ、ＳＦ２０Ｔ<br>\n【无Pb】ＳＵＳ４２０Ｆ、ＳＵＳ４１６Ｆ２、ＳＦ２０Ｆ，ＳＵＳ４３０Ｆ",
		"3123":"",
		"31121":"【非快削】ＳＵＳ３０４Ｎ２、ＳＵＨ６６０","31122":"【非快削】ＳＵＳ３０４、ＳＵＳ３１６、ＳＵＳ３１０Ｓ",
		"31221":"【非快削】ＳＵＳ４４０Ｃ(C:1%)，ＤＳＲ７(C:0.6%)<br>\n【非快削】ＳＵＳ６３０(HRC≧28）",
		"31222":"【非快削】ＳＵＳ４２０Ｊ２(C:0.3%)",
		"321":"【含Pb快削钢】ＵＴＭ＞ＴＬＳ＞ＳＤＦ＞ＳＤ２００＞ＳＬＭ<br>\n【含Pb构造专用钢】Ｓ４５ＣＦＳ、Ｓ４５ＣＦ、ＭＥ１Ｆ<br><br>\n【无Pb快削钢】ＳＵＭ２３、ＣＣ１２Ｃ１４、ＳＵＭ２４ＥＺ",
		"322":"【非快削构造专用钢】ＳＣＭ４１５、ＳＣＭ４３５<br>\n【非快削轴承钢】ＳＵＪ２",
		"323":"【含Pb快削钢】ＵＴＭ＞ＴＬＳ＞ＳＤＦ＞ＳＤ２００＞ＳＬＭ<br>\n【含Pb构造专用钢】Ｓ４５ＣＦＳ、Ｓ４５ＣＦ、ＭＥ１Ｆ<br><br>\n【无Pb快削钢】ＳＵＭ２３、ＣＣ１２Ｃ１４、ＳＵＭ２４ＥＺ<br>\n【非快削构造专用钢】ＳＣＭ４１５、ＳＣＭ４３５<br>\n【非快削轴承钢】ＳＵＪ２"
	};

	var spec = {
		1:{"name":"ＳＦ３０Ｖ","耐食性":"是","磁性":"非磁性","切削性":"是","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#austenite","mention":"无Pb"},
		2:{"name":"ＳＦ２７Ｅ","耐食性":"是","磁性":"非磁性","切削性":"是","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#austenite","mention":"无Pb"},
		3:{"name":"ＳＵＳ３０３","耐食性":"是","磁性":"非磁性","切削性":"是","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#austenite","mention":"无Pb"},
		4:{"name":"ＳＵＳ３０４Ｎ２","耐食性":"是","磁性":"非磁性","切削性":"否","強度":"是","C％":"","鉛含有":"","links":"/products/stainless.html#austenite","mention":"非快削"},
		5:{"name":"ＳＵＨ６６０","耐食性":"是","磁性":"非磁性","切削性":"否","強度":"是","C％":"","鉛含有":"","links":"/products/stainless.html#austenite","mention":"非快削"},
		6:{"name":"ＳＵＳ３０４","耐食性":"是","磁性":"非磁性","切削性":"否","強度":"否","C％":"","鉛含有":"","links":"/products/stainless.html#austenite","mention":"非快削"},
		7:{"name":"ＳＵＳ３１６","耐食性":"是","磁性":"非磁性","切削性":"否","強度":"否","C％":"","鉛含有":"","links":"/products/stainless.html#austenite","mention":"非快削"},
		8:{"name":"ＳＵＳ３０４Ｌ","耐食性":"是","磁性":"非磁性","切削性":"否","強度":"否","C％":"","鉛含有":"","links":"","mention":"非快削"},
		9:{"name":"ＳＵＳ３１６Ｌ","耐食性":"是","磁性":"非磁性","切削性":"否","強度":"否","C％":"","鉛含有":"","links":"","mention":"非快削"},
		10:{"name":"ＳＵＳ３１０Ｓ","耐食性":"是","磁性":"非磁性","切削性":"否","強度":"否","C％":"","鉛含有":"","links":"","mention":"非快削"},
		11:{"name":"ＳＦ５３－Ｅ","耐食性":"是","磁性":"磁性","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"/products/stainless.html#martensite","mention":"含Pb"},
		12:{"name":"ＳＦ１３－Ｅ","耐食性":"是","磁性":"磁性","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"/products/stainless.html#martensite","mention":"含Pb"},
		13:{"name":"ＳＦ２０Ｔ","耐食性":"是","磁性":"磁性","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"/products/stainless.html#ferrite","mention":"含Pb"},
		14:{"name":"ＳＵＳ４２０Ｆ","耐食性":"是","磁性":"磁性","切削性":"是","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#martensite","mention":"无Pb"},
		15:{"name":"ＳＵＳ４１６Ｆ２","耐食性":"是","磁性":"磁性","切削性":"是","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#martensite","mention":"无Pb"},
		16:{"name":"ＳＦ２０Ｆ","耐食性":"是","磁性":"磁性","切削性":"是","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#ferrite","mention":"无Pb"},
		17:{"name":"ＳＵＳ４３０Ｆ","耐食性":"是","磁性":"磁性","切削性":"是","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#ferrite","mention":"无Pb"},
		18:{"name":"ＳＵＳ４４０Ｃ","耐食性":"是","磁性":"磁性","切削性":"否","強度":"","C％":"高","鉛含有":"","links":"/products/stainless.html#martensite","mention":"非快削"},
		19:{"name":"ＤＳＲ７","耐食性":"是","磁性":"磁性","切削性":"否","強度":"","C％":"高","鉛含有":"","links":"/products/stainless.html#martensite","mention":"非快削"},
		20:{"name":"ＳＵＳ６３０","耐食性":"是","磁性":"磁性","切削性":"否","強度":"","C％":"高","鉛含有":"","links":"/products/stainless.html#other","mention":"非快削"},
		21:{"name":"ＳＵＳ４２０Ｊ２","耐食性":"是","磁性":"磁性","切削性":"否","強度":"","C％":"低","鉛含有":"","links":"/products/stainless.html#martensite","mention":"非快削"},
		22:{"name":"ＳＵＳ３２９Ｊ１","耐食性":"是","磁性":"磁性","切削性":"","強度":"","C％":"","鉛含有":"","links":"/products/stainless.html#other","mention":"非快削"},
		23:{"name":"ＵＴＭ","耐食性":"否","磁性":"","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"含Pb快削钢"},
		24:{"name":"ＴＬＳ","耐食性":"否","磁性":"","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"含Pb快削钢"},
		25:{"name":"ＳＤＦ","耐食性":"否","磁性":"","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"sdf.html","mention":"含Pb快削钢"},
		26:{"name":"ＳＤ２００","耐食性":"否","磁性":"","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"含Pb快削钢"},
		27:{"name":"ＳＬＭ","耐食性":"否","磁性":"","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"含Pb快削钢"},
		28:{"name":"Ｓ４５ＣＦＳ","耐食性":"否","磁性":"","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#alloy","mention":"含Pb构造专用钢"},
		29:{"name":"Ｓ４５ＣＦ","耐食性":"否","磁性":"","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#alloy","mention":"含Pb构造专用钢"},
		30:{"name":"ＭＥ１Ｆ","耐食性":"否","磁性":"","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#alloy","mention":"含Pb构造专用钢"},
		31:{"name":"ＳＵＭ２３","耐食性":"否","磁性":"","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"无Pb快削钢"},
		32:{"name":"ＣＣ１２Ｃ１４","耐食性":"否","磁性":"","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"无Pb快削钢"},
		33:{"name":"ＳＵＭ２４ＥＺ","耐食性":"否","磁性":"","切削性":"是","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"无Pb快削钢"},
		34:{"name":"ＳＣＭ４１５","耐食性":"否","磁性":"","切削性":"否","強度":"","C％":"","鉛含有":"","links":"/products/structual.html#alloy","mention":"非快削构造专用钢"},
		35:{"name":"ＳＣＭ４３５","耐食性":"否","磁性":"","切削性":"否","強度":"","C％":"","鉛含有":"","links":"/products/structual.html#alloy","mention":"非快削构造专用钢"},
		36:{"name":"ＳＵＪ２","耐食性":"否","磁性":"","切削性":"否","強度":"","C％":"","鉛含有":"","links":"/products/structual.html#alloy","mention":"非快削轴承钢"}
	};
	
	var table_html = (function () {/*
		<tr><td><a href="/cn${link}"><div class="steel_name">${name}</div><div class="steel_mention">${mention}</div></a></td></tr>
		
	*/}).toString().replace(/(\n)/g, '').split('*')[1];
	var object = {};

	var htmlButtons = '';
	var indx = scenario[0];
	var scene = question[indx];
	htmlButtons = "<span class='enq_qustion'>" + scene['sentence'] + "</span><br>\n";
	for(var key in scene['answer']){
		htmlButtons += "<button class='enq_select btn btn-info' level='1' cond='" + scene['key'] + "' qst='" + indx + "' ans='" + key + "' val='" + key + "'>" + scene['answer'][key] + "</button><br>\n";
	}
	$('#enq_level1').html(htmlButtons);
	
	$(document).on('click', '.enq_select', function(){
		$('#tbody_result').html(''); //結果を消去
		var html = '';
		var level = $(this).attr('level');
		var nextLevel = parseInt(level) + 1;
		var cond = $(this).attr('cond');
		var ans = $(this).attr('ans');
		var val = $(this).attr('val');
		var cur = scenario[ans];
		var curScene = question[cur];
		var qst = parseInt($(this).attr('qst'));
		//押下されたボタンと同レベルのボタン色を変更
		$(this).parent().children('button').each(function(){
			$(this).removeClass('btn-warning').addClass('btn-info');
		});
		$(this).addClass('btn-warning').removeClass('btn-info');
		//押下されたボタンのレベルより深いレベルの内容を消去
		$('.enq_arrow' + level).html('');
		conditions[level] = Array();;
		for( i = parseInt(level) + 1; i <= 5; i++ ){
			$('#enq_level' + i).html('');
			$('#enq_arrow' + i).html('');
			conditions[i] = Array();
		}
		//条件を記録
		if( cond != '' && question[qst]['condition'][val] != '' ){
				conditions[level][cond] = question[qst]['condition'][val];
		}
		if( cur != '0' ){
			//次のレベルの選択肢を作成
			htmlButtons = "<span class='enq_qustion'>" + curScene['sentence'] + "</span><br>\n";
			for(var key in curScene['answer']){
				htmlButtons += "<button class='enq_select btn btn-info' level='" + nextLevel + "' cond='" + curScene['key'] + "' qst='" + cur + "' ans='" + ans + key + "' val='" + key + "'>" + curScene['answer'][key] + "</button><br>\n";
			}
			$('#enq_arrow' + level).html('<img src="./simulation/arrow.png" alt="" />');
			$('#enq_level' + nextLevel).html(htmlButtons);
			$($.support.checkOn ? 'html' : 'body').animate( { scrollTop: $('#enq_level' + nextLevel).offset().top }, 1000, 'linear' );
		} else {
			for( var keyP in spec ){
				var flg = 1;
				for( var key in conditions ){
					for( var keyC in conditions[key] ){
						if( conditions[key][keyC] != spec[keyP][keyC] ){
							flg = 0;
							break;
						}
					}
				}
				if( flg == 1 ){
					var object = {
						name: spec[keyP]['name'],
						link: spec[keyP]['links'],
						mention: spec[keyP]['mention']
					}
					html += jQuery.tmpl(table_html, object)[0].outerHTML;
				}
			}
			if( html == '' ){
				html = "<tr><td>該当する素材が見付かりません</td></tr>\n";
			}
			if( attention[ans] ==  '' || typeof attention[ans] == 'undefined' ){
				html += "<tr><td>" + attention[ans] + "</td></tr>\n";
			}
			$('#tbody_result').html(html);
			$($.support.checkOn ? 'html' : 'body').animate( { scrollTop: $('#tbody_result').offset().top }, 1000, 'linear' );
		}
	});
});
