import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";

const publicRoutes = [
  "/iniciar-sesion",
  "/registrarse",
  "/verificacion-correo",
  "/reestablecer-clave",
  "/recuperar-clave",
];
const rolePermissions: Record<string, string[]> = {
  CITIZEN: ["/panel",],
  ADMIN: ["/panel", "/gestion-usuarios/admin"],
  SUPER: ["/panel", "/gestion-usuarios/superadmin"],
};

// No manipula headers ni cookies si no es necesario.
// async function verifyAccessToken(token: string) {
//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     return payload;
//   } catch {
//     return null;
//   }
// }

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Excluye rutas públicas
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    const accessToken = request.cookies.get("accessToken")?.value;
    if (accessToken) {
      return NextResponse.redirect(new URL("/panel", request.url));
    }
    return NextResponse.next();
  }

  // Solo protege rutas privadas
  const privateRoutePrefixes = ["/panel", "/gestion-usuarios"];
  const isPrivateRoute = privateRoutePrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );
  if (!isPrivateRoute) {
    return NextResponse.next(); // No tocar nada que no sea privado
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL("/iniciar-sesion", request.url));
  }

  // Si hay token, verifica el rol
  // const payload = await verifyAccessToken(accessToken);
  // const role = payload?.role as string | undefined;
  // if (!role) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // Valida acceso por rol
  // const allowedRoutes = rolePermissions[role];
  // const isAllowed = allowedRoutes?.some(route => pathname.startsWith(route));
  // if (!isAllowed) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/|favicon.ico).*)", // Solo intercepta rutas de páginas
  ],
};
