このチュートリアルは AngularJS を使って帳票アプリをつくる過程を {[ group.articles.length - 1 ]} のステップにわけ、段階的に AngularJS の使い方を学習します。

## アプリケーションの概要
作成する帳票アプリの概要は以下のとおりです。

### 扱うデータ
* **注文明細行** - 任意の商品名、単価、注文個数を持つデータ
* **帳票** - 通し番号、作成日時、注文明細行のコレクションを持つデータ
* **帳票リスト** - 複数の帳票をもつコレクション

### アプリが行うこと
* 帳票リスト内の帳票を一覧表示する
* 任意の注文明細行を持った新しい帳票を作成し帳票リストに加える
* 作成済みの帳票の詳細を表示する

### アプリが行わないこと
* 帳票の編集
* データの永続化

### 必要なビュー
* **帳票一覧ビュー** - 帳票リストを表示するビュー
* **帳票作成ビュー** - 新しい帳票を作成するビュー
* **帳票詳細ビュー** - 作成済みの帳票を表示するビュー

<a href="./account/step09/index.html" class="btn btn-primary">完成予定のアプリのイメージ</a>
