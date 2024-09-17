import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { PlanName } from "@/types/enums";
import { featureRouteMap } from "@/utils/constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(isoDate: string): string {
  return format(parseISO(isoDate), "MMM dd yyyy hh:mm a");
}

export const isEmptyObject = (obj: object | undefined): boolean => {
  if (obj === undefined || obj === null) return true;
  return Object.keys(obj).length === 0;
};

export function isMobile() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }

  const match = window.matchMedia('(pointer: coarse)');
  return match && match.matches;
}


export function getUserFriendlyPlanName(planName: PlanName): string | undefined {
  const userFriendlyPlanNameMap = new Map<PlanName, string>([
    [PlanName.CREATOR, 'Creator'],
    [PlanName.PRO, 'Pro'],
    [PlanName.ADVANCED_PRO, 'Advanced Pro'],
    [PlanName.BUSINESS, 'Business'],
    [PlanName.BASIC, 'Basic'],
    [PlanName.ENTERPRISE, 'Enterprise'],
  ]);

  const userFriendlyPlanName = userFriendlyPlanNameMap.get(planName);

  return userFriendlyPlanName;
}


export const planIdsMap: Record<PlanName, string[]> = {
  [PlanName.CREATOR]: ["grs/creator/monthly_planjh4qViTCP2gsvT", "grs/creator/yearly_planWfodY4MFnK074E"],
  [PlanName.PRO]: ["grs/pro/monthly_plan002mLAqmLKnWAk", "grs/pro/yearly_plan8OT7i48BejFfMI"],
  [PlanName.ADVANCED_PRO]: ["grs/advanced_pro/monthly_planIsLCnfld6wkjWB", "grs/advanced_pro/yearly_planlsjArmd2EoVuhr"],
  [PlanName.BUSINESS]: ["grs/business/monthly_planhsPv4QB1ZZ1vS1", "grs/business/yearly_plannB1eoCa7NOhmfh"],
  [PlanName.BASIC]: ["grs/basic_plan", "grs/basic/yearly_planyrwjxt3Jh4i3iU"],
  [PlanName.ENTERPRISE]: ["enterprise_monthly_plan_id", "enterprise_yearly_plan_id"]
};

export const hasAccessToRoute = (currentPlanUsage: any, pathname: string): boolean => {
  console.log(currentPlanUsage, pathname, featureRouteMap);

  let routeExistsInMap = false;

  for (const feature in featureRouteMap) {
    const routes = featureRouteMap[feature];

    for (const route of routes) {
      if (route.partialMatch) {
        const pathRegex = new RegExp(route.path.replace(/:[^\s/]+/g, '[^/]+')); // Converts ":id" into a regex to match any value
        if (pathRegex.test(pathname)) {
          routeExistsInMap = true;
          if (currentPlanUsage[feature]) {
            return true;
          }
        }
      } else {
        if (route.path === pathname) {
          routeExistsInMap = true;
          if (currentPlanUsage[feature]) {
            return true;
          }
        }
      }
    }
  }

  if (!routeExistsInMap) {
    return true;
  }

  return false;
};

