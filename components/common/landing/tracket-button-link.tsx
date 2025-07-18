import { ButtonLink } from "@/components/common/landing/button-link";

interface SimpleButtonLinkProps
  extends React.ComponentProps<typeof ButtonLink> {
  name: string;
}

export const TrackedButton = ({
  children,
  onClick,
  name,
  ref,
  ...props
}: SimpleButtonLinkProps) => {
  return (
    <ButtonLink {...props} ref={ref} onClick={onClick} data-name={name}>
      {children}
    </ButtonLink>
  );
};
