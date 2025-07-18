import * as React from "react";
import clsx from "clsx";
import { cn } from "@/lib/utils";

const $headingContainer = (options: { align?: string; className?: string }) => {
  const { align = "center", className = "" } = options || {};
  let alignClass = "";
  if (align === "center") alignClass = "items-center self-center";
  else if (align === "left") alignClass = "items-start self-start";
  else if (align === "right") alignClass = "items-end self-end";
  return clsx("flex flex-col gap-3", alignClass, className);
};

type HeadingProps = {
  children?: React.ReactNode;
  tag?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  title?: string;
  align?: "center" | "left" | "right" | "none";
};

export function Heading({
  tag,
  subtitle,
  className,
  align = "center",
  ...props
}: HeadingProps) {
  if (align === "none") return null;

  return (
    <div className={$headingContainer({ align, className })}>
      {tag ? <Tag>{tag}</Tag> : null}
      <div
        className={clsx(
          "flex max-w-[800px] flex-col justify-center gap-1",
          {
            "items-start self-start": align === "left",
            "items-center self-center": align === "center" || !align,
            "items-end self-end": align === "right",
          },
          "[&>*]:text-pretty [&>*]:text-3xl [&>*]:font-medium md:[&>*]:text-4xl",
          {
            "[&>*]:text-center": align === "center",
            "[&>*]:text-left": align === "left",
            "[&>*]:text-right": align === "right",
          }
        )}
      >
        {props.title && <h2>{props.title}</h2>}
      </div>
      {subtitle ? (
        <p
          className={cn(
            "max-w-screen-md text-pretty text-lg tracking-tight text-[#818897] md:text-xl",
            {
              "text-center": align === "center",
              "text-left": align === "left",
              "text-right": align === "right",
            }
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function Tag({
  className,
  children,
  asChild,
  ...props
}: React.AllHTMLAttributes<HTMLDivElement> & { asChild?: boolean }) {
  return (
    <div
      className={clsx(
        "flex min-h-7 items-center justify-center gap-2 rounded-full bg-muted px-3.5 pb-px text-sm font-medium text-[#818897] dark:bg-[--dark-surface-secondary] dark:text-[--dark-text-tertiary] md:text-base",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
