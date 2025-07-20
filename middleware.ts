// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// // Rutas especiales que pueden ser accedidas logueado o no
// const specialRoutes = ["/"];

// const publicRoutes = [
//   "/iniciar-sesion",
//   "/registrarse",
//   "/verificacion-correo",
//   "/reestablecer-clave",
//   "/recuperar-clave",
// ];

// const rolePermissions: Record<string, string[]> = {
//   CITIZEN: ["/panel", "/solicitudes/*"],
//   OFFICER: ["/panel", "/solicitudes/*"],
//   ADMIN: [
//     "/panel",
//     "/solicitudes/*",
//     "/gestion-usuarios/admin",
//     "/gestion-areas/admin",
//   ],
//   SUPER: [
//     "/panel",
//     "/gestion-usuarios/superadmin",
//     "/gestion-entidades/superadmin",
//     "/gestion-areas/superadmin",
//   ],
// };

// // Función para verificar si una ruta coincide con los patrones permitidos
// function isRouteAllowed(pathname: string, allowedRoutes: string[]): boolean {
//   return allowedRoutes.some((route) => {
//     // Ruta exacta
//     if (route === pathname) return true;

//     // Wildcard - permite cualquier subruta
//     if (route.endsWith("/*")) {
//       const baseRoute = route.slice(0, -2); // Quitar /*
//       return pathname.startsWith(baseRoute + "/") || pathname === baseRoute;
//     }

//     // Prefijo - permite subrutas que empiecen con la ruta
//     if (pathname.startsWith(route)) {
//       // Asegurarse de que sea una subruta válida
//       const nextChar = pathname[route.length];
//       return nextChar === "/" || nextChar === undefined;
//     }

//     return false;
//   });
// }

// async function verifyAccessToken(token: string) {
//   try {
//     console.log(`🔍 JWT_SECRET existe: ${!!process.env.JWT_ACCESS_SECRET}`);
//     console.log(
//       `🔍 JWT_ACCESS_SECRET length: ${process.env.JWT_ACCESS_SECRET?.length}`
//     );

//     const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     console.log(`🔍 ✅ Token decodificado exitosamente:`, payload);
//     return payload;
//   } catch (error) {
//     console.log(`🔍 ❌ Error al verificar token:`, error);
//     return null;
//   }
// }

// async function refreshTokenServer(request: NextRequest) {
//   try {
//     const apiUrl =
//       process.env.BACKEND_PUBLIC_API_URL || "https://api.gestia.com.co";
//     const res = await fetch(`${apiUrl}/api/auth/refresh`, {
//       method: "GET",
//       headers: {
//         Cookie: request.headers.get("cookie") || "",
//       },
//       credentials: "include",
//     });

//     if (!res.ok) return { success: false };

//     const setCookieHeader = res.headers.get("set-cookie");
//     const data = await res.json();

//     return {
//       success: true,
//       accessToken: data.accessToken,
//       refreshToken: data.refreshToken,
//       setCookieHeader,
//     };
//   } catch {
//     return { success: false };
//   }
// }

// export async function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // Excluir rutas de API y archivos estáticos explícitamente
//   if (
//     pathname.startsWith("/api/") ||
//     pathname.startsWith("/_next/") ||
//     pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   const { accessToken, refreshToken } = {
//     accessToken: request.cookies.get("accessToken")?.value,
//     refreshToken: request.cookies.get("refreshToken")?.value,
//   };

//   // Logs temporales para depuración
//   console.log(`🔍 Middleware - Ruta: ${pathname}`);
//   console.log(`🔍 Token presente: ${!!accessToken}`);
//   if (accessToken) {
//     console.log(`🔍 Token: ${accessToken.substring(0, 20)}...`);
//   }

//   // Manejo de rutas públicas
//   const isPublicRoute = publicRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   // Si es ruta pública y NO hay token, dejar pasar
//   if (isPublicRoute && !accessToken) {
//     return NextResponse.next();
//   }

//   if (isPublicRoute && accessToken) {
//     const payload = accessToken ? await verifyAccessToken(accessToken) : null;
//     if (payload?.role) {
//       return NextResponse.redirect(new URL("/panel", request.url));
//     }

//     return NextResponse.next();
//   }

//   // Definir rutas privadas
//   const privateRoutePrefixes = [
//     "/panel",
//     "/gestion-usuarios",
//     "/gestion-areas",
//     "/gestion-entidades",
//     "/solicitudes",
//   ];

//   const isPrivateRoute = privateRoutePrefixes.some((prefix) =>
//     pathname.startsWith(prefix)
//   );

