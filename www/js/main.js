enchant();

/*　以下、神代メモ
*
*ラベル（文字）の表示範囲について
*enchant.jsの方では、labelの初期設定が300pxになっていたので600pxに変更。widhtの値を変えると文字の表示幅も広がるよ
*あとローディング画面の画像差し替えやバーの差し替えも直接enchant.jsの編集で。ただwebだと動作確認が出来ない（？）ので自分のスマホから見ると良いかも
*関数、クラス、グループを上手く使えるといいのだけど、なかなか…。
*fpsを60から24に変更。やりすぎた。
*クラスにまとめる事で軽量化。同じ動作ならまとめると良い（まとめ方が分からないから困るのだけどね）
*画面サイズの問題：アスペクト比が固定されているのでそれに合わせて画面サイズがリサイズされてる。
*widhtによってheightも代わり、且つ他の画像のサイズや位置は変わらないのでレイアウトが崩れる。
*セーブに関して：store.jsと私の相性はよくないようだ。SBの中身を真似つつ調べて頑張ろう
*/


//セーブ用　使うかは不明
var save = {
    P:0, c1:0, c2:0, c3:0, c4:0, c5:0, c6:0, c7:0, c8:0, c9:0, c10:0,
    c11:0, c12:0, c13:0, c14:0, c15:0, c16:0
}
 /*save.P = PATA_POINT;
    save.c1=PATAn[0]; save.c2=PATAn[1]; save.c3=PATAn[2]; save.c4=PATAn[3]; save.c5=PATAn[4]; save.c6=PATAn[5];
    save.c7=PATAn[6]; save.c8=PATAn[7]; save.c9=PATAn[8]; save.c10=PATAn[9]; save.c11=PATAn[10];
    save.c12=PATAn[11]; save.c13=PATAn[12]; save.c14=PATAn[13]; save.c15=PATAn[14]; save.c16=PATAn[15];
    */
//パタポイント
var PATA_POINT = 0;    										
//パタパタ獲得条件の変数
		
var PATAn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
	PATAn[0] = PATAn[1] = PATAn[2] = PATAn[3] = PATAn[4] = PATAn[5] =PATAn[6] = 
    PATAn[7] = PATAn[8] = PATAn[9] = PATAn[10] = PATAn[11] = PATAn[12] = PATAn[13] =
    PATAn[14] = PATAn[15] = 0;
			


   




window.onload = function() {
		
		wX = 800;
		wY = 1280;
    var game = new Game(wX, wY); // 表示領域の大きさを設定
    game.fps = 24;                 // ゲームの進行スピードを設定


    game.preload(

   './img/start.gif',
   './img/title_window.jpg',
   './img/rogo.png',
   './img/back.gif',
   './img/backwindow.jpg',
   './img/pointBackImage.gif',
   './img/select.png',
   './img/modoru.gif',
   './img/patamessage.png',

	 './img/patapata.png',
   './img/pata2.png',
   './img/pata3.png',
   './img/pata4.png',
	
   './img/pata1-4.png',
   './img/pata2-4.png',
   './img/pata3-4.png',
   './img/pata4-4.png',
   './img/pata5-4.png',
   './img/pata6-4.png',
   './img/pata7-4.png',
   './img/pata8-4.png',
   './img/pata9-4.png',
   './img/pata10-4.png',
   './img/pata11-4.png',
   './img/pata12-4.png',
   './img/pata13-4.png',
   './img/pata14-4.png',
   './img/pata15-4.png',
   './img/pata16-4.png',
   
   './img/Seed1.png',
   './img/Seed2.png',
   './img/Seed3.png',
   './img/bottle.jpg',
   
   './img/gagebar.png',
   './img/hp_max.png',
   './img/hp_center.png',
   './img/hp_dead.png',
   
   './img/hatena.png',
   './img/q.png',
   
	'./img/message_window.png',


   './img/menu1.gif',
   './img/menu2.gif',
   './img/menu3.gif',
   './img/menu4.gif',
   './img/menu5.gif',


   './img/resize.png', //サイズ調整用...だったはずなんだけどね？（普通に使用中）
   './img/resize2.png',



   './img/wantedTitle.png',
   './img/battleTitle.png',


   './img/battlewithBack.jpg',
   './img/clear.png',
   './img/arrow.png',
   
   
   './img/top.gif',
   './img/frame.gif',
   
   './img/cover.png',
   './img/life.png',
   './img/love.png',
   './img/life2.png',
   
   './sound/patase.mp3',
   './sound/patawanted.mp3'

   );



   /* 変数の宣言 */

	    
      var  TUTORIAL_TEXT = ['ようこそ！パタパタコレクションへ！',                       //0
                            '初めましての人かな？説明を聞いていく？',                   //1
                            'ありがとう！<br>それじゃあ簡単に、このゲームの遊び方を説明するね',  //2
                            '僕たちのコンプリート楽しみにしてるよ！',                     //3
                            'いってらっしゃーい',                                           //4
                            'あとで見てもらえばわかるんだけど、下のメニューから「捕獲」ってボタンを選んでもらって、',//5
                            'wantedPataPataっていうゲームを遊ぶとたまに僕たちパタパタが手に入るよ',//6
                            '画面をタッチするだけのゲームだからそんなに難しいことはないんだけど',//7
                            'もしそれでもわからなかったらヘルプを覗いてみてね！',   //8
                            ];                               
      
      
        
        
	    
     	WANTED_POINT = 0;                    // PataWantedのポイント
    	PATAs_DIFFICULTY = 1;										//PataWantedの難易度（パタ数）
        
        var SEED_ONE = SEED_SEC = SEED_THR = 0;
        var Bottle_ONE = Bottle_SEC = Bottle_THR = 0;
        var BOTTLE_ON = 0;
    
		//パタパタ画像の配列
		var arrayImage =
	 ['./img/pata1-4.png','./img/pata2-4.png','./img/pata3-4.png','./img/pata4-4.png',
   './img/pata5-4.png','./img/pata6-4.png','./img/pata7-4.png','./img/pata8-4.png',
   './img/pata9-4.png','./img/pata10-4.png','./img/pata11-4.png','./img/pata12-4.png',
   './img/pata13-4.png','./img/pata14-4.png','./img/pata15-4.png','./img/pata16-4.png']


	//100pxの方のパタパタ配列
		var arrayImageMini =
	['./img/pata2.png',
   './img/pata3.png',
   './img/pata4.png',
   './img/patapata.png']

			
	//プレイ回数のカウント
	var playCount_WANTED = 0;
	var playCount_BATTLE = 0;
    var PLAY_COUNT = 0;
    
    var PATAD_POINT = 2;
			
			


    // ゲームに使う素材を、あらかじめ読み込む
    game.onload = function() { // ゲームの準備が整ったらメインの処理を実行します
       
       
       //以下、クラスの宣言
       
       //カバー画像のクラス
       var coverImage = Class.create(Sprite, {
    	initialize:function() {
			Sprite.call(this,800,1280);
			this.x = 0;
			this.y = 0;
			this.opacity = 0.9
			this.image = game.assets['./img/cover.png'];
		}
	});//ここまでー
       
       //使い方こんなん
       /*使ったらきちんと消してなー。
					var covertop = new coverImage();
					scene.addChild(covertop);
					
					scene.removeChild(covertop);
       */

       
       //メニューボタンを表示するクラスを作成
       //忘れがちなのでメモメモ：等価演算子== , 厳密演算子===
       //コードとしては見づらいけど整理整頓した結果だから堪忍
		var menuButton = Class.create(Sprite, {
		initialize:function(x,y,z) {
			Sprite.call(this,150,150);
			this.x = x;
			this.y = y;
			this.menuN = z;
			this.image = game.assets['./img/menu1.gif'];
				if (this.menuN === 1) {this.addEventListener('touchend',function(){ game.replaceScene(GameSelectScene());});}
				if (this.menuN === 2) {this.image = game.assets['./img/menu2.gif'];
					this.addEventListener('touchend',function(){game.replaceScene(PataRaiseScene());});}
				if (this.menuN === 3) {this.image = game.assets['./img/menu3.gif'];
					this.addEventListener('touchend',function(){game.replaceScene(PataTradeScene());});}
                if (this.menuN === 4) {this.image = game.assets['./img/menu4.gif'];
					this.addEventListener('touchend',function(){ game.replaceScene(PataCollectionScene());});}
				if (this.menuN === 5) {this.image = game.assets['./img/menu5.gif'];
					this.addEventListener('touchend',function(){ game.replaceScene(helpScene());});}}
	});
	//ボタンのクラスここまで。
	//touchstart：タッチ開始時の処理　touchhend：タッチ終了時の処理　今回はあまり違いがないのでコピペそのまま使用
	
      
        
        
        
        //背景画像のクラス～
        var backGroundImage = Class.create (Sprite, {
            initialize : function (x, y, a) {
                Sprite.call(this, wX, wY);
                this.x = x;
                this.y = y;
                this.number = a;
                this.image = game.assets['./img/title_window.jpg'];
                if (this.number === 1){this.image = game.assets['./img/title_window.jpg'];}
                if (this.number === 2){this.image = game.assets['./img/backwindow.jpg'];}
            }
  
        });

        //トップページに戻るボタンのクラス
        var topButton = Class.create (Sprite, {
            initialize : function(x, y){
                Sprite.call(this, 150, 50);
                this.x = x;
                this.y = y;
                this.image = game.assets['./img/top.gif'];
                
                this.addEventListener(Event.TOUCH_START, function(e){
                    game.replaceScene(TopPageScene()); 
                })
            }
        })
        
        
       //パタパタ画像のクラス
       var getPataPata = Class.create(Sprite, {
	
		initialize:function(x,y,p) {
			
			Sprite.call(this,400, 400);
			this.x = x;
			this.y = y;
			this.pataNO = p;
			this.image = game.assets[arrayImage[0]];
			
				if (this.pataNO === 0) {this.image = game.assets[arrayImage[0]];}
				if (this.pataNO === 1) {this.image = game.assets[arrayImage[1]];}
				if (this.pataNO === 2) {this.image = game.assets[arrayImage[2]];}
				if (this.pataNO === 3) {this.image = game.assets[arrayImage[3]];}
				if (this.pataNO === 4) {this.image = game.assets[arrayImage[4]];}
				if (this.pataNO === 5) {this.image = game.assets[arrayImage[5]];}
				if (this.pataNO === 6) {this.image = game.assets[arrayImage[6]];}
				if (this.pataNO === 7) {this.image = game.assets[arrayImage[7]];}
				if (this.pataNO === 8) {this.image = game.assets[arrayImage[8]];}
				if (this.pataNO === 9) {this.image = game.assets[arrayImage[9]];}
				if (this.pataNO === 10) {this.image = game.assets[arrayImage[10]];}
				if (this.pataNO === 11) {this.image = game.assets[arrayImage[11]];}
				if (this.pataNO === 12) {this.image = game.assets[arrayImage[12]];}
				if (this.pataNO === 13) {this.image = game.assets[arrayImage[13]];}
				if (this.pataNO === 14) {this.image = game.assets[arrayImage[14]];}
				if (this.pataNO === 15) {this.image = game.assets[arrayImage[15]];}
				

			}
	});
	//パタパタ画像のクラスここまで
    
    
    //パタパタの表示クラス
    
    var PataD = Class.create(enchant.Sprite, {
           
			initialize: function(x, y, wp){
				enchant.Sprite.call(this, 100, 100);
				this.x = x;
				this.y = y;
                this.wp = wp;
				this.image = game.assets[arrayImageMini[1]];
                this.pataMove();
               if(wp === 1){
                this.image = game.assets[arrayImageMini[3]];
                this.addEventListener(Event.TOUCH_START, function(e){
                    game.assets['./sound/patase.mp3'].play();
                    WANTED_POINT += PATAD_POINT;
                     this.x = Math.random() * 700;                       
                     this.y = Math.random() * 700;   
  
                });
            }
			},

            pataMove: function(){
                var first = true; 
    			var right = true;	//trueなら右、falseなら左
				var up = true;		//trueなら上、falseなら下
				this.on("enterframe", function(){
					if(first){		//このpataが最初に移動する方向
					switch(rand(4)){
					case 0: up = false; break;
					case 1: right = true; break;
					case 2: up = false; break;
					case 3: right = false; break;
					}
					 first = false;
					}
											
					if(this.x >= wX - 100)	//右端に行ったら
					right = false;
					if(this.x <= 0)			//左端に行ったら
					right = true;

					if(this.y >= 700)		//一番下
					up = false;
					if(this.y <= 0)			//一番上
					up = true;

					if(right == true)
					this.x += pataSpeed;
					else
					this.x -= pataSpeed;
					if(up == true)
					this.y += pataSpeed;
					else
					this.y -= pataSpeed;	
												
					});

            }
            
			});
    
       
       


    //ポイント表示
    var POINT = Class.create(Label,  {
        initialize : function(){
            Label.call(this);
            this.x = 60;
            this.y = 40;
            this.text = '所持ポイント：' + PATA_POINT;
            this.color ='#000000';
            this.font = '30px sans-serif';

        }
    })

        var pe = ['一般的なパタパタ。<br>人懐っこく、餌を選ばない。<br>比較的扱いやすいパタパタ',
                  '海辺の岩陰によく生息している。<br>角は一定の長さになると成長が止まり、柔らかくなる。<br>ちょっとおっちょこちょい',
                  '眉が何故か太いパタパタ。<br>真面目そうに見えるが実は何も考えていない',
                  'オシャレが大好きなパタパタ。<br>帽子は落ちそうで落ちないようになっていて、帽子の中身を見ようとすると怒る',
                  '考えていることはほぼ分からないが、人間が食べるナルトが好きなようだ',
                  'ロボットみたいな顔をしているが、実は感受性豊かで優しい心を持っている',
                  'マダム。<br>よくパタパタ婚活会に参加するがいいパタパタに出会えていない',
                  'リボンが大好き。<br>変えのリボンも持っているらしいのだが、どうやって取り替えているのかは不明……',
                  '某猫型ロボットに似ていなくもないがまったくの無関係。<br>温厚で怒った姿を見たことがない',
                  'パタパタは種から生まれていることをより明確にしてくれた存在。<br>パタパタ自身も種になるらしい……？',
                  '生まれた時からメガネを装備している。<br>どうやって着脱しているかは解明されていない',
                  '猫目だが睨んではいない。<br>結構なめんどくさがりやで、いつもふわふわ適当に飛んでいる',
                  '好奇心旺盛うさぎ系パタパタ。<br>ドジっ子を通り過ぎておバカなので気をつけないとみんなが被害を被る',
                  '年中無休で寝ている。<br>いつ起きているのか',
                  '紳士パタパタ。<br>しかし見た目可愛らしいパタパタはどうやっても紳士というよりおめかしした子供に見えてしまう',
                  '年中好きな人がいる。<br>紳士パタパタが最近のお気に入りらしい。好みの人は同じ種でもパタパタによって違うらしい'];
        
        var PE = Class.create(Label,  {
        initialize : function(x, y, type){
            Label.call(this);
            this.x = x;
            this.y = y;
            this.text = 'パタパタ説明文';
            this.color ='#000000';
            this.type = type;
            this.font = '40px sans-serif';
        if(this.type === 0){this.text = pe[0]};
        if(this.type === 1){this.text = pe[1]};
        if(this.type === 2){this.text = pe[2]};
        if(this.type === 3){this.text = pe[3]};
        if(this.type === 4){this.text = pe[4]};
        if(this.type === 5){this.text = pe[5]};
        if(this.type === 6){this.text = pe[6]};
        if(this.type === 7){this.text = pe[7]};
        if(this.type === 8){this.text = pe[8]};
        if(this.type === 9){this.text = pe[9]};
        if(this.type === 10){this.text = pe[10]};
        if(this.type === 11){this.text = pe[11]};
        if(this.type === 12){this.text = pe[12]};
        if(this.type === 13){this.text = pe[13]};
        if(this.type === 14){this.text = pe[14]};
        if(this.type === 15){this.text = pe[15]};
            

        }
    })


        
      
      
    


				//ゲーム開始画面
        var createStartScene = function() {
            var scene = new Scene();                                // 新しいシーンを作る
            GAME_TUTORIAL = 0; // 1の時はチュートリアル（説明）行わない
           
           

               
            //背景画像の設定

           var TitleBG = new backGroundImage(0, 0, 1);
           scene.addChild(TitleBG);
        
           
            
            // スタート画像設定
            var startImage = new Sprite(300, 100);                   // スプライトを作る
            startImage.image = game.assets['./img/start.gif'];     // スタート画像を設定
            startImage.x =250;                                      // 横位置調整
            startImage.y = 1000;                                     // 縦位置調整
            scene.addChild(startImage);                             // シーンに追加
           

             // スタート画像にタッチイベントを設定
            startImage.addEventListener(Event.TOUCH_START, function(e) {				;
                game.replaceScene(TopPageScene()); 
            });

            //パタパタ表示
            var topPata = new Sprite(400, 400);                   // スプライトを作る
            topPata.image = game.assets[arrayImage[0]];     // スタート画像を設定
            topPata.x =200;                                      // 横位置調整
            topPata.y = 600;                                     // 縦位置調整
            scene.addChild(topPata);                             // シーンに追加
            
            

            

            //ロゴ表示
            var Rogo = new Sprite(661, 182);                   // スプライトを作る
            Rogo.image = game.assets['./img/rogo.png'];     // スタート画像を設定
            Rogo.x =100;                                      // 横位置調整
            Rogo.y = 400;                                     // 縦位置調整
            scene.addChild(Rogo);                             // シーンに追加


            

           
            // タイトルシーンを返します。
            return scene;

        };



			
				//トップページ
        var TopPageScene = function() {
            
        	var scene = new Scene();
            
                
       

  				//背景画像
  				var backwindow = new backGroundImage(0, 0, 2); //クラスの呼び出し
                    scene.addChild(backwindow);
        

            
					//パタパタ表示
            var topPata = new Sprite(400, 400);                   // スプライトを作る
            topPata.image = game.assets[arrayImage[rand(9)]];     // スタート画像を設定
            topPata.x =200;                                      // 横位置調整
            topPata.y = 300;                                     // 縦位置調整
            topPata.scale(1.2,1.2);
            scene.addChild(topPata);                             // シーンに追加



             var PM = new Sprite(400, 200);                   // スプライトを作る
            PM.image = game.assets['./img/patamessage.png'];     // スタート画像を設定
            PM.x =200;                                      // 横位置調整
            PM.y = 750;                                     // 縦位置調整
            PM.scale(2,1.7);
            scene.addChild(PM);                             // シーンに追加
            
           var PataT = new Label('タッチでセリフが変わるよ');
            PataT.color = '#000000';                   // 文字を白色に
            PataT.font = '40px ゴシック体';            //  30pxのゴシック体にする
            PataT.textAlign = 'left';                // 左揃えにする
            PataT.width = 590;
            PataT.x = 100;                               // 横位置調整
            PataT.y = 800;                             // 縦位置調整
            scene.addChild(PataT);                     // シーンに追加
           
           PM.addEventListener(Event.TOUCH_START, function(e) {
               var PT = rand(20);
               switch(PT){
               case 0: PataT.text = 'ちゃんと休憩取ってね';  break;
               case 1: PataT.text = 'お疲れさま'; break;
               case 2: PataT.text = 'あと何匹でコンプリートかな？'; break;
               case 3: PataT.text = 'きみと仲良くなりたいな'; break;
               case 4: PataT.text = '種はもう育ててくれた？'; break;
               case 5: PataT.text = 'いっぱいポイント集めてね'; break;
               case 6: PataT.text = '僕たち16種類いるんだけど、実は他にも…'; break;
               case 7: PataT.text = 'ご飯食べた？'; break;
               case 8: PataT.text = '朝って眠いよね。僕たちも朝は苦手'; break;
               case 9: PataT.text = '好きな食べ物？うーん、主食はマシュマロかな？'; break;
               case 10: PataT.text = '羽はあるけど飛んでるより転がってる方が多いよ'; break;
               case 11: PataT.text = 'サイズ？サッカーボールくらい？'; break;
               case 12: PataT.text = '雨の日はべたべたするからきらいー'; break;
               case 13: PataT.text = '今日も楽しい日にしてね'; break;
               case 14: PataT.text = 'お布団が友達'; break;
               case 15: PataT.text = '春と秋が一番好き';break;
               case 16: PataT.text = 'やりすぎよくないよ'; break;
               case 17: PataT.text = '疲れたら甘いものでも'; break;
               case 18: PataT.text = '僕たちはどこにでもいるよ'; break;
               case 19: PataT.text = 'ふわふわころころ'; break;
               case 20: PataT.text = '明日も頑張れるといいね'; break;


               
               }
            });
               
            
            //ポイント表示の背景画像
             var pointBackImage = new Sprite(350, 60);                   // スプライトを作る
            pointBackImage.image = game.assets['./img/pointBackImage.gif'];     // スタート画像を設定
            pointBackImage.x =40;                                      // 横位置調整
            pointBackImage.y = 30;                                     // 縦位置調整
            scene.addChild(pointBackImage);                             // シーンに追加

            
             var point = new POINT();
                scene.addChild(point);

  

				//メニューボタン呼び出し処理
					var menu1 = new menuButton(9,1100,1);
							scene.addChild(menu1);
					var menu2 = new menuButton(167,1100,2);
							scene.addChild(menu2);
					var menu3 = new menuButton(325,1100,3);
							scene.addChild(menu3);
					var menu4 = new menuButton(483,1100,4);
							scene.addChild(menu4);
					var menu5 = new menuButton(641,1100,5);
							scene.addChild(menu5);	
				//メニュー呼び出しここまで

     
           
                
            if(GAME_TUTORIAL === 0){
                
             var cover = new coverImage(0,0);
                cover.opacity = 1;
                scene.addChild(cover);
                var topPata = new Sprite(400, 400);                   // スプライトを作る
            topPata.image = game.assets[arrayImage[0]];     // スタート画像を設定
            topPata.x =200;                                      // 横位置調整
            topPata.y = 300;                                     // 縦位置調整
            topPata.scale(1.2,1.2);
            scene.addChild(topPata);                             // シーンに追加
                
               
            var text = new Label(TUTORIAL_TEXT[0]);
                text.x = 80; text.y = 700;
                text.font = '40px ゴシック体';
                scene.addChild(text);
           
            cover.addEventListener(Event.TOUCH_START, function(e) {
                if(GAME_TUTORIAL === 0){
                 text.text = TUTORIAL_TEXT[1];
                GAME_TUTORIAL = 1;
                var yes = new Label('はい');
                yes.x = 200; yes.y = 900;
                yes.font = '50px ゴシック体';
                scene.addChild(yes);
            yes.addEventListener(Event.TOUCH_START, function(e){
                scene.removeChild(yes);
                scene.removeChild(no);
                text.text = TUTORIAL_TEXT[2];
                 GAME_TUTORIAL = 2;     
            });
                var no = new Label('いいえ');
                no.x = 450; no.y = 900;
                no.font = '50px ゴシック体';
                scene.addChild(no); 
            no.addEventListener(Event.TOUCH_START, function(e){
                 scene.removeChild(yes);
                scene.removeChild(no);
                 text.text = TUTORIAL_TEXT[3];
                 GAME_TUTORIAL = 7;
            });
                } else if (GAME_TUTORIAL === 2){
                text.text = TUTORIAL_TEXT[5];
                GAME_TUTORIAL = 3;    
                } else if (GAME_TUTORIAL === 3){
                text.text = TUTORIAL_TEXT[6];
                GAME_TUTORIAL = 4;
                } else if (GAME_TUTORIAL === 4){
                text.text = TUTORIAL_TEXT[7];
                GAME_TUTORIAL = 5;
                } else if (GAME_TUTORIAL === 5){
                text.text = TUTORIAL_TEXT[8];
                GAME_TUTORIAL = 6;
                } else if (GAME_TUTORIAL === 6){
                text.text = TUTORIAL_TEXT[3];
                GAME_TUTORIAL = 7;
                } else if (GAME_TUTORIAL === 7){
                text.text = TUTORIAL_TEXT[4];
                GAME_TUTORIAL = 8;
                } else if (GAME_TUTORIAL === 8){
                text.text = '';
                scene.removeChild(cover);
                scene.removeChild(topPata);
                }
            });
                
            }
        

            
            return scene;


        }

        /* ここからそれぞれメニューのシーンを記載
        *menu1 : GameSelectScene → WantedPataScene & BattleWithPataScene →clearScene
				*menu2 : PataRaiseScne
				*menu3 : PataTradeScene
				*menu4 : PataCollectionScene → PataCollectionSecondScene
				*menu5 : helpScene
				*/


				//捕獲　ミニゲーム選択画面（もはやミニゲームじゃなくなってるのはご愛嬌）
        var GameSelectScene = function() {
				var scene = new Scene();
                

  				//背景画像
  				var backwindow = new backGroundImage(0, 0, 2); //クラスの呼び出し
                    scene.addChild(backwindow);

						 //ポイント表示の背景画像
             var pointBackImage = new Sprite(350, 60);                   // スプライトを作る
            pointBackImage.image = game.assets['./img/pointBackImage.gif'];     // スタート画像を設定
            pointBackImage.x =40;                                      // 横位置調整
            pointBackImage.y = 30;                                     // 縦位置調整
            scene.addChild(pointBackImage);                             // シーンに追加
				
                //ポイント表示
                var point = new POINT();
                scene.addChild(point);

			//メニューボタン呼び出し処理
					var menu1 = new menuButton(9,1100,1);
							scene.addChild(menu1);
					var menu2 = new menuButton(167,1100,2);
							scene.addChild(menu2);
					var menu3 = new menuButton(325,1100,3);
							scene.addChild(menu3);
					var menu4 = new menuButton(483,1100,4);
							scene.addChild(menu4);
					var menu5 = new menuButton(641,1100,5);
							scene.addChild(menu5);	
				//メニュー呼び出しここまで


            //トップに戻るボタン
                var backButton = new topButton(600, 40);
                    scene.addChild(backButton);
  
            //wanted patapata
            var selectGame1 = new Sprite(800, 150);                   // スプライトを作る
            selectGame1.image = game.assets['./img/resize.png'];     // スタート画像を設定
            selectGame1.x =0;                                      // 横位置調整
            selectGame1.y =150;                                     // 縦位置調整
            scene.addChild(selectGame1);                             // シーンに追加

            //wanpata rogo
            var selectWanted = new Sprite(428, 134);                   // スプライトを作る
            selectWanted.image = game.assets['./img/wantedTitle.png'];     // スタート画像を設定
            selectWanted.x =190;                                      // 横位置調整
            selectWanted.y =160;                                     // 縦位置調整
            scene.addChild(selectWanted);                             // シーンに追加
            

            // スタート画像にタッチイベントを設定
           selectWanted.addEventListener(Event.TOUCH_START, function(e) {
              
                game.replaceScene(WantedPataScene());    // 現在表示しているシーンをゲームシーンに置き換える
            });
            
            
             var PataT = new Label('☆難易度選択☆');
            PataT.color = '#000000';                   // 文字を白色に
            PataT.font = '50px ゴシック体';            //  30pxのゴシック体にする
            PataT.textAlign = 'left';                // 左揃えにする
            PataT.width = 590;
            PataT.x = 230;                               // 横位置調整
            PataT.y = 350;                             // 縦位置調整
            scene.addChild(PataT);                     // シーンに追加
            
            
            
            var star1 = new Label('★');
            star1.color = '#000000';                   // 文字を白色に
            star1.font = '100px ゴシック体';            //  30pxのゴシック体にする
            star1.textAlign = 'left';                // 左揃えにする
            star1.width = 590;
            star1.x = 350;                               // 横位置調整
            star1.y = 500;                             // 縦位置調整
            scene.addChild(star1);                     // シーンに追加
            star1.addEventListener(Event.TOUCH_START, function(e) {
                PATAD_POINT = 2;
                PATAs_DIFFICULTY = 1;
                game.replaceScene(WantedPataScene());    // 現在表示しているシーンをゲームシーンに置き換える
            });
            
            var star2 = new Label('★★');
            star2.color = 'blue';                   // 文字を白色に
            star2.font = '100px ゴシック体';            //  30pxのゴシック体にする
            star2.textAlign = 'left';                // 左揃えにする
            star2.width = 590;
            star2.x = 310;                               // 横位置調整
            star2.y = 700;                             // 縦位置調整
            scene.addChild(star2);                     // シーンに追加
            star2.addEventListener(Event.TOUCH_START, function(e) {
                PATAD_POINT = 5;
                PATAs_DIFFICULTY = 2;
                game.replaceScene(WantedPataScene());    // 現在表示しているシーンをゲームシーンに置き換える
            });
            
            var star3 = new Label('★★★');
            star3.color = 'red';                   // 文字を白色に
            star3.font = '100px ゴシック体';            //  30pxのゴシック体にする
            star3.textAlign = 'left';                // 左揃えにする
            star3.width = 590;
            star3.x = 270;                               // 横位置調整
            star3.y = 900;                             // 縦位置調整
            scene.addChild(star3);                     // シーンに追加
            star3.addEventListener(Event.TOUCH_START, function(e) {
                PATAD_POINT = 8;
                PATAs_DIFFICULTY = 3;
                game.replaceScene(WantedPataScene());    // 現在表示しているシーンをゲームシーンに置き換える
            });
            
            
            
            
            
	         
		         return scene;

        }





				//ウォンテッドパタパタ
      
        var WantedPataScene = function() {
            var scene = new Scene();                            // 新しいシーンを作る																			//パタパタの速度のリセット
      				//PATAs_DIFFICULTY = 1;										//PataWantedの難易度（パタ数）のリセット
        			time =  320 ;                                   // 残り時間を初期化
                    WANTED_POINT = 0;
                    PATA_C = rand(3);
                    playCount_WANTED = 0;
                    pataSpeed = 10;

                   bgm = game.assets['./sound/patawanted.mp3'];
                   bgm.play();

         //背景画像
  		var backwindow = new backGroundImage(0, 0, 2); //クラスの呼び出し
                    scene.addChild(backwindow);

				//戻るボタン
        var BackButton = new Sprite(150, 50);                   // スプライトを作る
        BackButton.image = game.assets['./img/modoru.gif'];     // スタート画像を設定
        BackButton.x =600;                                      // 横位置調整
        BackButton.y = 1200;                                     // 縦位置調整
        scene.addChild(BackButton);                             // シーンに追加


        BackButton.addEventListener(Event.TOUCH_START, function(e) {
            bgm.stop();
        		WANTED_POINT = 0;
                
            game.replaceScene(GameSelectScene());    // 現在表示しているシーンをゲームシーンに置き換える
        });

        //ポイント表示の背景画像
         var pointBackImage = new Sprite(350, 60);                   // スプライトを作る
        pointBackImage.image = game.assets['./img/pointBackImage.gif'];     // スタート画像を設定
        pointBackImage.x =10;                                      // 横位置調整
        pointBackImage.y = 850;                                     // 縦位置調整
        scene.addChild(pointBackImage);                             // シーンに追加



            var wantedPoint = new Label('獲得ポイント：' + WANTED_POINT);
            wantedPoint.color = '#000000';                   // 文字を白色に
            wantedPoint.font = '28px sans-serif';            //  30pxのゴシック体にする
            wantedPoint.textAlign = 'left';                // 左揃えにする

            wantedPoint.x = 50;                               // 横位置調整
            wantedPoint.y = 870;                             // 縦位置調整
            scene.addChild(wantedPoint);                     // シーンに追加


            // 残り時間欄を作成
            var timeLimit = new Label('残り時間:' + time);       // 残り時間: ○○と表示するラベルを作る
            timeLimit.font = '30px sans-serif';                 // 14pxのゴシック体にする
						timeLimit.x = 500;                                    // 横位置調整
            timeLimit.y = 870;                                   // 縦位置調整
            scene.addChild(timeLimit);                          // シーンに追加
            
             var wantedBord = new Label('この子を探せ！');       // 残り時間: ○○と表示するラベルを作る
            wantedBord.font = '30px sans-serif';                 // 14pxのゴシック体にする
						wantedBord.x = 60;                                    // 横位置調整
            wantedBord.y = 950;                                   // 縦位置調整
            scene.addChild(wantedBord);                          // シーンに追加


					var wantedC = new Sprite(100, 100);                   // スプライトを作る
        wantedC.image = game.assets['./img/patapata.png'];     // スタート画像を設定
        wantedC.x =90;                                      // 横位置調整
        wantedC.y =1000;                                     // 縦位置調整
        wantedC.scale(1.4,1.4)
        scene.addChild(wantedC);                             // シーンに追加
        
        
        
        //パタパタ出現。めっちゃ短くなりましたー！
        for(i=0; i < 20; i++){
            if(PATAs_DIFFICULTY === 1){
                var pata = new PataD(rand(700),rand(700));
                    scene.addChild(pata);
            } 
            if(PATAs_DIFFICULTY === 2){
                var pata = new PataD(rand(700),rand(700));
                    pata.image = game.assets[arrayImageMini[rand(1)]];
                    scene.addChild(pata);
            }
            if(PATAs_DIFFICULTY === 3){
                var pata = new PataD(rand(700),rand(700));
                    pata.image = game.assets[arrayImageMini[rand(2)]];
                    scene.addChild(pata);
        }
        }
        var wpa = new PataD(400,400,1);
            scene.addChild(wpa);
            

            // シーンに毎フレームイベントを設定
            scene.addEventListener(Event.ENTER_FRAME, function() {
                time --;                                // 残り時間を1ずつ減らす デバッグのため増やしてます
                timeLimit.text = '残り時間:' + time;    // 残り時間の表示を更新
				 				// 時間切れ
                  wantedPoint.text = '獲得ポイント：' + WANTED_POINT;
               if (time <= 0) {
                    playCount_WANTED = 1;
                    game.replaceScene(clearScene());    // 現在表示しているシーンをゲームオーバーシーンに置き換える
                    
                }
                
            });



            // ゲームシーンを返す
            return scene;
        };


       

			//育成画面
			
			var PataRaiseScene = function() {
			
			var scene = new Scene();
            
            
                
			
			//背景画像
  			var backwindow = new backGroundImage(0, 0, 2); //クラスの呼び出し
                    scene.addChild(backwindow);

				
				 //ポイント表示の背景画像
             var pointBackImage = new Sprite(350, 60);                   // スプライトを作る
            pointBackImage.image = game.assets['./img/pointBackImage.gif'];     // スタート画像を設定
            pointBackImage.x =40;                                      // 横位置調整
            pointBackImage.y = 30;                                     // 縦位置調整
            scene.addChild(pointBackImage);                             // シーンに追加

            var frame = new Sprite(707, 719);                   // スプライトを作る
            frame.image = game.assets['./img/frame.gif'];     // スタート画像を設定
            frame.x =-120;                                      // 横位置調整
            frame.y = 580;                                     // 縦位置調整
            frame.scale(0.35, 0.35);
            scene.addChild(frame);                             // シーンに追加

        


             //ポイント表示
                var point = new POINT();
                scene.addChild(point);

            //トップに戻るボタン
                var backButton = new topButton(600, 40);
                    scene.addChild(backButton);
  

				//ボトル
				var bottleImage = new Sprite(155, 250);                   // スプライトを作る
            bottleImage.image = game.assets['./img/bottle.jpg'];     // スタート画像を設定
            bottleImage.x =150;                                      // 横位置調整
            bottleImage.y =400;                                     // 縦位置調整
            bottleImage.scale(2, 2);
            scene.addChild(bottleImage);                             // シーンに追加
				
                
             var count = new Label(PLAY_COUNT);
            count.color = '#000000';                   // 文字を白色に
            count.font = '150px sans-serif';            //  30pxのゴシック体にする
            count.textAlign = 'left';                // 左揃えにする
            count.x = 140;                               // 横位置調整
            count.y = 850;                             // 縦位置調整
            scene.addChild(count);                     // シーンに追加    
                
                
            var plant = new Label('育てる種を選んでね');
            plant.color = '#000000';                   // 文字を白色に
            plant.font = '40px sans-serif';            //  30pxのゴシック体にする
            plant.textAlign = 'left';                // 左揃えにする
            plant.x = 400;                               // 横位置調整
            plant.y = 200;                             // 縦位置調整
            scene.addChild(plant);                     // シーンに追加    
			
            var harvest = new Label('収穫する');
            harvest.color = '#000000';                   // 文字を白色に
            harvest.font = '50px sans-serif';            //  30pxのゴシック体にする
            harvest.textAlign = 'left';                // 左揃えにする
            harvest.x = 500;                              // 横位置調整
            harvest.y = 900;                             // 縦位置調整
            scene.addChild(harvest);                     // シーンに追加    
           
           if(BOTTLE_ON === 1 && PLAY_COUNT === 0){
                harvest.color = 'blue';
                harvest.addEventListener(Event.TOUCH_START, function(e){
                   if(Bottle_ONE ===1){
                         BOTTLE_ON = 0;
                        Bottle_ONE = 0;
                       var cover = new coverImage();
                       scene.addChild(cover);
                       var getText = new Label('パタパタを収穫したよ！');
                            getText.color = '#000000';                   // 文字を白色に
                            getText.font = '50px sans-serif';            //  30pxのゴシック体にする
                            getText.textAlign = 'left';                // 左揃えにする
                            getText.x = 100;                              // 横位置調整
                            getText.y = 500;                             // 縦位置調整
                            scene.addChild(getText);                     // シーンに追加    
                getPataCount = rand(6);
                switch(getPataCount){
                case 0: 
                    PATAn[0] = 1;
            		var getP = new getPataPata(300,700,0);
        				scene.addChild(getP);
            		break;
            		
                case 1:
            		PATAn[1] = 1;
            		var getP = new getPataPata(300,700,1);
        				scene.addChild(getP);
            		break;
                case 2:
                    PATAn[2] = 1;
                	var getP = new getPataPata(300,700,1);
        				scene.addChild(getP);
            		break;
                case 3:
                    PATAn[3] = 1;
                	var getP = new getPataPata(300,700,4);
        				scene.addChild(getP);
                 case 4:
                	PATAn[4] = 1;
            		var getP = new getPataPata(300,700,4);
        				scene.addChild(getP);
            		break;
                 case 5:
            		PATAn[5] = 1;
            		var getP = new getPataPata(300,700,5);
        				scene.addChild(getP);
            		break;
                }    
                      
                        cover.addEventListener(Event.TOUCH_START, function(e){
                            count.text = '';
                            harvest.color = '#000000';
                            scene.removeChild(getP);
                            scene.removeChild(cover);
                            scene.removeChild(getText);
                            scene.removeChild(Collection);
                        });
                    }
                    if(Bottle_SEC ===1){
                         BOTTLE_ON = 0;
                        Bottle_SEC = 0;
                       var cover = new coverImage();
                       scene.addChild(cover);
                       var getText = new Label('パタパタを収穫したよ！');
                            getText.color = '#000000';                   // 文字を白色に
                            getText.font = '50px sans-serif';            //  30pxのゴシック体にする
                            getText.textAlign = 'left';                // 左揃えにする
                            getText.x = 100;                              // 横位置調整
                            getText.y = 500;                             // 縦位置調整
                            scene.addChild(getText);                     // シーンに追加    
                        
                        
                         getPataCount = rand(8);
                              switch(getPataCount){
                            case 0:
                                    PATAn[6] = 1;
                            		var getP = new getPataPata(300,700,6);
                        				scene.addChild(getP);
                            		break;
                            case 1:
                            		PATAn[7] = 1;
                            		var getP = new getPataPata(300,700,7);
                        				scene.addChild(getP);
                            		break;
                             case 2:
                            		PATAn[8] = 1;
                            		var getP = new getPataPata(300,700,8);
                        				scene.addChild(getP);
                            		break;
                            case 3:
                            		PATAn[9] = 1;
                            		var getP = new getPataPata(300,700,9);
                        				scene.addChild(getP);
                            		break;
                            case 4:
                            		PATAn[10] = 1;
                            		var getP = new getPataPata(300,700,10);
                        				scene.addChild(getP);
                            		break;
                             case 5:
                            		PATAn[11] = 1;
                            		var getP = new getPataPata(300,700, 11);
                        				scene.addChild(getP);
                            		break;
                             case 6:
                                	PATAn[12] = 1;
                            		var getP = new getPataPata(300,700, 12);
                        				scene.addChild(getP);
                            		break;
                              }
                      
                        cover.addEventListener(Event.TOUCH_START, function(e){
                            count.text = '';
                            harvest.color = '#000000';
                            scene.removeChild(cover);
                            scene.removeChild(getText);
                            scene.removeChild(Collection);
                        });
                    }
                    if(Bottle_THR ===1){
                         BOTTLE_ON = 0;
                        Bottle_THR = 0;
                       var cover = new coverImage();
                       scene.addChild(cover);
                       var getText = new Label('パタパタを収穫したよ！');
                            getText.color = '#000000';                   // 文字を白色に
                            getText.font = '50px sans-serif';            //  30pxのゴシック体にする
                            getText.textAlign = 'left';                // 左揃えにする
                            getText.x = 100;                              // 横位置調整
                            getText.y = 500;                             // 縦位置調整
                            scene.addChild(getText);                     // シーンに追加    
                      getPataCount = rand(5);
                            switch(getPataCount){
                            case 0:
                                    PATAn[13] = 1;
                            		var getP = new getPataPata(300,700,13);
                        				scene.addChild(getP);
                            		break;
                             case 1:
                            		PATAn[14] = 1;
                            		var getP = new getPataPata(300,700,14);
                        				scene.addChild(getP);
                            		break;
                            case 2:
                            		PATAn[15] = 1;
                            		var getP = new getPataPata(300,700,15);
                        				scene.addChild(getP);
                            		break;
                            case 3:
                                        PATAn[6] = 1;
                            		var getP = new getPataPata(300,700,6);
                        				scene.addChild(getP);
                            		break; 
                            case 4:
                                        PATAn[8] = 1;
                            		var getP = new getPataPata(300,700,8);
                        				scene.addChild(getP);
                            		break;
                            }
                            cover.addEventListener(Event.TOUCH_START, function(e){
                            count.text = '';
                            harvest.color = '#000000';
                            scene.removeChild(cover);
                            scene.removeChild(getText);
                            scene.removeChild(Collection);
                        });
                    }
            
            
            
            
            
            
                });
            }
   
            
            var seed1 = new Label('ふつうの種');
            seed1.color = '#000000';                   // 文字を白色に
            seed1.font = '39px sans-serif';            //  30pxのゴシック体にする
            seed1.textAlign = 'left';                // 左揃えにする
            seed1.x = 450;                              // 横位置調整
            seed1.y = 350;                             // 縦位置調整
            scene.addChild(seed1);                     // シーンに追加   
            
             var seedcount = new Label('所持数：'+ SEED_ONE);
            seedcount.color = 'green';                   // 文字を白色に
            seedcount.font = '39px sans-serif';            //  30pxのゴシック体にする
            seedcount.textAlign = 'left';                // 左揃えにする
            seedcount.x = 500;                              // 横位置調整
            seedcount.y = 400;                             // 縦位置調整
            scene.addChild(seedcount);                     // シーンに追加   
            seed1.addEventListener(Event.TOUCH_START, function(e){

                if((Bottle_ONE === 0) && (SEED_ONE > 0) && (BOTTLE_ON === 0)){
                SEED_ONE -= 1;
                Bottle_ONE = 1;
                var Collection = new Sprite(200,200);
            	Collection.image = game.assets['./img/Seed1.png'];
        		Collection.x = 140;
        		Collection.y = 550;
        		Collection.opacity = 0.5;
        		scene.addChild(Collection);
                PLAY_COUNT = 3;
                count.text = PLAY_COUNT;
                BOTTLE_ON = 1;
                count.x = 180;
                    } else {
                        var cover = new coverImage();
                            cover.opacity = 0.98;
                            scene.addChild(cover);
                        var text = new Label('種を育てられないよ');       // 残り時間: ○○と表示するラベルを作る
                    text.font = '40px sans-serif';                 // 14pxのゴシック体にする
        		    text.x = 300;                                    // 横位置調整
                    text.y =270;                                   // 縦位置調整
                    scene.addChild(text);      
                    
                    cover.addEventListener(Event.TOUCH_START, function(e){
                        scene.removeChild(cover);
                        scene.removeChild(text);
                    });

                    }
                
            });
            
            if (Bottle_ONE === 1){
                    var Collection = new Sprite(200,200);
                Collection.image = game.assets['./img/Seed1.png'];
            	Collection.x = 140;
        		Collection.y = 550;
        		Collection.opacity = 0.5;
                scene.addChild(Collection);
                count.text = PLAY_COUNT;
                count.x = 180;
                }
                
            
            
            var seed2 = new Label('　すごい種');
            seed2.color = '#000000';                   // 文字を白色に
            seed2.font = '39px sans-serif';            //  30pxのゴシック体にする
            seed2.textAlign = 'left';                // 左揃えにする
            seed2.x = 450;                              // 横位置調整
            seed2.y = 500;                             // 縦位置調整
            scene.addChild(seed2);                     // シーンに追加 
            
             var seedcount = new Label('所持数：'+ SEED_SEC);
            seedcount.color = 'green';                   // 文字を白色に
            seedcount.font = '39px sans-serif';            //  30pxのゴシック体にする
            seedcount.textAlign = 'left';                // 左揃えにする
            seedcount.x = 500;                              // 横位置調整
            seedcount.y = 550;                             // 縦位置調整
            scene.addChild(seedcount);                     // シーンに追加   
            
            seed2.addEventListener(Event.TOUCH_START, function(e){
                if(Bottle_SEC === 0 && SEED_SEC > 0 && BOTTLE_ON === 0){
                SEED_SEC -= 1;
                Bottle_SEC = 1;
                var Collection = new Sprite(200,200);
                Collection.image = game.assets['./img/Seed2.png'];
        		Collection.x = 140;
        		Collection.y = 550;
        		Collection.opacity = 0.5;
        		scene.addChild(Collection);
                PLAY_COUNT = 5;
                count.text = PLAY_COUNT;
                BOTTLE_ON = 1;
                count.x = 180;
                
                }else {
                        var cover = new coverImage();
                            cover.opacity = 0.98;
                            scene.addChild(cover);
                        var text = new Label('種を育てられないよ');       // 残り時間: ○○と表示するラベルを作る
                    text.font = '40px sans-serif';                 // 14pxのゴシック体にする
            	    text.x = 300;                                    // 横位置調整
                    text.y =270;                                   // 縦位置調整
                    scene.addChild(text);      
                    
                    cover.addEventListener(Event.TOUCH_START, function(e){
                        scene.removeChild(cover);
                        scene.removeChild(text);
                    });

                    }
            });
            if (Bottle_SEC === 1){
                    var Collection = new Sprite(200,200);
                Collection.image = game.assets['./img/Seed2.png'];
            	Collection.x = 140;
        		Collection.y = 550;
        		Collection.opacity = 0.5;
                scene.addChild(Collection);
                count.text = PLAY_COUNT;
                count.x = 180;
                }
                
            
            
             var seed3 = new Label('　やばい種');
            seed3.color = '#000000';                   // 文字を白色に
            seed3.font = '39px sans-serif';            //  30pxのゴシック体にする
            seed3.textAlign = 'left';                // 左揃えにする
            seed3.x = 450;                              // 横位置調整
            seed3.y = 650;                             // 縦位置調整
            scene.addChild(seed3);                     // シーンに追加 
            
             var seedcount = new Label('所持数：'+ SEED_THR);
            seedcount.color = 'green';                   // 文字を白色に
            seedcount.font = '39px sans-serif';            //  30pxのゴシック体にする
            seedcount.textAlign = 'left';                // 左揃えにする
            seedcount.x = 500;                              // 横位置調整
            seedcount.y = 700;                             // 縦位置調整
            scene.addChild(seedcount);                     // シーンに追加   
            
            seed3.addEventListener(Event.TOUCH_START, function(e){
                    if(Bottle_THR === 0 && SEED_THR > 0 && BOTTLE_ON === 0){
                SEED_THR -= 1;
                Bottle_THR = 1;
                var Collection = new Sprite(200,200);
                Collection.image = game.assets['./img/Seed3.png'];
        		Collection.x = 140;
        		Collection.y = 550;
        		Collection.opacity = 0.5;
        		scene.addChild(Collection);
                PLAY_COUNT = 8;
                count.text = PLAY_COUNT;
                BOTTLE_ON = 1;
                count.x = 180;
  
                }else {
                        var cover = new coverImage();
                            cover.opacity = 0.98;
                            scene.addChild(cover);
                        var text = new Label('種を育てられないよ');       // 残り時間: ○○と表示するラベルを作る
                    text.font = '40px sans-serif';                 // 14pxのゴシック体にする
            	    text.x = 300;                                    // 横位置調整
                    text.y =270;                                   // 縦位置調整
                    scene.addChild(text);      
                    
                    cover.addEventListener(Event.TOUCH_START, function(e){
                        scene.removeChild(cover);
                        scene.removeChild(text);
                    });

                    }
            });
            if (Bottle_THR === 1){
                    var Collection = new Sprite(200,200);
                Collection.image = game.assets['./img/Seed3.png'];
            	Collection.x = 140;
        		Collection.y = 550;
        		Collection.opacity = 0.5;
                scene.addChild(Collection);
                count.text = PLAY_COUNT;
                count.x = 180;
                }
            

                
				
				
				  //メニューボタン呼び出し処理
					var menu1 = new menuButton(9,1100,1);
							scene.addChild(menu1);
					var menu2 = new menuButton(167,1100,2);
							scene.addChild(menu2);
					var menu3 = new menuButton(325,1100,3);
							scene.addChild(menu3);
					var menu4 = new menuButton(483,1100,4);
							scene.addChild(menu4);
					var menu5 = new menuButton(641,1100,5);
							scene.addChild(menu5);	
				//メニュー呼び出しここまで
			
			return scene;
			}





				//パタパタを種と交換
				
				
				var PataTradeScene = function() {
				
				var scene = new Scene();
				
				//背景画像
  				var backwindow = new backGroundImage(0, 0, 2); //クラスの呼び出し
                    scene.addChild(backwindow);                    // シーンに追加

				
				//ポイント表示の背景画像
             var pointBackImage = new Sprite(350, 60);                   // スプライトを作る
            pointBackImage.image = game.assets['./img/pointBackImage.gif'];     // スタート画像を設定
            pointBackImage.x =40;                                      // 横位置調整
            pointBackImage.y = 30;                                     // 縦位置調整
            scene.addChild(pointBackImage);                             // シーンに追加


            //ポイント表示
                var myPoint = new POINT();
                scene.addChild(myPoint);

            //トップに戻るボタン
                var backButton = new topButton(600, 40);
                    scene.addChild(backButton);
  
				
				
				  	//メニューボタン呼び出し処理
					var menu1 = new menuButton(9,1100,1);
							scene.addChild(menu1);
					var menu2 = new menuButton(167,1100,2);
							scene.addChild(menu2);
					var menu3 = new menuButton(325,1100,3);
							scene.addChild(menu3);
					var menu4 = new menuButton(483,1100,4);
							scene.addChild(menu4);
					var menu5 = new menuButton(641,1100,5);
							scene.addChild(menu5);	
				//メニュー呼び出しここまで
				
				
				 var Collection = new Sprite(200,200);
        		Collection.image = game.assets['./img/Seed1.png'];
        		Collection.x = 40;
        		Collection.y = 200;
        		scene.addChild(Collection);
        		
        		var text = new Label('ふつうの種　30ポイント');       // 残り時間: ○○と表示するラベルを作る
                    text.font = '40px sans-serif';                 // 14pxのゴシック体にする
				    text.x = 300;                                    // 横位置調整
                    text.y =270;                                   // 縦位置調整
                    scene.addChild(text);                          // シーンに追加
                var text2 = new Label('交換する');       // 残り時間: ○○と表示するラベルを作る
                    text2.font = '30px sans-serif';                 // 14pxのゴシック体にする
    			    text2.x = 300;                                    // 横位置調整
                    text2.y =320;                                   // 縦位置調整
                    scene.addChild(text2);                          // シーンに追加
                    
                text2.addEventListener(Event.TOUCH_START, function(e){
                    
                    if(PATA_POINT < 40){
                        var cover = new coverImage();
                            cover.opacity = 0.98;
                            scene.addChild(cover);
                        var text = new Label('ポイントが足りないよ');       // 残り時間: ○○と表示するラベルを作る
                    text.font = '40px sans-serif';                 // 14pxのゴシック体にする
    			    text.x = 300;                                    // 横位置調整
                    text.y =270;                                   // 縦位置調整
                    scene.addChild(text);                          // シーンに追加
                cover.addEventListener(Event.TOUCH_START, function(e){
                   scene.removeChild(text);
                   scene.removeChild(cover); 

                });
                    } else {
                        var cover = new coverImage();
                            cover.opacity = 0.98;
                            scene.addChild(cover);
                    var text = new Label('ふつうの種を手に入れた');       // 残り時間: ○○と表示するラベルを作る
                    text.font = '40px sans-serif';                 // 14pxのゴシック体にする
        		    text.x = 300;                                    // 横位置調整
                    text.y =270;                                   // 縦位置調整
                    scene.addChild(text);      
                    SEED_ONE += 1;
                    PATA_POINT -= 40;
                    myPoint.text = '所持ポイント：' + PATA_POINT;
                    
                    cover.addEventListener(Event.TOUCH_START, function(e){
                   scene.removeChild(text);
                   scene.removeChild(cover); 

                });
                    }
                
                    
                    
                });
                
            
            
            var Collection = new Sprite(200,200);
        		Collection.image = game.assets['./img/Seed2.png'];
        		Collection.x = 40;
        		Collection.y = 460;
        		
        		scene.addChild(Collection);
        		
        		var text = new Label('すごい種　 50ポイント');       // 残り時間: ○○と表示するラベルを作る
                    text.font = '40px sans-serif';                 // 14pxのゴシック体にする
					text.x = 300;                                    // 横位置調整
                    text.y =520;                                   // 縦位置調整
            scene.addChild(text);                          // シーンに追加
            
            var text2 = new Label('交換する');       // 残り時間: ○○と表示するラベルを作る
                    text2.font = '30px sans-serif';                 // 14pxのゴシック体にする
        		    text2.x = 300;                                    // 横位置調整
                    text2.y =570;                                   // 縦位置調整
                    scene.addChild(text2);                          // シーンに追加
                    
                text2.addEventListener(Event.TOUCH_START, function(e){
                    
                    if(PATA_POINT < 50){
                        var cover = new coverImage();
                            cover.opacity = 0.98;
                            scene.addChild(cover);
                        var text = new Label('ポイントが足りないよ');       // 残り時間: ○○と表示するラベルを作る
                    text.font = '40px sans-serif';                 // 14pxのゴシック体にする
    			    text.x = 300;                                    // 横位置調整
                    text.y =520;                                   // 縦位置調整
                    scene.addChild(text);                          // シーンに追加
                cover.addEventListener(Event.TOUCH_START, function(e){
                   scene.removeChild(text);
                   scene.removeChild(cover); 

                });
                    } else {
                        var cover = new coverImage();
                            cover.opacity = 0.98;
                            scene.addChild(cover);
                    var text = new Label('すごい種を手に入れた');       // 残り時間: ○○と表示するラベルを作る
                    text.font = '40px sans-serif';                 // 14pxのゴシック体にする
        		    text.x = 300;                                    // 横位置調整
                    text.y =270;                                   // 縦位置調整
                    scene.addChild(text);      
                    SEED_SEC += 1;
                    PATA_POINT -= 50;
                    myPoint.text = '所持ポイント：' + PATA_POINT;
                    
                    cover.addEventListener(Event.TOUCH_START, function(e){
                   scene.removeChild(text);
                   scene.removeChild(cover); 

                });
                    }
                
                    
                    
                });
                
            
            var Collection = new Sprite(200,200);
        		Collection.image = game.assets['./img/Seed3.png'];
        		Collection.x = 40;
        		Collection.y = 720;
        		
        		scene.addChild(Collection);
        		
        		var text = new Label('やばい種　100ポイント');       // 残り時間: ○○と表示するラベルを作る
                    text.font = '40px sans-serif';                 // 14pxのゴシック体にする
					text.x = 300;                                    // 横位置調整
                    text.y =780;                                   // 縦位置調整
                    scene.addChild(text);                          // シーンに追加
            
            var text2 = new Label('交換する');       // 残り時間: ○○と表示するラベルを作る
                    text2.font = '30px sans-serif';                 // 14pxのゴシック体にする
        		    text2.x = 300;                                    // 横位置調整
                    text2.y =830;                                   // 縦位置調整
                    scene.addChild(text2);                          // シーンに追加
                    
                text2.addEventListener(Event.TOUCH_START, function(e){
                    
                    if(PATA_POINT < 100){
                        var cover = new coverImage();
                            cover.opacity = 0.98;
                            scene.addChild(cover);
                        var text = new Label('ポイントが足りないよ');       // 残り時間: ○○と表示するラベルを作る
                    text.font = '40px sans-serif';                 // 14pxのゴシック体にする
    			    text.x = 300;                                    // 横位置調整
                    text.y =780;                                   // 縦位置調整
                    scene.addChild(text);                          // シーンに追加
                cover.addEventListener(Event.TOUCH_START, function(e){
                   scene.removeChild(text);
                   scene.removeChild(cover); 

                });
                    } else {
                        var cover = new coverImage();
                            cover.opacity = 0.98;
                            scene.addChild(cover);
                    var text = new Label('やばい種を手に入れた');       // 残り時間: ○○と表示するラベルを作る
                    text.font = '40px sans-serif';                 // 14pxのゴシック体にする
        		    text.x = 300;                                    // 横位置調整
                    text.y =270;                                   // 縦位置調整
                    scene.addChild(text);      
                    SEED_THR += 1;
                    PATA_POINT -= 100;
                    myPoint.text = '所持ポイント：' + PATA_POINT;
                    
                    cover.addEventListener(Event.TOUCH_START, function(e){
                   scene.removeChild(text);
                   scene.removeChild(cover); 

                });
                    }
                
                    
                    
                });
                
            
					return scene;
				}







        //パタパタ一覧
        var PataCollectionScene = function() {

        var scene = new Scene();
       

        var backwindow = new backGroundImage(0, 0, 2); //クラスの呼び出し
                    scene.addChild(backwindow);

        //ポイント表示の背景画像
             var pointBackImage = new Sprite(350, 60);                   // スプライトを作る
            pointBackImage.image = game.assets['./img/pointBackImage.gif'];     // スタート画像を設定
            pointBackImage.x =40;                                      // 横位置調整
            pointBackImage.y = 30;                                     // 縦位置調整
            scene.addChild(pointBackImage);                             // シーンに追加


             //ポイント表示
                var point = new POINT();
                scene.addChild(point);
            //トップに戻るボタン
                var backButton = new topButton(600, 40);
                    scene.addChild(backButton);
  

							//矢印ボタン 右
        	 var arrowImageR = new Sprite(100, 150);                   // スプライトを作る
            arrowImageR.image = game.assets['./img/arrow.png'];     // スタート画像を設定
            arrowImageR.x =430;                                      // 横位置調整
            arrowImageR.y = 900;                                     // 縦位置調整
            arrowImageR.frame = 1;
         		arrowImageR.scale(-1,1);
            scene.addChild(arrowImageR);                             // シーンに追加
            
            arrowImageR.addEventListener(Event.TOUCH_START, function(e) {
            game.replaceScene(PataCollectionSecondScene());    // 現在表示しているシーンをゲームシーンに置き換える
        });
            
            
            //矢印ボタン 左
        	 var arrowImageL = new Sprite(100, 150);                   // スプライトを作る
            arrowImageL.image = game.assets['./img/arrow.png'];     // スタート画像を設定
            arrowImageL.x =250;                                      // 横位置調整
            arrowImageL.y = 900;                                     // 縦位置調整
            arrowImageL.frame = 0;
            arrowImageL.scale(-1,1);
            scene.addChild(arrowImageL);                             // シーンに追加




  //メニューボタン呼び出し処理
					var menu1 = new menuButton(9,1100,1);
							scene.addChild(menu1);
					var menu2 = new menuButton(167,1100,2);
							scene.addChild(menu2);
					var menu3 = new menuButton(325,1100,3);
							scene.addChild(menu3);
					var menu4 = new menuButton(483,1100,4);
							scene.addChild(menu4);
					var menu5 = new menuButton(641,1100,5);
							scene.addChild(menu5);	
				//メニュー呼び出しここまで


        

        pata_1 = [-50, 200, 450, -50, 200, 450, -50, 200, 450]; 
        pata_2 = [100, 100, 100, 350, 350, 350, 600, 600, 600];
        Collectionx = [50, 300, 550, 50, 300, 550, 50, 300, 550];
        Collectiony = [200, 200, 200, 450, 450, 450, 700, 700, 700];
        
        

            for (var i = 0; i < 9; i++) {
                if (PATAn[i] == 1){
            	var collectionP = new getPataPata(pata_1[i],pata_2[i],i);
            		collectionP.scale(0.5, 0.5);
        			 scene.addChild(collectionP);
                     
              
        		} else {
        		var Collection = new Sprite(200,200);
        		Collection.image = game.assets['./img/q.png'];
        		Collection.x = Collectionx[i];
        		Collection.y = Collectiony[i];
        		 scene.addChild(Collection);
        		}
                
        }
        
        
        

        return scene;


        }




   //パタパタ一覧 2ページ目
        var PataCollectionSecondScene = function() {

        var scene = new Scene();
       

        var backwindow = new backGroundImage(0, 0, 2); //クラスの呼び出し
                    scene.addChild(backwindow);


        //ポイント表示の背景画像
             var pointBackImage = new Sprite(350, 60);                   // スプライトを作る
            pointBackImage.image = game.assets['./img/pointBackImage.gif'];     // スタート画像を設定
            pointBackImage.x =40;                                      // 横位置調整
            pointBackImage.y = 30;                                     // 縦位置調整
            scene.addChild(pointBackImage);                             // シーンに追加


            //ポイント表示
                var point = new POINT();
                scene.addChild(point);

            //トップに戻るボタン
                var backButton = new topButton(600, 40);
                    scene.addChild(backButton);
  

							//矢印ボタン 右
        	 var arrowImageR = new Sprite(100, 150);                   // スプライトを作る
            arrowImageR.image = game.assets['./img/arrow.png'];     // スタート画像を設定
            arrowImageR.x =430;                                      // 横位置調整
            arrowImageR.y = 900;                                     // 縦位置調整
            arrowImageR.frame = 0;
            scene.addChild(arrowImageR);                             // シーンに追加
            
            //矢印ボタン 左
        	 var arrowImageL = new Sprite(100, 150);                   // スプライトを作る
            arrowImageL.image = game.assets['./img/arrow.png'];     // スタート画像を設定
            arrowImageL.x =250;                                      // 横位置調整
            arrowImageL.y = 900;                                     // 縦位置調整
            arrowImageL.frame = 1;
            scene.addChild(arrowImageL);                             // シーンに追加

						arrowImageL.addEventListener(Event.TOUCH_START, function(e) {
            game.replaceScene(PataCollectionScene());    // 現在表示しているシーンをゲームシーンに置き換える
        });



  //メニューボタン呼び出し処理
					var menu1 = new menuButton(9,1100,1);
							scene.addChild(menu1);
					var menu2 = new menuButton(167,1100,2);
							scene.addChild(menu2);
					var menu3 = new menuButton(325,1100,3);
							scene.addChild(menu3);
					var menu4 = new menuButton(483,1100,4);
							scene.addChild(menu4);
					var menu5 = new menuButton(641,1100,5);
							scene.addChild(menu5);	
				//メニュー呼び出しここまで



		pata_1 = [-50, 200, 450, -50, 200, 450, -50]; 
        pata_2 = [100, 100, 100, 350, 350, 350, 600];
        Collectionx = [50, 300, 550, 50, 300, 550, 50];
        Collectiony = [200, 200, 200, 450, 450, 450, 700];
        
        

            for (var i = 0; i < 7; i++) {
                if (PATAn[i+9] == 1){
                var collectionP = new getPataPata(pata_1[i],pata_2[i],i+9);
            		collectionP.scale(0.5, 0.5);
        			scene.addChild(collectionP);
              
        		} else {
        		var Collection = new Sprite(200,200);
        		Collection.image = game.assets['./img/q.png'];
        		Collection.x = Collectionx[i];
        		Collection.y = Collectiony[i];
        		scene.addChild(Collection);
        		}
}
        return scene;
        }








			//私が助けを求めるページ
			
			var helpScene = function() {
			
				var scene = new Scene();
				
				//背景画像
  				var backwindow = new Sprite(wX, wY);                   // スプライトを作る
            backwindow.image = game.assets['./img/backwindow.jpg'];     // スタート画像を設定
            backwindow.x =0;                                      // 横位置調整
            backwindow.y =0;                                     // 縦位置調整
            scene.addChild(backwindow);            
				
			var helpLabel = new Label('【ヘルプ】');
            helpLabel.color = '#000000';                   // 文字を白色に
            helpLabel.font = '50px sans-serif';            //  30pxのゴシック体にする
            helpLabel.textAlign = 'left';                // 左揃えにする

            helpLabel.x = 20;                               // 横位置調整
            helpLabel.y = 25;                             // 縦位置調整
            scene.addChild(helpLabel);                     // シーンに追加
			
			
			//メニューボタン呼び出し処理
					var menu1 = new menuButton(9,1100,1);
							scene.addChild(menu1);
					var menu2 = new menuButton(167,1100,2);
							scene.addChild(menu2);
					var menu3 = new menuButton(325,1100,3);
							scene.addChild(menu3);
					var menu4 = new menuButton(483,1100,4);
							scene.addChild(menu4);
					var menu5 = new menuButton(641,1100,5);
							scene.addChild(menu5);	
				//メニュー呼び出しここまで
			
			return scene;
			}
			
			

				//クリア画面	
        var clearScene = function() {
        
            var scene = new Scene(wX,wY);                                   // 新しいシーンを作る
            scene.backgroundColor = 'pink';                         // シーンの背景色を設定
          if(PLAY_COUNT > 0){ PLAY_COUNT --;}
          bgm.stop();
           
           
             
             
        //獲得ポイントにも応じてキャラの出現率を変えようかと思います
        
        
        
        if(WANTED_POINT < 10){
             getPataCount = rand(10);
                switch(getPataCount){
                     case 0: 
                	PATAn[0] = 1;
            		var getP = new getPataPata(300,700,0);
        				scene.addChild(getP);
            		break;
            		
            case 1:
            		PATAn[1] = 1;
            		var getP = new getPataPata(300,700,1);
        				scene.addChild(getP);
            		break;
                }
            
        }else if (WANTED_POINT >= 10 && WANTED_POINT <= 20 ){
             getPataCount = rand(12);
              switch(getPataCount){
            case 0: 
                	PATAn[0] = 1;
            		var getP = new getPataPata(300,700,0);
        				scene.addChild(getP);
            		break;
            		
            case 1:
            		PATAn[1] = 1;
            		var getP = new getPataPata(300,700,1);
        				scene.addChild(getP);
            		break;
             case 2:
            		PATAn[2] = 1;
            		var getP = new getPataPata(300,700,2);
        				scene.addChild(getP);
            		break;
            case 3:
            		PATAn[3] = 1;
            		var getP = new getPataPata(300,700,3);
        				scene.addChild(getP);
            		break;
            case 4:
            		PATAn[4] = 1;
            		var getP = new getPataPata(300,700,4);
        				scene.addChild(getP);
            		break;
             case 5:
            		PATAn[5] = 1;
            		var getP = new getPataPata(300,700,5);
        				scene.addChild(getP);
            		break;
            case 12:
                	PATAn[12] = 1;
            		var getP = new getPataPata(300,700,12);
        				scene.addChild(getP);
            		break;
                  
              }
        } else if (20 < WANTED_POINT && WANTED_POINT < 40){
            getPataCount = rand(10);
              switch(getPataCount){
            case 6:
                	PATAn[6] = 1;
            		var getP = new getPataPata(300,700,6);
        				scene.addChild(getP);
            		break;
            case 7:
            		PATAn[7] = 1;
            		var getP = new getPataPata(300,700,7);
        				scene.addChild(getP);
            		break;
             case 8:
            		PATAn[8] = 1;
            		var getP = new getPataPata(300,700,8);
        				scene.addChild(getP);
            		break;
            case 9:
            		PATAn[9] = 1;
            		var getP = new getPataPata(300,700,9);
        				scene.addChild(getP);
            		break;
            case 10:
            		PATAn[10] = 1;
            		var getP = new getPataPata(300,700,10);
        				scene.addChild(getP);
            		break;
             case 11:
            		PATAn[11] = 1;
            		var getP = new getPataPata(300,700, 11);
        				scene.addChild(getP);
            		break;
              }
            
            
        } else if (WANTED_POINT >= 40){
             getPataCount = rand(5);
            switch(getPataCount){
                case 0:
                	PATAn[13] = 1;
            		var getP = new getPataPata(300,700,13);
        				scene.addChild(getP);
            		break;
             case 1:
            		PATAn[14] = 1;
            		var getP = new getPataPata(300,700,14);
        				scene.addChild(getP);
            		break;
            case 2:
            		PATAn[15] = 1;
            		var getP = new getPataPata(300,700,15);
        				scene.addChild(getP);
            		break;
            
        }
        }
        PATA_POINT += WANTED_POINT;
             
            var wantedPoint = new Label(WANTED_POINT + 'ポイント獲得');
            wantedPoint.color = '#000000';                   // 文字を白色に
            wantedPoint.font = '40px sans-serif';            //  30pxのゴシック体にする
            wantedPoint.textAlign = 'left';                // 左揃えにする

            wantedPoint.x = 250;                               // 横位置調整
            wantedPoint.y = 400;                             // 縦位置調整
            scene.addChild(wantedPoint);                     // シーンに追加
            
           
             
            
               
             
                
            


          
            // クリア画像設定
            var clearImage = new Sprite(214, 78);                   // スプライトを作る
            clearImage.image = game.assets['./img/clear.png'];  // ゲームオーバー画像を設定
            clearImage.x = 300;                                      // 横位置調整
            clearImage.y = 200;
            clearImage.scale(2,2);                                     // 縦位置調整
            scene.addChild(clearImage);                             // シーンに追加
            
          
           
            // リトライラベル(ボタン)設定
            var retryLabel = new Label('もう一度遊ぶ');                  // ラベルを作る
            retryLabel.color = '#fff';                                 // 文字を白色に
            retryLabel.x = 250;                                          // 横位置調整
            retryLabel.y = 500;                                        // 縦位置調整
            retryLabel.font = '40px sans-serif';                       // 20pxのゴシック体にする
            scene.addChild(retryLabel);                                // シーンに追加
            
            // リトライラベルにタッチイベントを設定
            retryLabel.addEventListener(Event.TOUCH_START, function(e) {
                game.replaceScene(GameSelectScene());    // 現在表示しているシーンをタイトルシーンに置き換える
            });
            return scene;
        };
        game.replaceScene(createStartScene());  // ゲームの_rootSceneをスタートシーンに置き換える
    }

    game.start(); // ゲームをスタートさせます
  
};


//ランダム関数
function rand(n){
  return Math.floor(Math.random() * (n+1));
}

