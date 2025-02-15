# NFTマーケットプレイス開発ログ

## プロジェクト概要
- プロジェクト名: NFT Marketplace（デモ版）
- 開発環境: React + TypeScript + Vite

## 技術スタック
### フロントエンド
- React 18
- TypeScript
- Vite
- Material-UI (MUI)
- React Router DOM

### 実装済みコンポーネント
#### 1. ベース構造
- `App.tsx`: アプリケーションのルート
  - ThemeProviderによるテーマ管理
  - WalletProviderによるウォレット状態管理
  - ルーティング設定

#### 2. コアコンポーネント
##### Header (`components/Header.tsx`)
- アプリケーションヘッダー
- ナビゲーションメニュー
- ウォレット接続状態の表示
- 実装機能:
  - ロゴ（ホームへのリンク）
  - 探索ページへのリンク
  - 作成ページへのリンク
  - ウォレット接続/切断機能

##### NFTカード (`components/NFTCard.tsx`)
- 個別NFTの表示コンポーネント
- 実装機能:
  - 画像表示
  - タイトル表示
  - 説明文表示
  - 価格表示
  - ホバーエフェクト
  - 詳細ページへのリンク

##### NFTリスト (`components/NFTList.tsx`)
- NFTのグリッド表示
- レスポンシブデザイン対応
- 実装機能:
  - グリッドレイアウト
  - レスポンシブ対応（xs: 1列, sm: 2列, md: 3列, lg: 4列）

##### 探索ページ (`components/ExplorePage.tsx`)
- NFT一覧表示ページ
- 実装機能:
  - 検索バー
  - NFTリスト表示
  - サンプルデータの表示

##### 作成ページ (`components/CreatePage.tsx`)
- NFT作成フォーム
- 実装機能:
  - タイトル入力
  - 説明文入力
  - 価格入力
  - 画像アップロード
  - プレビュー表示

#### 3. コンテキスト
##### ウォレットコンテキスト (`contexts/WalletContext.tsx`)
- ウォレット状態管理
- 実装機能:
  - 接続状態管理
  - アドレス管理
  - 接続/切断機能
  - デモ用の簡易実装

## データ構造
### NFT型定義 (`types/nft.ts`)
```typescript
interface NFT {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  creator: string;
  owner: string;
  createdAt: Date;
}
```

## 実装済み機能の詳細

### 1. NFTマーケットプレイスの基本機能
#### 探索ページ (`src/pages/ExplorePage.tsx`)
- NFT一覧表示
- 検索フィルター機能
  - キーワード検索
  - 価格範囲フィルター（0-10 ETH）
  - 並び替え機能（新着順、古い順、価格高低、人気順）
- レスポンシブデザイン
- いいね機能

#### NFT詳細ページ (`src/pages/NFTDetailPage.tsx`)
- NFT画像の大きな表示
- 詳細情報の表示
  - タイトル
  - 説明
  - 価格
  - クリエイター情報
  - 所有者情報
  - 作成日
- いいね機能
- アドレスのコピー機能
- 購入ボタン（デモ実装）

#### NFT作成ページ (`src/pages/CreatePage.tsx`)
- フォーム入力
  - タイトル
  - 説明
  - 価格
  - 画像アップロード
- プレビュー表示
- ウォレット接続チェック
- 作成時のローディング表示

### 2. ウォレット機能
#### ウォレットコンテキスト (`src/contexts/WalletContext.tsx`)
- 接続状態管理
- アドレス管理
- 残高表示
- デモ用の簡易実装

### 3. 通知システム
#### 通知コンテキスト (`src/contexts/NotificationContext.tsx`)
- 成功/エラー/警告/情報の4種類の通知
- 自動非表示
- カスタマイズ可能なメッセージ
- 右下表示のスナックバー

### 4. UI/UXの改善
#### テーマ設定 (`src/theme.ts`)
- ダークモード
- カスタムカラーパレット
- レスポンシブデザイン
- アニメーション効果

#### 検索フィルター (`src/components/SearchFilters.tsx`)
- 展開可能なフィルターパネル
- スライダーによる価格範囲選択
- ドロップダウンによる並び替え

## レイアウト調整の詳細記録（2024-02-XX）

### 1. 問題の特定と分析
#### 発生していた問題
- コンテンツが画面中央に適切に配置されない
- 一部のコンポーネントで余白が片側に偏る
- 背景のグラデーションが正しく表示されない

#### 問題の原因分析
1. レイアウトの構造的問題
   - `width: 100vw`などの適切な幅指定の欠如
   - flexboxの配置プロパティの不適切な使用
   - 背景設定の適用位置の問題

2. 検証したコード
   - `Layout.tsx`のルートコンポーネント
   - `ExplorePage.tsx`の構造
   - 各コンポーネントのスタイリング設定

### 2. 実装した解決策
#### レイアウトコンポーネントの改善
1. ビューポート幅の適切な制御
```typescript
sx={{
  width: '100vw',
  minHeight: '100vh',
  maxWidth: '100%',
  overflowX: 'hidden',
}}
```

