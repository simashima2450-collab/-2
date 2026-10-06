/** ご自身のGoogleアカウントのApps Scriptで実行してください。 */
const SITE_BASE_URL = ''; // 公開済みGitHub PagesのURL。末尾の / は任意。

function createDraftSurvey() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty('SURVEY_FORM_ID');
  if (existingId) {
    const existing = FormApp.openById(existingId);
    console.log('既存フォームの編集URL: ' + existing.getEditUrl());
    console.log('回答用URL: ' + existing.getPublishedUrl());
    return; // 再実行で重複作成しません。
  }
  const base = validatedBase_();
  const form = FormApp.create('物件ページから想像する空間についてのアンケート', false);
  props.setProperty('SURVEY_FORM_ID', form.getId());
  form.setDescription('閲覧した二つの物件について、想像した空間と妥当だと思う購入価格をお聞かせください。各ページのリンクから物件情報を見直せます。記載されている物件は研究用の架空物件です。');
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setShuffleQuestions(false);
  form.setConfirmationMessage('ご回答いただき、ありがとうございました。');
  form.addPageBreakItem().setTitle('文章ありの物件について')
    .setHelpText(narrativeDescription_(base));
  addQuestions_(form);
  form.addPageBreakItem().setTitle('文章なしの物件について')
    .setHelpText(generalDescription_(base));
  addQuestions_(form);
  console.log('編集URL: ' + form.getEditUrl());
  console.log('回答用URL: ' + form.getPublishedUrl());
  console.log('未公開の下書きです。内容とリンクを確認し、Googleフォームの編集画面から公開してください。');
}

function addQuestions_(form) {
  form.addParagraphTextItem()
    .setTitle('この物件を見て、どのような空間を想像しましたか。')
    .setHelpText('思い浮かんだことを、ご自身の言葉で自由にお書きください。')
    .setRequired(true);
  form.addTextItem()
    .setTitle('この物件の購入価格として、いくらが妥当だと思いますか。')
    .setHelpText('物件本体の価格について、万円の単位を付けてお書きください。購入時の諸費用は含めないでください。')
    .setRequired(true);
}

function updatePropertyLinks() {
  const id = PropertiesService.getScriptProperties().getProperty('SURVEY_FORM_ID');
  if (!id) throw new Error('先にcreateDraftSurveyを実行してください。');
  const base = validatedBase_();
  const form = FormApp.openById(id);
  form.getItems(FormApp.ItemType.PAGE_BREAK).forEach(item => {
    const page = item.asPageBreakItem();
    if (page.getTitle() === '文章ありの物件について') page.setHelpText(narrativeDescription_(base));
    if (page.getTitle() === '文章なしの物件について') page.setHelpText(generalDescription_(base));
  });
  console.log('リンクを更新しました。編集URL: ' + form.getEditUrl());
}

function validatedBase_() {
  const value = SITE_BASE_URL.trim();
  if (!/^https:\/\/[a-z0-9.-]+(?:\/[^\s?#]*)?$/i.test(value)) {
    throw new Error('SITE_BASE_URLに公開済みサイトのHTTPS URLを入力してください。');
  }
  return value.replace(/\/+$/, '');
}
function narrativeDescription_(base) {
  return '物件名：窓辺に残る時間\n東京都江東区清澄2丁目／清澄白河駅 徒歩8分\n1LDK・45.4㎡・1983年築・3階／4階建\n物件ページを見直す：\n' + base + '/narrative.html';
}
function generalDescription_(base) {
  return '物件名：土橋の明るい1LDK\n神奈川県川崎市宮前区土橋2丁目／鷺沼駅 徒歩10分\n1LDK・43.2㎡・2016年築・3階／5階建\n物件ページを見直す：\n' + base + '/general.html';
}
