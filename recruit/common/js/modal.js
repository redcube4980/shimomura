$(function(){
$('[id^=doVote]').click( function(e){
	// id取得
	var actId = $(this).siblings('[id="actId"]').val();
	
	// 女優名取得
	// $('#modal-confirm').text(actNm + 'さんに投票します。よろしいですか?');	
	var actNm = $(this).siblings('[id="actNm"]').val();	
	// 置換前メッセージを退避
	var confMsgOrg = $('#modal-confirm').text();	
	// 確認メッセージ設定
	var confMsg =	$('#modal-confirm').text().replace('%actNm%', actNm);
	$('#modal-confirm').text(confMsg);

	//キーボード操作などにより、オーバーレイが多重起動するのを防止する
	$( this ).blur() ;	//ボタンからフォーカスを外す
	if( $( '#modal-overlay' )[0] ) return false ;		//新しくモーダルウィンドウを起動しない
	
	//オーバーレイを出現させる
	$( 'body' ).append( '<div id="modal-overlay"></div>' ) ;
	$( '#modal-overlay' ).fadeIn( 'fast' ) ;
	// 確認メッセージの縦横保持
	var confWidth = $('#modal-content').width();
	var confHeight = $('#modal-content').height();
	
	//コンテンツをセンタリングする
	centeringModalSyncer() ;
	//コンテンツをフェードインする
	$( '#modal-content' ).fadeIn( 'fast' ) ;

	// 投票する ⇒いいえ
	$( '#modal-overlay,#vote-no' ).unbind().click( function(){
		//[#modal-content]と[#modal-overlay]をフェードアウトした後、overlay削除
		$( '#modal-content,#modal-overlay' ).fadeOut( 'fast' , function(){
			$('#modal-overlay').remove() ;
			// 確認メッセージを初期化
			$('#modal-confirm').text(confMsgOrg);
		} ) ;
	} ) ;
	
	// 広告効果測定タグ
	var convTag = '<img src="http://www.aaaf.jp/ama.php?n=00032585&id=ogura@akinasista.co.jp&sft=1000" width="1" height="1">';
	
	// 投票する⇒はい
	$( '#vote-yes' ).unbind().click( function(){
		// 「はい」「いいえ」ボタン非表示
		$('#vote-before').hide();
		// 確認メッセージを初期化
		$('#modal-confirm').text(confMsgOrg);
		// 確認メッセージの縦横再設定
		$('#modal-content').width(confWidth);
		$('#modal-content').height(confHeight);
		// 処理状態通知
		$('#vote-after').show();	
		
		// センタリング
		centeringModalSyncer() ;
		// ローディングGIF表示
		$('#vote-loading').html('<img src="common/images/gif-load.gif"/ style="height:50px; width:50px;">');

		$.ajax({
					type: 'POST',
					url: location.href,
					data: {
						'doVote': 1,
						'actId':actId
					},
					success: function(ret){
						　// 処理中メッセージ非表示
							$('#vote-after').hide();	
							// 完了メッセージ表示
							$('#vote-complete').show();	
							// 確認メッセージの縦横再設定
							$('#modal-content').width(confWidth);
							$('#modal-content').height(confHeight);
							
							centeringModalSyncer() ;							
					},
					error:function(ret){
						// todo エラー時
					},
					complete : function(data) {
							// 効果測定タグを付与
							$('#pageTop').append(convTag);
							setTimeout(function(){								
								location.reload();
							},2000);					
                     }
				});
	} ) ;

} ) ;

//リサイズされたら、センタリングをする関数[centeringModalSyncer()]を実行する
$( window ).resize( centeringModalSyncer ) ;

	//センタリングを実行する関数
	function centeringModalSyncer() {
		// モーダルの位置をリセット
		$( '#modal-content' ).css( {"left": 0 + "px","top": 0 + "px"} ) ;
		
		//画面(ウィンドウ)の幅、高さを取得
		var w = $( window ).width() ;
		var h = $( window ).height() ;
		//コンテンツ(#modal-content)の幅、高さを取得
		// var cw = $( '#modal-content' ).outerWidth( {margin:true} );
		// var ch = $( '#modal-content' ).outerHeight( {margin:true} );
		var cw = $( '#modal-content' ).outerWidth();		
		var ch = $( '#modal-content' ).outerHeight();
		//センタリングを実行する
		$( '#modal-content' ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
	}

} ) ;