2. Flexboxレイアウトの最適化
```typescript
sx={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
}}
```

3. 背景グラデーションの修正
```typescript
'&::before': {
  content: '""',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
  pointerEvents: 'none',
  zIndex: 0,
}
```

#### 実装の根拠
1. レイアウト構造
   - Material-UIのベストプラクティスに準拠
   - モダンなCSS設計パターンの採用
   - レスポンシブデザインの考慮

2. パフォーマンス考慮
   - 不要なラッパー要素の削除
   - CSSプロパティの最適化
   - z-indexの適切な管理

### 3. 改善結果
1. 視覚的な改善
   - コンテンツの完全な中央揃え
   - 一貫した余白の維持
   - 背景グラデーションの適切な表示

2. レスポンシブ対応
   - 異なる画面サイズでの一貫した表示
   - モバイルデバイスでの最適化
   - タブレット・デスクトップでの適切なスケーリング

### 4. 未解決の課題
- [ ] 特定のブラウザでのスクロールバーの処理
- [ ] 動的コンテンツ追加時のレイアウトシフト
- [ ] 極端な画面サイズでのレイアウト調整

### 5. 次のステップ
1. パフォーマンス最適化
   - レイアウトシフトの測定と改善
   - アニメーションの最適化
   - CSSの最適化

2. アクセシビリティ改善
   - スクリーンリーダー対応の強化
   - キーボードナビゲーションの改善
   - フォーカス管理の実装

### 参考資料・証跡
- Material-UI Layout Documentation
- React Dev Tools での検証結果
- ブラウザの開発者ツールでの検証結果
- コンポーネントのソースコード:
  - src/components/Layout.tsx
  - src/pages/ExplorePage.tsx

## 未実装機能・課題

### 1. スマートコントラクト連携
- [ ] NFT作成時のミント機能
- [ ] NFT購入機能
- [ ] トランザクション処理
- [ ] ガス代の計算と表示

### 2. ウォレット連携
- [ ] MetaMask実装
- [ ] マルチウォレット対応
- [ ] トランザクション署名
- [ ] エラーハンドリング

### 3. データ永続化
- [ ] いいね機能の永続化
- [ ] ユーザープロフィール
- [ ] 取引履歴
- [ ] アクティビティログ

### 4. セキュリティ
- [ ] スマートコントラクトの監査
- [ ] フロントエンドのセキュリティ対策
- [ ] APIエンドポイントの保護
- [ ] レート制限の実装

### 5. パフォーマンス最適化
- [ ] 画像の最適化
- [ ] コンポーネントの遅延ローディング
- [ ] キャッシュ戦略
- [ ] バンドルサイズの最適化

## 次のステップ
1. スマートコントラクトの実装
2. MetaMask連携の実装
3. バックエンドAPIの構築
4. テスト環境の整備

## 技術的な注意点
1. Web3.jsまたはethers.jsの導入が必要
2. IPFSまたはAWS S3での画像保存の検討
3. セキュリティ監査の実施
4. パフォーマンスモニタリングの導入

## 参考資料
- Material-UI公式ドキュメント
- OpenZeppelin Contracts
- MetaMask API Documentation
- IPFS Documentation

## 参考資料・証跡
- コミット履歴
- コンポーネント設計図
- Material-UIドキュメント
- React Routerドキュメント

## セキュリティ実装の詳細記録（2024-02-XX）

### 1. 実装したセキュリティ対策
#### XSS（クロスサイトスクリプティング）対策
1. DOMPurifyによる入力値のサニタイズ
```typescript
// src/utils/security.ts
export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'title', 'target']
  });
};
```

2. 文字列のエスケープ処理
```typescript
export const escapeString = (str: string): string => {
  return validator.escape(str);
};
```

#### 入力値のバリデーション
1. 厳密なバリデーションルール
```typescript
export const validateInput = {
  title: (title: string): boolean => {
    return validator.isLength(title, { min: 1, max: 100 }) && 
           validator.matches(title, /^[a-zA-Z0-9\s\-_\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf]+$/);
  },
  price: (price: number): boolean => {
    return validator.isFloat(price.toString(), { min: 0, max: 1000000 });
  },
  walletAddress: (address: string): boolean => {
    return validator.matches(address, /^0x[a-fA-F0-9]{40}$/);
  },
  url: (url: string): boolean => {
    return validator.isURL(url, {
      protocols: ['http', 'https'],
      require_protocol: true
    });
  }
};
```

#### CSRF（クロスサイトリクエストフォージェリ）対策
1. セキュアなトークン生成
```typescript
// src/utils/csrf.ts
export class CSRFProtection {
  private static tokenKey = 'csrf-token';

  static generateToken(): string {
    const token = crypto.getRandomValues(new Uint8Array(32))
      .reduce((acc, val) => acc + val.toString(16).padStart(2, '0'), '');
    localStorage.setItem(this.tokenKey, token);
    return token;
  }
}
```