//   // Si no es ruta privada, permitir acceso
//   if (isPrivateRoute) {
//     if (!accessToken && refreshToken) {
//       const refreshResult = await refreshTokenServer(request);
//       if (refreshResult.success && refreshResult.setCookieHeader) {
//         const response = NextResponse.next();
//         response.headers.set("set-cookie", refreshResult.setCookieHeader);
//         return response;
//       } else {
//         const response = NextResponse.redirect(
//           new URL("/iniciar-sesion", request.url)
//         );
//         response.cookies.delete("accessToken");
//         response.cookies.delete("refreshToken");
//         return response;
//       }
//     }

//     if (!accessToken && !refreshToken) {
//       return NextResponse.redirect(new URL("/iniciar-sesion", request.url));
//     }
//   }
//   // Verificar y validar el token
//   const payload = accessToken ? await verifyAccessToken(accessToken) : null;
//   const role = payload?.role as string | undefined;

//   console.log(`🔍 Payload válido: ${!!payload}`);
//   console.log(`🔍 Role: ${role}`);

//   if (!role || !rolePermissions[role]) {
//     console.log(`🔍 ❌ Token inválido o rol no reconocido`);
//     // Token inválido o rol no reconocido
//     const response = NextResponse.redirect(
//       new URL("/iniciar-sesion", request.url)
//     );
//     response.cookies.delete("accessToken"); // Limpiar token inválido
//     return response;
//   }

//   // Validar acceso por rol usando la función avanzada
//   const allowedRoutes = rolePermissions[role];
//   const isAllowed = isRouteAllowed(pathname, allowedRoutes);

//   console.log(`🔍 Rutas permitidas para ${role}:`, allowedRoutes);
//   console.log(`🔍 ¿Ruta ${pathname} permitida?:`, isAllowed);

//   if (!isAllowed) {
//     console.log(`🔍 ❌ Acceso denegado para ${role} a ${pathname}`);
//     // Redirigir a la primera ruta permitida para el rol
//     const defaultRoute = allowedRoutes[0] || "/panel";
//     return NextResponse.redirect(new URL(defaultRoute, request.url));
//   }

//   console.log(`🔍 ✅ Acceso permitido para ${role} a ${pathname}`);
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//      * Coincidir con todas las rutas de solicitud excepto las que comienzan con:
//      * - api (rutas de API)
//      * - _next/static (archivos estáticos)
//      * - _next/image (archivos de optimización de imágenes)
//      * - favicon.ico (archivo de favicon)
//      * - archivos con extensión (archivos estáticos)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
//   ],
// };
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Rutas especiales que pueden ser accedidas logueado o no
const specialRoutes = ["/"];

// Rutas públicas (solo accesibles cuando NO estás logueado)
const publicRoutes = [
  "/iniciar-sesion",
  "/registrarse",
  "/verificacion-correo",
  "/reestablecer-clave",
  "/recuperar-clave",
];

const rolePermissions: Record<string, string[]> = {
  CITIZEN: ["/panel", "/solicitudes/ciudadano*"],
  OFFICER: ["/panel", "/solicitudes/funcionario*"],
  ADMIN: [
    "/panel",
    "/solicitudes/funcionario/*",
    "/gestion-usuarios/admin",
    "/gestion-areas/admin",
  ],
  SUPER: [
    "/panel",
    "/gestion-usuarios/superadmin",
    "/gestion-entidades/superadmin",
    "/gestion-areas/superadmin",
  ],
};

// Función para verificar si una ruta coincide con los patrones permitidos
function isRouteAllowed(pathname: string, allowedRoutes: string[]): boolean {
  return allowedRoutes.some((route) => {
    // Ruta exacta
    if (route === pathname) return true;

    // Wildcard - permite cualquier subruta
    if (route.endsWith("/*")) {
      const baseRoute = route.slice(0, -2); // Quitar /*
      return pathname.startsWith(baseRoute + "/") || pathname === baseRoute;
    }

    // Prefijo - permite subrutas que empiecen con la ruta
    if (pathname.startsWith(route)) {
      // Asegurarse de que sea una subruta válida
      const nextChar = pathname[route.length];
      return nextChar === "/" || nextChar === undefined;
    }

    return false;
  });
}

async function verifyAccessToken(token: string) {
  try {
    console.log(`🔍 JWT_SECRET existe: ${!!process.env.JWT_ACCESS_SECRET}`);
    console.log(
      `🔍 JWT_ACCESS_SECRET length: ${process.env.JWT_ACCESS_SECRET?.length}`
    );

    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log(`🔍 ✅ Token decodificado exitosamente:`, payload);
    return payload;
  } catch (error) {
    console.log(`🔍 ❌ Error al verificar token:`, error);
    return null;
  }
}

