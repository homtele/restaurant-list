#   restaurant-list
![login](./public/images/login.jpeg)
![register](./public/images/register.jpeg)
##  環境建置與需求 (prerequisites)
*   Node.js
*   MongoDB
##  安裝與執行步驟 (Installation and Execution)
1.  Clone the repository
    ```
    git clone https://github.com/homtele/restaurant-list.git
    ```
2.  Install dependencies
    ```
    cd restaurant-list
    npm install
    ```
3.  Rename .env.example to .env in the root directory and set FACEBOOK_APP_ID, FACEBOOK_APP_SECRET
4.  Seed the data
    ```
    npm run seed
    ```    
5.  Run the project
    ```
    npm start
    ```
    Navigate to http://localhost:3000
6.  Register a new account or login the following accounts
    *   email: user1@example.com, password: 12345678
    *   email: user2@example.com, password: 12345678
##  功能描述 (Features)
*   使用者可以註冊、登入帳號
*   使用者可以串接 Facebook 第三方登入
*   使用者可以新增自己的餐廳
*   使用者可以瀏覽自己所有的餐廳
*   使用者可以依店名或類別搜尋自己的餐廳
*   使用者可以依店名、類別或評分排序搜尋結果
*   使用者可以瀏覽自己餐廳的詳細資訊
*   使用者可以修改自己餐廳的資訊
*   使用者可以刪除自己的餐廳
