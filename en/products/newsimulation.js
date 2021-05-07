// JavaScript Document

var conditions = Array();
$(function(){
	var question = {
		1:{"sentence":"Is corrosion resistance needed?","answer":{"1":"Yes","2":"No","3":"Either"},"key":"耐食性","condition":{"1":"Yes","2":"No","3":""}},
		2:{"sentence":"Is magnetic steel needed?","answer":{"1":"Non-magnetic steel needed","2":"Magnetic steel needed","4":"Either"},"key":"磁性","condition":{"1":"非磁性","2":"磁性","4":""}},
		3:{"sentence":"Is machinability needed?","answer":{"1":"Yes","2":"No","3":"Either"},"key":"Machinability","condition":{"1":"Yes","2":"No","3":""}},
		4:{"sentence":"鉛含有","answer":{"1":"有り","2":"無し"},"key":"鉛含有","condition":{"1":"有り","2":"無し"}},
		5:{"sentence":"Are strength and hardness needed?","answer":{"1":"Yes","2":"No"},"key":"強度","condition":{"1":"Yes","2":"No"}},
		6:{"sentence":"C% (strength)","answer":{"1":"High","2":"Low"},"key":"C％","condition":{"1":"High","2":"Low"}},
		7:{"sentence":"Which properties are most important?","answer":{"1":"Magnetism & machinability","2":"Machinability"},"key":"","condition":{"1":"","2":""}}
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
		"13":"【Non-machinable】ＳＵＳ３２９Ｊ１",
		"14":"",
		"111":"【Lead-free】ＳＦ３０Ｖ、ＳＦ２７Ｅ、ＳＵＳ３０３",
		"113":"",
		"121":"【Contains lead】ＳＦ５３－Ｅ、ＳＦ１３－Ｅ、ＳＦ２０Ｔ<br>\n【Lead-free】ＳＵＳ４２０Ｆ、ＳＵＳ４１６Ｆ２、ＳＦ２０Ｆ，ＳＵＳ４３０Ｆ",
		"123":"",
		"1121":"【Non-machinable】ＳＵＳ３０４Ｎ２、ＳＵＨ６６０","1122":"【Non-machinable】ＳＵＳ３０４、ＳＵＳ３１６、ＳＵＳ３１０Ｓ",
		"1221":"【Non-machinable】ＳＵＳ４４０Ｃ(C:1%)，ＤＳＲ７(C:0.6%)<br>\n【Non-machinable】ＳＵＳ６３０(HRC≧28）",
		"1222":"【Non-machinable】ＳＵＳ４２０Ｊ２(C:0.3%)",
		"21":"【Free cutting steel with lead】ＵＴＭ＞ＴＬＳ＞ＳＤＦ＞ＳＤ２００＞ＳＬＭ<br>\n【Structural steel with lead】Ｓ４５ＣＦＳ、Ｓ４５ＣＦ、ＭＥ１Ｆ<br><br>\n【Free cutting steel without lead】ＳＵＭ２３、ＣＣ１２Ｃ１４、ＳＵＭ２４ＥＺ",
		"22":"【Non-machinable structural steel】ＳＣＭ４１５、ＳＣＭ４３５<br>\n【Non-machinable bearing steel 】ＳＵＪ２",
		"23":"【Free cutting steel with lead】ＵＴＭ＞ＴＬＳ＞ＳＤＦ＞ＳＤ２００＞ＳＬＭ<br>\n【Structural steel with lead】Ｓ４５ＣＦＳ、Ｓ４５ＣＦ、ＭＥ１Ｆ<br><br>\n【Free cutting steel without lead】ＳＵＭ２３、ＣＣ１２Ｃ１４、ＳＵＭ２４ＥＺ<br>\n【Non-machinable structural steel】ＳＣＭ４１５、ＳＣＭ４３５<br>\n【Non-machinable bearing steel 】ＳＵＪ２",
		"313":"【Non-machinable】ＳＵＳ３２９Ｊ１",
		"314":"",
		"3111":"【Lead-free】ＳＦ３０Ｖ、ＳＦ２７Ｅ、ＳＵＳ３０３",
		"3113":"",
		"3121":"【Contains lead】ＳＦ５３－Ｅ、ＳＦ１３－Ｅ、ＳＦ２０Ｔ<br>\n【Lead-free】ＳＵＳ４２０Ｆ、ＳＵＳ４１６Ｆ２、ＳＦ２０Ｆ，ＳＵＳ４３０Ｆ",
		"3123":"",
		"31121":"【Non-machinable】ＳＵＳ３０４Ｎ２、ＳＵＨ６６０","31122":"【Non-machinable】ＳＵＳ３０４、ＳＵＳ３１６、ＳＵＳ３１０Ｓ",
		"31221":"【Non-machinable】ＳＵＳ４４０Ｃ(C:1%)，ＤＳＲ７(C:0.6%)<br>\n【Non-machinable】ＳＵＳ６３０(HRC≧28）",
		"31222":"【Non-machinable】ＳＵＳ４２０Ｊ２(C:0.3%)",
		"321":"【Free cutting steel with lead】ＵＴＭ＞ＴＬＳ＞ＳＤＦ＞ＳＤ２００＞ＳＬＭ<br>\n【Structural steel with lead】Ｓ４５ＣＦＳ、Ｓ４５ＣＦ、ＭＥ１Ｆ<br><br>\n【Free cutting steel without lead】ＳＵＭ２３、ＣＣ１２Ｃ１４、ＳＵＭ２４ＥＺ",
		"322":"【Non-machinable structural steel】ＳＣＭ４１５、ＳＣＭ４３５<br>\n【Non-machinable bearing steel 】ＳＵＪ２",
		"323":"【Free cutting steel with lead】ＵＴＭ＞ＴＬＳ＞ＳＤＦ＞ＳＤ２００＞ＳＬＭ<br>\n【Structural steel with lead】Ｓ４５ＣＦＳ、Ｓ４５ＣＦ、ＭＥ１Ｆ<br><br>\n【Free cutting steel without lead】ＳＵＭ２３、ＣＣ１２Ｃ１４、ＳＵＭ２４ＥＺ<br>\n【Non-machinable structural steel】ＳＣＭ４１５、ＳＣＭ４３５<br>\n【Non-machinable bearing steel 】ＳＵＪ２"
	};

	var spec = {
		1:{"name":"ＳＦ３０Ｖ","耐食性":"Yes","磁性":"非磁性","Machinability":"Yes","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#austenite","mention":"Lead-free"},
		2:{"name":"ＳＦ２７Ｅ","耐食性":"Yes","磁性":"非磁性","Machinability":"Yes","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#austenite","mention":"Lead-free"},
		3:{"name":"ＳＵＳ３０３","耐食性":"Yes","磁性":"非磁性","Machinability":"Yes","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#austenite","mention":"Lead-free"},
		4:{"name":"ＳＵＳ３０４Ｎ２","耐食性":"Yes","磁性":"非磁性","Machinability":"No","強度":"Yes","C％":"","鉛含有":"","links":"/products/stainless.html#austenite","mention":"Non-machinable"},
		5:{"name":"ＳＵＨ６６０","耐食性":"Yes","磁性":"非磁性","Machinability":"No","強度":"Yes","C％":"","鉛含有":"","links":"/products/stainless.html#austenite","mention":"Non-machinable"},
		6:{"name":"ＳＵＳ３０４","耐食性":"Yes","磁性":"非磁性","Machinability":"No","強度":"No","C％":"","鉛含有":"","links":"/products/stainless.html#austenite","mention":"Non-machinable"},
		7:{"name":"ＳＵＳ３１６","耐食性":"Yes","磁性":"非磁性","Machinability":"No","強度":"No","C％":"","鉛含有":"","links":"/products/stainless.html#austenite","mention":"Non-machinable"},
		8:{"name":"ＳＵＳ３０４Ｌ","耐食性":"Yes","磁性":"非磁性","Machinability":"No","強度":"No","C％":"","鉛含有":"","links":"","mention":"Non-machinable"},
		9:{"name":"ＳＵＳ３１６Ｌ","耐食性":"Yes","磁性":"非磁性","Machinability":"No","強度":"No","C％":"","鉛含有":"","links":"","mention":"Non-machinable"},
		10:{"name":"ＳＵＳ３１０Ｓ","耐食性":"Yes","磁性":"非磁性","Machinability":"No","強度":"No","C％":"","鉛含有":"","links":"","mention":"Non-machinable"},
		11:{"name":"ＳＦ５３－Ｅ","耐食性":"Yes","磁性":"磁性","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"/products/stainless.html#martensite","mention":"Contains lead"},
		12:{"name":"ＳＦ１３－Ｅ","耐食性":"Yes","磁性":"磁性","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"/products/stainless.html#martensite","mention":"Contains lead"},
		13:{"name":"ＳＦ２０Ｔ","耐食性":"Yes","磁性":"磁性","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"/products/stainless.html#ferrite","mention":"Contains lead"},
		14:{"name":"ＳＵＳ４２０Ｆ","耐食性":"Yes","磁性":"磁性","Machinability":"Yes","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#martensite","mention":"Lead-free"},
		15:{"name":"ＳＵＳ４１６Ｆ２","耐食性":"Yes","磁性":"磁性","Machinability":"Yes","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#martensite","mention":"Lead-free"},
		16:{"name":"ＳＦ２０Ｆ","耐食性":"Yes","磁性":"磁性","Machinability":"Yes","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#ferrite","mention":"Lead-free"},
		17:{"name":"ＳＵＳ４３０Ｆ","耐食性":"Yes","磁性":"磁性","Machinability":"Yes","強度":"","C％":"","鉛含有":"無し","links":"/products/stainless.html#ferrite","mention":"Lead-free"},
		18:{"name":"ＳＵＳ４４０Ｃ","耐食性":"Yes","磁性":"磁性","Machinability":"No","強度":"","C％":"High","鉛含有":"","links":"/products/stainless.html#martensite","mention":"Non-machinable"},
		19:{"name":"ＤＳＲ７","耐食性":"Yes","磁性":"磁性","Machinability":"No","強度":"","C％":"High","鉛含有":"","links":"/products/stainless.html#martensite","mention":"Non-machinable"},
		20:{"name":"ＳＵＳ６３０","耐食性":"Yes","磁性":"磁性","Machinability":"No","強度":"","C％":"High","鉛含有":"","links":"/products/stainless.html#other","mention":"Non-machinable"},
		21:{"name":"ＳＵＳ４２０Ｊ２","耐食性":"Yes","磁性":"磁性","Machinability":"No","強度":"","C％":"Low","鉛含有":"","links":"/products/stainless.html#martensite","mention":"Non-machinable"},
		22:{"name":"ＳＵＳ３２９Ｊ１","耐食性":"Yes","磁性":"磁性","Machinability":"","強度":"","C％":"","鉛含有":"","links":"/products/stainless.html#other","mention":"Non-machinable"},
		23:{"name":"ＵＴＭ","耐食性":"No","磁性":"","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"Free cutting steel with lead"},
		24:{"name":"ＴＬＳ","耐食性":"No","磁性":"","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"Free cutting steel with lead"},
		25:{"name":"ＳＤＦ","耐食性":"No","磁性":"","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"sdf.html","mention":"Free cutting steel with lead"},
		26:{"name":"ＳＤ２００","耐食性":"No","磁性":"","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"Free cutting steel with lead"},
		27:{"name":"ＳＬＭ","耐食性":"No","磁性":"","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"Free cutting steel with lead"},
		28:{"name":"Ｓ４５ＣＦＳ","耐食性":"No","磁性":"","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#alloy","mention":"Structural steel with lead"},
		29:{"name":"Ｓ４５ＣＦ","耐食性":"No","磁性":"","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#alloy","mention":"Structural steel with lead"},
		30:{"name":"ＭＥ１Ｆ","耐食性":"No","磁性":"","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#alloy","mention":"Structural steel with lead"},
		31:{"name":"ＳＵＭ２３","耐食性":"No","磁性":"","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"Free cutting steel without lead"},
		32:{"name":"ＣＣ１２Ｃ１４","耐食性":"No","磁性":"","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"Free cutting steel without lead"},
		33:{"name":"ＳＵＭ２４ＥＺ","耐食性":"No","磁性":"","Machinability":"Yes","強度":"","C％":"","鉛含有":"有り","links":"/products/structual.html#cutting","mention":"Free cutting steel without lead"},
		34:{"name":"ＳＣＭ４１５","耐食性":"No","磁性":"","Machinability":"No","強度":"","C％":"","鉛含有":"","links":"/products/structual.html#alloy","mention":"Non-machinable structural steel"},
		35:{"name":"ＳＣＭ４３５","耐食性":"No","磁性":"","Machinability":"No","強度":"","C％":"","鉛含有":"","links":"/products/structual.html#alloy","mention":"Non-machinable structural steel"},
		36:{"name":"ＳＵＪ２","耐食性":"No","磁性":"","Machinability":"No","強度":"","C％":"","鉛含有":"","links":"/products/structual.html#alloy","mention":"Non-machinable bearing steel "}
	};
	
	var table_html = (function () {/*
		<tr><td><a href="/en${link}"><div class="steel_name">${name}</div><div class="steel_mention">${mention}</div></a></td></tr>
		
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
