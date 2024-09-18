# Tiptap のサンプルエディタ

## 目標機能

#### ノード

- [x] 見出し(1~3, Style, Placeholder, SelectMenu, Block DnD)
  - ProseMirror の仕様上、ブロックノードに Drop などの挙動変更はハックが求められそう
- [x] 画像（Menu, Style, File Dnd, Block DnD）
- [x] 引用 (Menu, Style, Block DnD)
- [x] 箇条書きリスト (Menu, Block DnD)
- [x] 順序リスト (Menu, Block DnD)
- [x] 区切り線
- [x] Youtube 埋め込み
- [x] X 埋め込み
- [x] 絵文字
- [ ] テーブル
- [ ] コードブロック

#### マーク

- [x] 太字
- [x] イタリック
- [x] コード
- [x] 下線
- [x] 打ち消し線
- [x] 蛍光ペン
- [x] リンク
- [x] パレット

#### 機能

- [x] プレースホルダー
- [x] Undo / Redo
- [x] 提案メニュー
- [ ] バブルメニュー
- [ ] 固定メニュー

#### カスタム

- [x] 最終行を常に paragraph にする
- [x] Heading の戦闘でバックスペースを押すと、paragraph に変換
- [x] 全ての Node に動的なユニーク ID を付与
- [x] ブロックの DragHandle を実装する
