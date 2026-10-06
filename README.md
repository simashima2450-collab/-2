# 更新版HTMLの配置

index.html が表紙です。一般型、文章型、価格表示型の３物件をランダムな順序で各１回見たあと、survey.html に進みます。「次へ」で進めます。順序はURLで保持するため、途中で再読み込みしても変わりません。表紙から再開始した場合は新しく順序を選びます。

写真・スタイル・ページの移動処理をHTML内に埋め込みました。次の５つを同じ階層でGitHub Pagesの公開元へアップロードしてください。

- index.html
- general.html
- narrative.html
- price.html
- survey.html

別の画像フォルダー、CSS、JavaScriptファイルのアップロードは不要です。

## Googleフォーム

Googleフォームは作成済みです。survey.html の「アンケートへ」に回答用URLを設定しました。今回の更新では、公開元の survey.html を同名ファイルで上書きしてください。その他のHTMLは変更していません。

- 回答用URL：https://docs.google.com/forms/d/e/1FAIpQLSf43rA2d6mcF_ZeTh82Hp0TnoMcRNPMNwv_TPi7VMHCKZTKew/viewform?usp=publish-editor
- 文章ありへ戻るURL：https://simashima2450-collab.github.io/-2/narrative.html
- 文章なしへ戻るURL：https://simashima2450-collab.github.io/-2/general.html

Googleフォーム側の戻りリンクも設定済みです。google-form-setup.gs は新規作成用の補助スクリプトで、今回は実行不要です。

フォームは文章ありと文章なしを別セクションにし、各概要と元ページへのリンク、空間の想像と月額賃料の記述式質問を置きます。仮の質問順は、空間の想像→賃料です。セクション順や質問もフォーム編集画面から変更できます。survey-draft.html は設問確認用です。入力を送信・保存しません。

物件・内装・賃料・徒歩分数は架空であり、実在する町域と駅を組み合わせています。生成画像を使用しています。一般型はSUUMOの項目構成、文章型は東京R不動産の紹介形式を参考にしています。
