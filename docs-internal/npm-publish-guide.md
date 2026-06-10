# 如何發佈 npm 套件（以 DeskPane 為例）

## 前置準備

### 1. 建立 npm 帳號
前往 https://www.npmjs.com/signup 註冊帳號（免費）。

### 2. 登入 npm CLI

```bash
npm login
```

會依序要求輸入：
- Username（你的 npm 帳號名稱）
- Password
- Email
- OTP（如果你有開啟 2FA，會寄驗證碼到信箱）

確認登入成功：
```bash
npm whoami
# 輸出你的帳號名稱，例如：brian
```

---

## 發佈套件

### 第一次發佈

```bash
npm publish
```

npm 會根據 `package.json` 的 `"files"` 欄位決定要上傳哪些檔案。  
DeskPane 的設定是只上傳 `dist/` 資料夾：

```json
"files": ["dist"]
```

發佈成功後，你的套件就可以在這裡看到：  
👉 https://www.npmjs.com/package/deskpane

### 發佈前檢查（建議每次都做）

```bash
# 模擬打包，看看哪些檔案會被上傳（不會真的發佈）
npm pack --dry-run
```

---

## 更新版本號再發佈

npm 不允許發佈相同版本號，每次都要先更新版本。

### 語意化版本規則（Semantic Versioning）

格式：`主版本.次版本.修訂版本`（例如 `1.2.3`）

| 指令 | 範例 | 適用情況 |
|------|------|---------|
| `npm version patch` | `0.1.0` → `0.1.1` | 修 bug、小修正 |
| `npm version minor` | `0.1.0` → `0.2.0` | 新增功能，向下相容 |
| `npm version major` | `0.1.0` → `1.0.0` | 破壞性變更、大改版 |

```bash
# 例如：修了一個 bug，發佈修訂版
npm version patch
npm publish
```

> `npm version` 指令會自動修改 `package.json` 的版本號，並建立一個 git commit + tag。

---

## 標準完整發佈流程

```bash
# 1. 確認你在正確的分支（main）
git checkout main

# 2. 執行 build，確保 dist/ 是最新的
npm run build:lib

# 3. 更新版本號（選 patch / minor / major）
npm version patch

# 4. 發佈到 npm
npm publish

# 5. 把版本 tag push 到 GitHub
git push && git push --tags
```

---

## 管理 npm 套件

### 查看已發佈的版本

```bash
npm view deskpane versions
```

### 作廢某個版本（deprecated，不建議直接刪除）

```bash
npm deprecate deskpane@0.1.0 "請升級到新版本"
```

### 加入共同維護者

```bash
npm owner add <別人的npm帳號> deskpane
```

---

## 發佈 scoped 套件（選用）

如果你想用 `@yourusername/deskpane` 這種格式（帶 @ 的），需要在 package.json 改名：

```json
"name": "@0obriano0/deskpane"
```

發佈指令要加 `--access public`（因為 scoped 預設是 private）：

```bash
npm publish --access public
```

> 優點：名稱空間屬於你，不怕被搶佔  
> 缺點：使用者安裝時要打 `npm install @0obriano0/deskpane`，比較長

---

## 常見錯誤

| 錯誤訊息 | 原因 | 解法 |
|---------|------|------|
| `ENEEDAUTH` | 未登入 | `npm login` |
| `403 Forbidden` | 套件名已被佔用 | 換名稱或用 scoped |
| `You cannot publish over the previously published versions` | 版本號重複 | `npm version patch` 先更新版本 |
| `npm ERR! 402 Payment Required` | 發佈 private scoped 套件需付費 | 加 `--access public` |

---

## 參考連結

- npm 官方文件：https://docs.npmjs.com/cli/v10/commands/npm-publish
- 語意化版本：https://semver.org/lang/zh-TW/
- DeskPane npm 頁面：https://www.npmjs.com/package/deskpane
