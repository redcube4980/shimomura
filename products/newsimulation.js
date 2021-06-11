// JavaScript Document

var conditions = Array();
$(function(){
	var question = {
		1:{"sentence":"耐食性は必要ですか？","answer":{"1":"必要","2":"不要","3":"どちらでも良い"},"key":"耐食性","condition":{"1":"必要","2":"不要","3":""}},
		2:{"sentence":"磁性は必要ですか？","answer":{"1":"非磁性","2":"磁性","4":"どちらでも良い"},"key":"磁性","condition":{"1":"非磁性","2":"磁性","4":""}},
		3:{"sentence":"切削性は必要ですか？","answer":{"1":"必要","2":"不要","3":"どちらでも良い"},"key":"切削性","condition":{"1":"必要","2":"不要","3":""}},
		4:{"sentence":"鉛含有","answer":{"1":"有り","2":"無し"},"key":"鉛含有","condition":{"1":"有り","2":"無し"}},
		5:{"sentence":"強度・硬さは必要ですか？","answer":{"1":"必要","2":"不要"},"key":"強度","condition":{"1":"必要","2":"不要"}},
		6:{"sentence":"強度","answer":{"1":"高","2":"低"},"key":"C％","condition":{"1":"高","2":"低"}},
		7:{"sentence":"どの特性を重視しますか？","answer":{"1":"磁性・切削性","2":"切削性"},"key":"","condition":{"1":"","2":""}}
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
		"111":"【非Pb】ＳＦ３０Ｖ、ＳＦ２７Ｅ、ＳＵＳ３０３",
		"113":"",
		"121":"【Pb含有】ＳＦ５３－Ｅ、ＳＦ１３－Ｅ、ＳＦ２０Ｔ<br>\n【非Pb】ＳＦ１３－ＥＳ、ＳＵＳ４２０Ｆ、ＳＵＳ４１６Ｆ２、ＳＦ２０Ｆ，ＳＵＳ４３０Ｆ",
		"123":"",
		"1121":"【非快削】ＳＵＳ３０４Ｎ２、ＳＵＨ６６０","1122":"【非快削】ＳＵＳ３０４、ＳＵＳ３１６、ＳＵＳ３１０Ｓ",
		"1221":"【非快削】ＳＵＳ４４０Ｃ(C:1%)，ＤＳＲ７(C:0.6%)<br>\n【非快削】ＳＵＳ６３０(HRC≧28）",
		"1222":"【非快削】ＳＵＳ４２０Ｊ２(C:0.3%)",
		"21":"【Pb含有快削鋼】ＵＴＭ＞ＴＬＳ＞ＳＤＦ＞ＳＤ２００＞ＳＬＭ<br>\n【Pb含有構造用鋼】Ｓ４５ＣＦＳ、Ｓ４５ＣＦ、ＭＥ１Ｆ<br><br>\n【非Pb快削鋼】ＳＵＭ２３、ＣＣ１２Ｃ１４、ＳＵＭ２４ＥＺ",
		"22":"【非快削構造用鋼】ＳＣＭ４１５、ＳＣＭ４３５<br>\n【非快削軸受鋼】ＳＵＪ２",
		"23":"【Pb含有快削鋼】ＵＴＭ＞ＴＬＳ＞ＳＤＦ＞ＳＤ２００＞ＳＬＭ<br>\n【Pb含有構造用鋼】Ｓ４５ＣＦＳ、Ｓ４５ＣＦ、ＭＥ１Ｆ<br><br>\n【非Pb快削鋼】ＳＵＭ２３、ＣＣ１２Ｃ１４、ＳＵＭ２４ＥＺ<br>\n【非快削構造用鋼】ＳＣＭ４１５、ＳＣＭ４３５<br>\n【非快削軸受鋼】ＳＵＪ２",
		"313":"【非快削】ＳＵＳ３２９Ｊ１",
		"314":"",
		"3111":"【非Pb】ＳＦ３０Ｖ、ＳＦ２７Ｅ、ＳＵＳ３０３",
		"3113":"",
		"3121":"【Pb含有】ＳＦ５３－Ｅ、ＳＦ１３－Ｅ、ＳＦ２０Ｔ<br>\n【非Pb】ＳＦ１３－ＥＳ、ＳＵＳ４２０Ｆ、ＳＵＳ４１６Ｆ２、ＳＦ２０Ｆ，ＳＵＳ４３０Ｆ",
		"3123":"",
		"31121":"【非快削】ＳＵＳ３０４Ｎ２、ＳＵＨ６６０","31122":"【非快削】ＳＵＳ３０４、ＳＵＳ３１６、ＳＵＳ３１０Ｓ",
		"31221":"【非快削】ＳＵＳ４４０Ｃ(C:1%)，ＤＳＲ７(C:0.6%)<br>\n【非快削】ＳＵＳ６３０(HRC≧28）",
		"31222":"【非快削】ＳＵＳ４２０Ｊ２(C:0.3%)",
		"321":"【Pb含有快削鋼】ＵＴＭ＞ＴＬＳ＞ＳＤＦ＞ＳＤ２００＞ＳＬＭ<br>\n【Pb含有構造用鋼】Ｓ４５ＣＦＳ、Ｓ４５ＣＦ、ＭＥ１Ｆ<br><br>\n【非Pb快削鋼】ＳＵＭ２３、ＣＣ１２Ｃ１４、ＳＵＭ２４ＥＺ",
		"322":"【非快削構造用鋼】ＳＣＭ４１５、ＳＣＭ４３５<br>\n【非快削軸受鋼】ＳＵＪ２",
		"323":"【Pb含有快削鋼】ＵＴＭ＞ＴＬＳ＞ＳＤＦ＞ＳＤ２００＞ＳＬＭ<br>\n【Pb含有構造用鋼】Ｓ４５ＣＦＳ、Ｓ４５ＣＦ、ＭＥ１Ｆ<br><br>\n【非Pb快削鋼】ＳＵＭ２３、ＣＣ１２Ｃ１４、ＳＵＭ２４ＥＺ<br>\n【非快削構造用鋼】ＳＣＭ４１５、ＳＣＭ４３５<br>\n【非快削軸受鋼】ＳＵＪ２"
	};

	var spec = {
		1:{"name":"ＳＦ３０Ｖ","耐食性":"必要","磁性":"非磁性","切削性":"必要","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#austenite","mention":"非Pb"},
		2:{"name":"ＳＦ２７Ｅ","耐食性":"必要","磁性":"非磁性","切削性":"必要","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#austenite","mention":"非Pb"},
		3:{"name":"ＳＵＳ３０３","耐食性":"必要","磁性":"非磁性","切削性":"必要","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#austenite","mention":"非Pb"},
		4:{"name":"ＳＵＳ３０４Ｎ２","耐食性":"必要","磁性":"非磁性","切削性":"不要","強度":"必要","C％":"","鉛含有":"","links":"/products/stainless.html#austenite","mention":"非快削"},
		5:{"name":"ＳＵＨ６６０","耐食性":"必要","磁性":"非磁性","切削性":"不要","強度":"必要","C％":"","鉛含有":"","links":"/products/stainless.html#austenite","mention":"非快削"},
		6:{"name":"ＳＵＳ３０４","耐食性":"必要","磁性":"非磁性","切削性":"不要","強度":"不要","C％":"","鉛含有":"","links":"/products/stainless.html#austenite","mention":"非快削"},
		7:{"name":"ＳＵＳ３１６","耐食性":"必要","磁性":"非磁性","切削性":"不要","強度":"不要","C％":"","鉛含有":"","links":"/products/stainless.html#austenite","mention":"非快削"},
		8:{"name":"ＳＵＳ３０４Ｌ","耐食性":"必要","磁性":"非磁性","切削性":"不要","強度":"不要","C％":"","鉛含有":"","links":"","mention":"非快削"},
		9:{"name":"ＳＵＳ３１６Ｌ","耐食性":"必要","磁性":"非磁性","切削性":"不要","強度":"不要","C％":"","鉛含有":"","links":"","mention":"非快削"},
		10:{"name":"ＳＵＳ３１０Ｓ","耐食性":"必要","磁性":"非磁性","切削性":"不要","強度":"不要","C％":"","鉛含有":"","links":"","mention":"非快削"},
		11:{"name":"ＳＦ５３－Ｅ","耐食性":"必要","磁性":"磁性","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/stainless.html#martensite","mention":"Pb含有"},
		12:{"name":"ＳＦ１３－ＥＳ","耐食性":"必要","磁性":"磁性","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/stainless.html#martensite","mention":"非Pb"},
		13:{"name":"ＳＦ１３－Ｅ","耐食性":"必要","磁性":"磁性","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/stainless.html#martensite","mention":"Pb含有"},
		14:{"name":"ＳＦ２０Ｔ","耐食性":"必要","磁性":"磁性","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/stainless.html#ferrite","mention":"Pb含有"},
		15:{"name":"ＳＵＳ４２０Ｆ","耐食性":"必要","磁性":"磁性","切削性":"必要","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#martensite","mention":"非Pb"},
		16:{"name":"ＳＵＳ４１６Ｆ２","耐食性":"必要","磁性":"磁性","切削性":"必要","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#martensite","mention":"非Pb"},
		17:{"name":"ＳＦ２０Ｆ","耐食性":"必要","磁性":"磁性","切削性":"必要","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#ferrite","mention":"非Pb"},
		18:{"name":"ＳＵＳ４３０Ｆ","耐食性":"必要","磁性":"磁性","切削性":"必要","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#ferrite","mention":"非Pb"},
		19:{"name":"ＳＵＳ４４０Ｃ","耐食性":"必要","磁性":"磁性","切削性":"不要","強度":"","C％":"高","鉛含有":"","links":"/products/stainless.html#martensite","mention":"非快削"},
		20:{"name":"ＤＳＲ７","耐食性":"必要","磁性":"磁性","切削性":"不要","強度":"","C％":"高","鉛含有":"","links":"/products/stainless.html#martensite","mention":"非快削"},
		21:{"name":"ＳＵＳ６３０","耐食性":"必要","磁性":"磁性","切削性":"不要","強度":"","C％":"高","鉛含有":"","links":"/products/stainless.html#other","mention":"非快削"},
		22:{"name":"ＳＵＳ４２０Ｊ２","耐食性":"必要","磁性":"磁性","切削性":"不要","強度":"","C％":"低","鉛含有":"","links":"/products/stainless.html#martensite","mention":"非快削"},
		23:{"name":"ＳＵＳ３２９Ｊ１","耐食性":"必要","磁性":"磁性","切削性":"","強度":"","C％":"","鉛含有":"","links":"/products/stainless.html#other","mention":"非快削"},
		24:{"name":"ＵＴＭ","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"Pb含有快削鋼"},
		25:{"name":"ＴＬＳ","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"Pb含有快削鋼"},
		26:{"name":"ＳＤＦ","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"sdf.html","mention":"Pb含有快削鋼"},
		27:{"name":"ＳＤ２００","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"Pb含有快削鋼"},
		28:{"name":"ＳＬＭ","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"Pb含有快削鋼"},
		29:{"name":"ＳＧＦ０３Ｅ","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"","links":"/products/structual.html#alloy","mention":"非Pb構造用鋼"},
		30:{"name":"Ｓ４５ＣＦＳ","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#alloy","mention":"Pb含有構造用鋼"},
		31:{"name":"Ｓ４５ＣＦ","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#alloy","mention":"Pb含有構造用鋼"},
		32:{"name":"ＭＥ１Ｆ","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#alloy","mention":"Pb含有構造用鋼"},
		33:{"name":"ＳＵＭ２３","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"非Pb快削鋼"},
		34:{"name":"ＣＣ１２Ｃ１４","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"非Pb快削鋼"},
		35:{"name":"ＳＵＭ２４ＥＺ","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"非Pb快削鋼"},
		36:{"name":"ＳＧＦ０５Ｅ","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"","links":"/products/structual.html#cutting","mention":"非Pb快削鋼"},
		37:{"name":"ＳＣＭ４１５","耐食性":"不要","磁性":"","切削性":"不要","強度":"","C％":"","鉛含有":"","links":"/products/structual.html#alloy","mention":"非快削構造用鋼"},
		38:{"name":"ＳＣＭ４３５","耐食性":"不要","磁性":"","切削性":"不要","強度":"","C％":"","鉛含有":"","links":"/products/structual.html#alloy","mention":"非快削構造用鋼"},
		39:{"name":"ＳＵＪ２","耐食性":"不要","磁性":"","切削性":"不要","強度":"","C％":"","鉛含有":"","links":"/products/structual.html#alloy","mention":"非快削軸受鋼"},
		40:{"name":"ＤＳＨ４００Ｆ","耐食性":"必要","磁性":"非磁性","切削性":"必要","強度":"","C％":"","鉛含有":"無し","links":"http://shimomura.here2.click/products/stainless.html","mention":"非Pb"},
		41:{"name":"ＳＧＦ０４Ｆ","耐食性":"不要","磁性":"","切削性":"必要","強度":"","C％":"","鉛含有":"有り","links":"http://shimomura.here2.click/products/structual.html","mention":"Pb含有快削鋼"},
		42:{"name":"ＳＵＳ６３０ーＳ","耐食性":"必要","磁性":"磁性","切削性":"不要","強度":"","C％":"高","鉛含有":"","links":"/products/stainless.html#other","mention":"非快削"},
	};
	
	var table_html = (function () {/*
		<tr><td><a href="${link}"><div class="steel_name">${name}</div><div class="steel_mention">${mention}</div></a></td></tr>
		
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
