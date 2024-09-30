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
  let routeExistsInMap = false;

  for (const feature in featureRouteMap) {
    const routes = featureRouteMap[feature];

    for (const route of routes) {
      let matches = false;

      if (route.partialMatch) {
        const pathRegex = new RegExp(route.path.replace(/:[^\s/]+/g, '[^/]+'));
        matches = pathRegex.test(pathname);
      } else {
        matches = route.path === pathname;
      }

      if (matches) {
        routeExistsInMap = true;


        if (route?.excepts) {
          for (const except of route.excepts) {
            const ancestorPathRegex = new RegExp(`${except.ancestorRoute}(\\/[^/]+)?$`);

            if (ancestorPathRegex.test(pathname)) {
              for (const exceptPath of except.exceptPath) {
                const exceptRegex = new RegExp(exceptPath.replace(/:[^\s/]+/g, '[^/]+'));

                if (exceptRegex.test(pathname)) {
                  return true;
                }
              }
            }
          }
        }


        if (currentPlanUsage[feature]) {
          return true;
        }
      }
    }
  }

  if (!routeExistsInMap) {
    return true;
  }

  return false;
};

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}


