'use strict';
const userNameInput = document.getElementById('user-name');
const seekButton = document.getElementById('seek-button');
var userName = null;
var sumOfCharCode = 0;
var latitude = 0;
var longitude = 0;
var latIntegral = 0;
var latFractional = 0;
var longIntegral = 0;
var longFractional = 0;
const resultDivided = document.getElementById('result-area');
const mapDivided = document.getElementById('map-area');


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
		return; // userNameが空のときは終了する
	}
	console.log(userName);
	latitude = 0;
	longitude = 0;
	seekSpot(userName);
	console.log('latitude: ' + latitude);
	console.log('longitude: ' + longitude);

	
	// TODO 診断結果表示エリアを初期化
	removeAllChildren(resultDivided);
	
	// TODO 診断結果表示エリアの作成
	const header = document.createElement('h3');
	header.innerText = userName + 'さんのパワースポットはこの辺りです。';
	resultDivided.appendChild(header);
	
	const paragraph = document.createElement('p');

	paragraph.innerText = '何もなさそう？ ー ボタンでズームアウトしてみよう';
	resultDivided.appendChild(paragraph);
	
	// mapエリアの初期化
	removeAllChildren(mapDivided);
	// mapの作成
	// https://www.google.com/maps/@35.599155,139.578573,15z?hl=ja
	// <iframe src="https://www.google.com/maps/embed?
	// pb=!1m10!1m8!1m3!1d14392.693440469557!2d139.578573!3d25.599155!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sja!2sjp!4v1596032442401!5m2!1sja!2sjp" 
	// width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
	const mapFrame = document.createElement('iframe');
	const srcValue =
	'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d14392.693440469557!2d' 
	+ longitude + '!3d' + latitude 
	+ '!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sja!2sjp!4v1596033220929!5m2!1sja!2sjp';
	const widthValue = 600;
	const heightValue = 450;
	const frameborderValue = 0;
	const styleValue = 'border:0;';
	const allowfullscreenValue = '';
	const ariahiddenValue = 'false';
	const tabindexValue = 0;
	
	mapFrame.setAttribute('src', srcValue);
	mapFrame.setAttribute('width', widthValue);
	mapFrame.setAttribute('height', heightValue);
	mapFrame.setAttribute('frameborder', frameborderValue);
	mapFrame.setAttribute('style', styleValue);
	mapFrame.setAttribute('allowfullscreen', allowfullscreenValue);
	mapFrame.setAttribute('aria-hidden', ariahiddenValue);
	mapFrame.setAttribute('tabindex', tabindexValue);
	
	
	mapDivided.appendChild(mapFrame);

	
};

// エンターキーでも。
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
 * @return {string} 診断結果
 */
function seekSpot(userName) {
	//全文字のコード番号を取得してそれを足し合わせる
	for (let i = 0; i < userName.length; i++) {
		sumOfCharCode = sumOfCharCode + userName.charCodeAt(i) + 1;
	};

	//座標（緯度 -85 〜 85）
	latIntegral = sumOfCharCode % 170 - 85;
	latFractional = parseFloat("0."+(String(sumOfCharCode / 180)).split(".")[1]);;
	latitude = latIntegral + latFractional;
	//座標（経度 −180〜 180）
	longIntegral = sumOfCharCode % 360 - 180;
	longFractional = parseFloat("0."+(String(sumOfCharCode / 360)).split(".")[1]);;
	longitude = longIntegral + longFractional;
	sumOfCharCode = 0;
	return;
};
