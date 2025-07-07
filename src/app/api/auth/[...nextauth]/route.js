import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// ✅ แยก authOptions ออกมาเพื่อให้ export ได้
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null

        if (credentials.username === "piyapat159" && credentials.password === "024159172") {
          return { id: 1, name: "Admin User", email: "admin@example.com" }
        }
        return null
      },
    }),
  ],
  adapter: '', // ถ้าไม่ใช้สามารถลบทิ้งได้
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
}


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
