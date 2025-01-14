# 🚀 Next Auth Authentication Toolbox

This project is a complete authentication system using **Next.js**, **Next-Auth**, and **Vuexy**. It includes login with Google and GitHub, two-factor authentication (2FA), password recovery, user verification, error handling, and admin-only access control.

## 🧩 Features

- **Login with Google and GitHub**
- **Two-Factor Authentication (2FA)**
- **Password Recovery (Forgot Password)**
- **Error Handling**
- **User Verification**
- **Admin-Only Access Control**
- **Reusable Authentication Components**

## 🛠️Technologies Used

- [Next.js](https://nextjs.org/)
- [Next-Auth](https://next-auth.js.org/)
- [vuexy]
- [prisma]

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/next-auth-toolbox.git
   cd next-auth-toolbox
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in `.env.local`:

   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key

   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret

   DATABASE_URL=your_database_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🤝 Contributing

Contributions are welcome! If you have ideas or improvements, feel free to open an issue or submit a pull request.
