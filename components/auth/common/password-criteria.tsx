"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface PasswordCriteria {
  label: string;
  test: (password: string) => boolean;
}

const passwordCriteria: PasswordCriteria[] = [
  {
    label: "Al menos 8 caracteres",
    test: (password) => password.length >= 8,
  },
  {
    label: "Una letra mayúscula",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: "Una letra minúscula",
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: "Un número",
    test: (password) => /\d/.test(password),
  },
  {
    label: "Un carácter especial (!@#$%^&*)",
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

interface PasswordCriteriaProps {
  watchedPassword: string;
}

export function PasswordCriteria({ watchedPassword }: PasswordCriteriaProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Criterios de Seguridad
        </CardTitle>
        <CardDescription>
          Tu contraseña debe cumplir con los siguientes requisitos:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AnimatePresence>
            {passwordCriteria.map((criterion, index) => {
              const isValid = criterion.test(watchedPassword || "");
              const hasStartedTyping = (watchedPassword || "").length > 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 ${
                    isValid
                      ? "bg-green-50 border-green-200 text-green-800"
                      : hasStartedTyping
                      ? "bg-red-50 border-red-200 text-red-800"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isValid ? 1.1 : 1,
                      rotate: isValid ? 360 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      isValid
                        ? "bg-green-500"
                        : hasStartedTyping
                        ? "bg-red-500"
                        : "bg-gray-300"
                    }`}
                  >
                    {isValid ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : hasStartedTyping ? (
                      <X className="w-3 h-3 text-white" />
                    ) : (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </motion.div>
                  <span className="text-sm font-medium">{criterion.label}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Indicador de fortaleza */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Fortaleza de la contraseña
            </span>
            <span className="text-sm text-gray-500">
              {
                passwordCriteria.filter((c) => c.test(watchedPassword || ""))
                  .length
              }
              /{passwordCriteria.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full transition-colors duration-300"
              initial={{ width: 0 }}
              animate={{
                width: `${
                  (passwordCriteria.filter((c) => c.test(watchedPassword || ""))
                    .length /
                    passwordCriteria.length) *
                  100
                }%`,
              }}
              style={{
                backgroundColor:
                  passwordCriteria.filter((c) => c.test(watchedPassword || ""))
                    .length === 0
                    ? "#e5e7eb"
                    : passwordCriteria.filter((c) =>
                        c.test(watchedPassword || "")
                      ).length <= 2
                    ? "#ef4444"
                    : passwordCriteria.filter((c) =>
                        c.test(watchedPassword || "")
                      ).length <= 4
                    ? "#f59e0b"
                    : "#10b981",
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
