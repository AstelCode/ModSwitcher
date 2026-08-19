import { Progress } from "@/components/ui/progress";

export function PasswordStrengthIndicator({
  strength,
  className,
}: {
  strength: number;
  className?: string;
}) {
  let color = "";
  if (strength < 20) {
    color = "[&>div]:bg-red-500";
  } else if (strength < 40) {
    color = "[&>div]:bg-orange-500";
  } else if (strength < 60) {
    color = "[&>div]:bg-yellow-500";
  } else if (strength < 80) {
    color = "[&>div]:bg-green-400";
  } else {
    color = "[&>div]:bg-green-600";
  }
  return (
    <div className={className + "flex w-full items-center justify-center"}>
      <Progress value={strength} className={color} />
    </div>
  );
}
