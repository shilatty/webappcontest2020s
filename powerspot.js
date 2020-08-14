'use strict';
// HTMLのエレメントを取得
const userNameInput = document.getElementById('user-name');		// 名前を入力するテキストボックス
const seekButton = document.getElementById('seek-button');		// 診断ボタン
const resultDivided = document.getElementById('result-area');	// 結果表示エリアdiv
const mapDivided = document.getElementById('map-area');			// map表示エリアdiv
const coordinateDivided = document.getElementById('lat-long');			// map表示エリアdiv
// 変数の宣言と初期化
var userName = null;	// 診断する名前
var sumOfCharCode = 0;	// userNameの文字コードから生成した数字
var latitude = 0;		// 緯度
var longitude = 0;		// 経度
var latIntegral = 0;	// 緯度の整数部
var latFractional = 0;	// 緯度の小数部
var longIntegral = 0;	// 経度の整数部
var longFractional = 0;	// 経度の小数部


/**
 * 指定した要素の個要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	};
};

// ボタンを押した時の処理を書く
seekButton.onclick = () => {
	userName = userNameInput.value;
	if (userName.length === 0) {
		return;	// userNameが空のときは終了する
	}
	console.log(userName);
	latitude = 0;
	longitude = 0;
	seekSpot(userName);
	console.log('latitude: ' + latitude);
	console.log('longitude: ' + longitude);


	// 診断結果表示エリアを初期化
	removeAllChildren(resultDivided);

	// 診断結果表示エリアの作成
	const header = document.createElement('h3');
	header.innerText = userName + 'さんのパワースポットはこの辺りです。';
	resultDivided.appendChild(header);

	const paragraph = document.createElement('p');

	paragraph.innerText = '何もなさそう？ 「ー」ボタンでズームアウトしてみよう';
	resultDivided.appendChild(paragraph);

	// mapエリアの初期化
	removeAllChildren(mapDivided);

	// map埋め込み用のiframeタグの作成
	const mapFrame = document.createElement('iframe');	// iframeタグを作る

	// iframeの属性値を代入
	let srcValue =
		'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d14392.693440469557!2d'
		+ longitude + '!3d' + latitude
		+ '!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sja!2sjp!4v1596033220929!5m2!1sja!2sjp';

	let widthValue = 480;
	let heightValue = 360;
	let frameborderValue = 0;
	let styleValue = 'border:0;';
	let allowfullscreenValue = '';
	let ariahiddenValue = 'false';
	let tabindexValue = 0;

	// 属性に値をセット
	mapFrame.setAttribute('src', srcValue);
	mapFrame.setAttribute('width', widthValue);
	mapFrame.setAttribute('height', heightValue);
	mapFrame.setAttribute('frameborder', frameborderValue);
	mapFrame.setAttribute('style', styleValue);
	mapFrame.setAttribute('allowfullscreen', allowfullscreenValue);
	mapFrame.setAttribute('aria-hidden', ariahiddenValue);
	mapFrame.setAttribute('tabindex', tabindexValue);

	// map-areaのdivに入れる
	mapDivided.appendChild(mapFrame);

	// 座標表示エリアを初期化
	removeAllChildren(coordinateDivided);
	// 座標表示エリアの作成
	const coordinateP = document.createElement('p');
	paragraph.innerText = '緯度：' + latitude.toFixed(5) + ' 経度：' + longitude.toFixed(5);
	coordinateDivided.appendChild(paragraph);

};

// エンターキーでもOKにする
// macの日本語変換確定のエンターキーは無視する
userNameInput.onkeydown = event => {
	if (event.key === 'Enter') {
		if (!event.isComposing) {
			seekButton.onclick();
		};
	};
};

/**
 * 名前の文字列を渡すと座標を返す関数
 * @param {string} userName ユーザーの名前
 * @return {num} 診断結果
 */
function seekSpot(userName) {
	// 全文字のコード番号を取得してそれを足し合わせる
	for (let i = 0; i < userName.length; i++) {
		sumOfCharCode = sumOfCharCode + userName.charCodeAt(i) * 10 ** i + 1;	// userName === abc の時と、userName === bca の時を変える処理
	};

	//座標（緯度 -85 〜 85）
	latIntegral = sumOfCharCode % 170 - 85;	// 整数部を作る。GoogleMapの表示範囲に収めるため -85 〜 85
	latFractional = parseFloat("0."+(String(sumOfCharCode / 180)).split(".")[1]);	// 小数部を作る。なんとなく180で割り算して数字を長くする
	latitude = latIntegral + latFractional;	// 整数部と小数部の合体
	//座標（経度 −180 〜 180）
	longIntegral = sumOfCharCode % 360 - 180;
	longFractional = parseFloat("0."+(String(sumOfCharCode / 360)).split(".")[1]);	// 小数部を作る。なんとなく180で割り算して数字を長くする
	longitude = longIntegral + longFractional; // 小数部を作る。なんとなく360で割り算して数字を長くする
	sumOfCharCode = 0; // sumOfCharCodeのリセット
	return;
};