#### APIセキュリティ
1. セキュアなAPIクライアント
```typescript
// src/utils/api.ts
export class SecureAPIClient {
  static async request<T>({ method, endpoint, data }: APIRequestConfig): Promise<T> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-CSRF-Token': CSRFProtection.getToken(),
      'X-Requested-With': 'XMLHttpRequest'
    });
    // ... 実装詳細
  }
}
```

#### フォームバリデーション
1. カスタムバリデーションフック
```typescript
// src/hooks/useInputValidation.ts
export const useInputValidation = (initialValues: FormValues, rules: ValidationRules) => {
  // ... 実装詳細
};
```

### 2. 実装の根拠
1. セキュリティライブラリの選定
   - DOMPurify: 信頼性の高いXSS対策ライブラリ
   - validator.js: 広く使用されている検証ライブラリ

2. 実装パターン
   - Material-UIのセキュリティベストプラクティス
   - React推奨のセキュリティパターン
   - Web3アプリケーションのセキュリティガイドライン

### 3. 未解決の課題
- [ ] HTTPSの強制（本番環境用）
- [ ] レート制限の実装
- [ ] より強力な認証システム
- [ ] セッション管理の強化
- [ ] サーバーサイドでのCSRFトークン管理
- [ ] セキュリティ監査の実施
- [ ] ペネトレーションテストの実施

### 4. 次のステップ
1. セキュリティ強化
   - HTTPSの設定
   - レート制限の実装
   - セッション管理の改善

2. 監視とテスト
   - セキュリティ監査の実施
   - 脆弱性スキャンの定期実行
   - セキュリティテストの自動化

### 参考資料・証跡
- DOMPurify Documentation
- validator.js Documentation
- OWASP Security Guidelines
- React Security Best Practices
- Material-UI Security Documentation

実装ファイル：
- src/utils/security.ts
- src/utils/csrf.ts
- src/utils/api.ts
- src/hooks/useInputValidation.ts 

## NFTデータ更新作業の記録（2024-02-XX）

### 1. 更新対象
#### ID:1のNFT情報
- 旧タイトル：「コズミック・ビジョン」
- 新タイトル：「ネオン・ユートピア」
- 新説明文：サイバーパンクの未来都市を描写した詳細な文章
- タグとレアリティの再設定

### 2. 実施した変更
#### 1. `ExplorePage.tsx`の更新
```typescript
{
  id: '1',
  title: 'ネオン・ユートピア',
  description: 'サイバーパンクの未来都市が広がる、輝くネオンの楽園。[...]',
  category: 'illustration',  // 'animation'から変更
  style: 'cyberpunk',       // 'fantasy'から変更
  rarity: 'legendary',      // 'epic'から変更
}
```

#### 2. `NFTDetailPage.tsx`の更新
- 同様の変更を実施
- フルアドレス表示のため、creatorとownerの値を完全な形式で保持

### 3. 変更の根拠
1. カテゴリの変更（`animation` → `illustration`）
   - 静止画のイラストレーションとしての性質が強いため
   - アニメーション要素が含まれていないため

2. スタイルの変更（`fantasy` → `cyberpunk`）
   - サイバーパンクの未来都市を描写した内容に合わせて
   - ネオンや未来都市の要素が強いため

3. レアリティの変更（`epic` → `legendary`）
   - 詳細な世界観の描写
   - 独特な表現方法
   - 技術と人間社会の融合を表現した深い主題

### 4. 実装の詳細
1. ファイル更新手順
   - まず`ExplorePage.tsx`のサンプルデータを更新
   - 次に`NFTDetailPage.tsx`の同じデータを更新
   - 両ファイルで一貫性を保持

2. データ構造の維持
   - NFT型定義に従った更新
   - 必要なプロパティの完全な保持
   - 型安全性の確保

### 5. 品質確認
1. 確認項目
   - [x] タイトルの更新
   - [x] 説明文の更新
   - [x] カテゴリ、スタイル、レアリティの更新
   - [x] 両ファイルでの一貫性
   - [x] 型定義との整合性

2. 表示確認
   - [x] 詳細ページでの表示
   - [x] 一覧ページでの表示
   - [x] フィルター機能での検索可能性

### 6. 未解決の課題
- [ ] NFTデータの永続化
- [ ] データ更新時の同期メカニズム
- [ ] バックエンドとの連携
- [ ] 画像データの最適化
- [ ] 更新履歴の管理

### 7. 次のステップ
1. データ管理の改善
   - バックエンドAPIの実装
   - データベースの設計
   - キャッシュ戦略の策定

2. UI/UX改善
   - 更新履歴の表示
   - プレビュー機能の実装
   - 編集インターフェースの改善

### 参考資料・証跡
- ソースコード：
  - src/pages/ExplorePage.tsx
  - src/pages/NFTDetailPage.tsx
- 型定義：src/types/nft.ts
- コミット履歴
- Material-UIドキュメント

実装ファイル：
- src/utils/security.ts
- src/utils/csrf.ts
- src/utils/api.ts
- src/hooks/useInputValidation.ts 