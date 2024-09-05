
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ActionTooltipProp {
  children: React.ReactNode;
  align: "start" | "center" | "end";
  side: "top" | "right" | "bottom" | "left";
  label: string;
  isActive?: boolean;
}

const ActionTooltip = ({ label, children, side, align, isActive }: ActionTooltipProp) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50} >
        <TooltipTrigger className={cn(
          "h-[48px] w-[48px] transition-all duration-200",
          isActive !== undefined ? (isActive ? "mb-2" : "mb-6") : ""
          )}>{ children }</TooltipTrigger>
        <TooltipContent side={side} align={align} className="font-bold">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip