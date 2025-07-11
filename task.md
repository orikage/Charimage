# Charimage 実装タスクリスト

## フェーズ1: プロジェクトセットアップと基本構造

- [ ] 1. Vite + Reactプロジェクトのセットアップ (`my-coc7-charsheet-app`)
- [ ] 2. `html2canvas` ライブラリのインストール
- [ ] 3. 設計書に基づいたディレクトリ構造の作成 (`src/components`, `src/hooks`, `src/utils`など)
- [ ] 4. 各コンポーネントとモジュールの空ファイルを作成

## フェーズ2: ユーティリティ層の実装

- [ ] 1. **`utils/dataParser.js`**:
    - [ ] 1.1. 基本的なキャラクター情報（名前、PL名）を解析する関数を実装
    - [ ] 1.2. 能力値（STR, CONなど）を解析するロジックを追加
    - [ ] 1.3. 技能値を解析するロジックを追加
    - [ ] 1.4. 武器、所持品、背景などの詳細情報を解析するロジックを追加
    - [ ] 1.5. 解析失敗時のエラーハンドリングを実装
- [ ] 2. **`utils/imageDownloader.js`**:
    - [ ] 2.1. データURLとファイル名を受け取り、画像をダウンロードさせる関数を実装

## フェーズ3: サービス層の実装

- [ ] 1. **`hooks/useCharacterSheetGenerator.js`**:
    - [ ] 1.1. 必要な状態（`rawText`, `parsedData`, `imageUrl`, `isLoading`, `error`）を`useState`で定義
    - [ ] 1.2. `dataParser`を呼び出してテキストを解析し、`parsedData`を更新する関数を実装
    - [ ] 1.3. `html2canvas`を呼び出して画像を生成し、`imageUrl`を更新する関数を実装
    - [ ] 1.4. ローディング状態とエラー状態を管理するロジックを実装
    - [ ] 1.5. UI層に渡すためのハンドラや状態をまとめた値を返す

## フェーズ4: UI層の実装

- [ ] 1. **`components/common`**:
    - [ ] 1.1. `LoadingSpinner.jsx` コンポーネントを作成
    - [ ] 1.2. `ErrorMessage.jsx` コンポーネントを作成
- [ ] 2. **`components/InputArea.jsx`**:
    - [ ] 2.1. テキスト入力用の`<textarea>`を配置
    - [ ] 2.2. 画像生成用の`<button>`を配置
    - [ ] 2.3. 親から渡されたイベントハンドラを各要素に接続
- [ ] 3. **`components/sections`**:
    - [ ] 3.1. `CharacterInfoSection.jsx` を作成し、基本情報を表示
    - [ ] 3.2. `AttributesSection.jsx` を作成し、能力値を表示
    - [ ] 3.3. `SkillsSection.jsx` を作成し、技能値を表示
    - [ ] 3.4. `EquipmentSection.jsx` を作成し、所持品などを表示
- [ ] 4. **`components/CharacterSheetDisplay.jsx`**:
    - [ ] 4.1. `parsedData`をpropsで受け取る
    - [ ] 4.2. 各`sections`コンポーネントを配置し、データを渡す
    - [ ] 4.3. 画像化するためのIDまたはrefを設定
    - [ ] 4.4. 基本的なCSSを適用してレイアウトを整える
- [ ] 5. **`components/PreviewAndDownloadArea.jsx`**:
    - [ ] 5.1. `imageUrl`をpropsで受け取り、`<img>`でプレビュー表示
    - [ ] 5.2. ダウンロードボタンを配置し、`imageDownloader`を呼び出す処理を接続
- [ ] 6. **`App.jsx`**:
    - [ ] 6.1. `useCharacterSheetGenerator`フックを呼び出す
    - [ ] 6.2. 各UIコンポーネント (`InputArea`, `CharacterSheetDisplay`, `PreviewAndDownloadArea`など) を配置
    - [ ] 6.3. フックから得た状態とハンドラを各コンポーネントにpropsとして渡す
    - [ ] 6.4. 全体のレイアウトCSSを適用

## フェーズ5: 結合とテスト

- [ ] 1. 全てのコンポーネントとロジックを結合し、アプリケーションとして動作させる
- [ ] 2. 実際のキャラクターシートテキストを入力し、画像生成が正しく行われるかテスト
- [ ] 3. エラーハンドリング（不正なテキスト入力時など）が機能するかテスト
- [ ] 4. 生成された画像のレイアウト崩れがないか確認し、CSSを微調整
- [ ] 5. 主要なブラウザ（Chrome, Firefox）での動作確認
