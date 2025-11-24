# MICH-project

## 開発環境構築

### 1. Node.js の確認
Node.js がインストールされていることを確認してください。（.node-versionや.nvmrcに指定されているバージョンを推奨）

```bash
node -v
```
###  2. pnpm の準備 (Corepack)
Corepack を有効化し、プロジェクトで指定されたバージョンの pnpm をセットアップします。

```bash
corepack enable
```

### 3. 依存関係のインストール

必要なライブラリをインストールします。

```bash
pnpm install
```

### 4. 開発サーバーの起動

以下のコマンドでローカルサーバーを立ち上げます。

```bash
pnpm dev
```

起動後、ターミナルに表示される URL（例: `http://localhost:5173`）にアクセスしてください。
