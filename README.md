# restaurant-list
## 環境建置與需求 (prerequisites)
* Node.js
* MongoDB
## 安裝與執行步驟 (Installation and Execution)
1. Clone the repository
```
git clone https://github.com/homtele/restaurant-list.git
```
2. Install dependencies
```
cd restaurant-list
npm install
```
3. Seed the data
```
npm run seed
```
4. Run the project
```
npm start
```
Navigate to http://localhost:3000
## 功能描述 (Features)
* 使用者可以註冊、登入帳號
* 使用者可以串接 Facebook 第三方登入
* 使用者可以新增自己的餐廳
* 使用者可以瀏覽自己餐廳的詳細資訊
* 使用者可以瀏覽自己所有的餐廳
* 使用者可以修改自己餐廳的資訊
* 使用者可以刪除自己的餐廳
* 使用者可以依店名或類別搜尋自己的餐廳
* 使用者可以依店名、類別或評分排序搜尋結果
* 使用者在登入狀態下嘗試修改或瀏覽沒有憑證的餐廳會返回中文的錯誤頁面