async function refreshTokenServer(request: NextRequest) {
  try {
    const apiUrl =
      process.env.BACKEND_PUBLIC_API_URL || "https://api.gestia.com.co";
    const res = await fetch(`${apiUrl}/api/auth/refresh`, {
      method: "GET",
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
      credentials: "include",
    });

    if (!res.ok) return { success: false };

    const setCookieHeader = res.headers.get("set-cookie");
    const data = await res.json();

    return {
      success: true,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      setCookieHeader,
    };
  } catch {
    return { success: false };
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Excluir rutas de API y archivos estáticos explícitamente
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 1. MANEJAR RUTAS ESPECIALES (accesibles siempre)
  const isSpecialRoute = specialRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isSpecialRoute) {
    console.log(`🔍 ✅ Ruta especial permitida: ${pathname}`);
    return NextResponse.next();
  }

  const { accessToken, refreshToken } = {
    accessToken: request.cookies.get("accessToken")?.value,
    refreshToken: request.cookies.get("refreshToken")?.value,
  };

  // Logs temporales para depuración
  console.log(`🔍 Middleware - Ruta: ${pathname}`);
  console.log(`🔍 Token presente: ${!!accessToken}`);
  if (accessToken) {
    console.log(`🔍 Token: ${accessToken.substring(0, 20)}...`);
  }

  // 2. MANEJAR RUTAS PÚBLICAS (solo para usuarios NO logueados)
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicRoute) {
    // Si hay token válido, redirigir al panel
    if (accessToken) {
      const payload = await verifyAccessToken(accessToken);
      if (payload?.role) {
        console.log(
          `🔍 Usuario logueado intentando acceder a ruta pública: ${pathname}`
        );
        return NextResponse.redirect(new URL("/panel", request.url));
      }
    }
    // Si no hay token válido, permitir acceso
    console.log(`🔍 ✅ Ruta pública permitida: ${pathname}`);
    return NextResponse.next();
  }

  // 3. MANEJAR RUTAS PRIVADAS (requieren autenticación)
  const privateRoutePrefixes = [
    "/panel",
    "/gestion-usuarios",
    "/gestion-areas",
    "/gestion-entidades",
    "/solicitudes",
  ];

  const isPrivateRoute = privateRoutePrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isPrivateRoute) {
    // Intentar renovar token si solo hay refresh token
    if (!accessToken && refreshToken) {
      const refreshResult = await refreshTokenServer(request);
      if (refreshResult.success && refreshResult.setCookieHeader) {
        const response = NextResponse.next();
        response.headers.set("set-cookie", refreshResult.setCookieHeader);
        return response;
      } else {
        const response = NextResponse.redirect(
          new URL("/iniciar-sesion", request.url)
        );
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }
    }

    // Si no hay tokens, redirigir a login
    if (!accessToken && !refreshToken) {
      console.log(
        `🔍 ❌ Usuario no autenticado intentando acceder a ruta privada: ${pathname}`
      );
      return NextResponse.redirect(new URL("/iniciar-sesion", request.url));
    }

    // Verificar y validar el token
    const payload = accessToken ? await verifyAccessToken(accessToken) : null;
    const role = payload?.role as string | undefined;

    console.log(`🔍 Payload válido: ${!!payload}`);
    console.log(`🔍 Role: ${role}`);

    if (!role || !rolePermissions[role]) {
      console.log(`🔍 ❌ Token inválido o rol no reconocido`);
      const response = NextResponse.redirect(
        new URL("/iniciar-sesion", request.url)
      );
      response.cookies.delete("accessToken");
      return response;
    }

    // Validar acceso por rol
    const allowedRoutes = rolePermissions[role];
    const isAllowed = isRouteAllowed(pathname, allowedRoutes);

    console.log(`🔍 Rutas permitidas para ${role}:`, allowedRoutes);
    console.log(`🔍 ¿Ruta ${pathname} permitida?:`, isAllowed);

    if (!isAllowed) {
      console.log(`🔍 ❌ Acceso denegado para ${role} a ${pathname}`);
      const defaultRoute = allowedRoutes[0] || "/panel";
      return NextResponse.redirect(new URL(defaultRoute, request.url));
    }

    console.log(`🔍 ✅ Acceso permitido para ${role} a ${pathname}`);
    return NextResponse.next();
  }

  // 4. RUTAS NO CLASIFICADAS - permitir acceso
  console.log(`🔍 ✅ Ruta no clasificada permitida: ${pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Coincidir con todas las rutas de solicitud excepto las que comienzan con:
     * - api (rutas de API)
     * - _next/static (archivos estáticos)
     * - _next/image (archivos de optimización de imágenes)
     * - favicon.ico (archivo de favicon)
     * - archivos con extensión (archivos estáticos)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
